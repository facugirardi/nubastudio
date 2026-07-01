"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "./motionValue";

/* ───────── Config de la deformación (todo ajustable) ───────── */
export type DistortionConfig = {
  distortionStrength: number;
  curveStrength: number;
  breathingSpeed: number;
  breathingAmount: number;
};

export const DEFAULT_DISTORTION: DistortionConfig = {
  distortionStrength: 0.04,
  curveStrength: 0.07,
  breathingSpeed: 0.9,
  breathingAmount: 0.008,
};

const H = 2.15; // altura del plano en unidades de mundo
const SAMPLES = 9; // puntos de la curva muestreados a lo ancho de cada card (cinta literal)

const fract = (x: number) => x - Math.floor(x);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Temporales a nivel de módulo (sin allocations por frame, sin riesgo de ref obsoleto en HMR)
const _p     = new THREE.Vector3();
const _tan   = new THREE.Vector3();
const _up    = new THREE.Vector3(0, 1, 0);
const _refZ  = new THREE.Vector3(0, 0, 1); // up de referencia alterno (tangente casi vertical)
const _nrm   = new THREE.Vector3();
const _yax   = new THREE.Vector3();
const _basis = new THREE.Matrix4();
const _qPath = new THREE.Quaternion(); // orientación que sigue la tangente (cinta/cadena)
const _qInv  = new THREE.Quaternion(); // inversa de la orientación final (mundo → local de la card)
const _tanLocal  = new THREE.Vector3(); // tangente del camino en espacio local de la card
const _ptmp      = new THREE.Vector3(); // punto muestreado de la curva
const _off       = new THREE.Vector3(); // desviación de la curva respecto a la tangente (local)

/* ───────── Card: imagen deformada viajando a lo largo de la curva ───────── */
export default function ProjectImagePlane({
  imageUrl,
  slotU,
  offset,
  curve,
  remap,
  cardScale,
  stairSlope,
  impulse,
  mobile,
  onSelect,
  slug,
  title,
  count,
  onHoverStart,
  onHoverEnd,
  config = DEFAULT_DISTORTION,
}: {
  imageUrl: string;
  slotU: number;                 // posición base del slot en la curva (0..1)
  offset: MotionValue<number>;   // desplazamiento por scroll a lo largo de la curva
  curve: THREE.CatmullRomCurve3;
  remap: (u: number) => number;  // gap aparente constante: u uniforme → t en la curva
  cardScale: number;             // escala constante (alfombras del mismo tamaño)
  stairSlope: number;            // escalonado: bajada en Y por unidad de t (≈20px entre cards)
  impulse: MotionValue<number>;  // skew por inercia del scroll
  mobile: boolean;
  onSelect: (slug: string, image: string, rect: { left: number; top: number; width: number; height: number }) => void;
  slug: string;
  title: string;                 // nombre del proyecto (label al hover)
  count: number;                 // total de slots → umbral de "card central + vecinas"
  onHoverStart: (title: string, image: string) => void; // avisa a Works: frena la curva + muestra el label
  onHoverEnd: () => void;
  config?: DistortionConfig;
}) {
  const texture = useTexture(imageUrl);
  const meshRef = useRef<THREE.Mesh>(null);
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const seed = slotU * 13.7;

  // ── Intro: cada card entra con un scale + fade suave, escalonada por su posición ──
  const introStartRef = useRef<number | null>(null); // timestamp del primer frame visible
  const introDelay = slotU * 1.1;       // stagger: las de más adelante entran más tarde
  const INTRO_DUR = 1.1;                 // duración de la entrada de cada card (s)

  // ── Hover (sólo card central + sus 2 vecinas) ──
  const hoveredRef = useRef(false);   // leído en useFrame sin re-render
  const awayRef = useRef(1);          // distancia al centro de la card en este frame
  const hoverFadeRef = useRef(0);     // brillo del hover suavizado (0..1)
  // Card es "central" si está dentro de ~1 vecina del centro (la del medio + costados)
  const maxAway = 2.5 / count;

  // Aspect real de la imagen → el plano matchea, textura llena 0..1
  const aspect = useMemo(() => {
    const img = texture.image as { width: number; height: number } | undefined;
    return img ? img.width / img.height : 1.5;
  }, [texture]);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  const curveLen = useMemo(() => curve.getLength(), [curve]); // longitud de arco (mapea ancho de card → Δt)

  const uniforms = useRef({
    uTime:           { value: 0 },
    uBlur:           { value: 0 },
    uAspect:         { value: aspect },
    uRadius:         { value: 0.032 }, // ≈ 14px relativo a la altura del plano
    uHalf:           { value: new THREE.Vector2(H * aspect * 0.5, H * 0.5) },
    uCurve:          { value: config.curveStrength },
    uDistortion:     { value: config.distortionStrength },
    uBreathSpeed:    { value: config.breathingSpeed },
    uBreathAmount:   { value: config.breathingAmount },
    // ── Lámina que sigue el path (cinta literal por muestreo de la curva) ──
    uTangentLocal:   { value: new THREE.Vector3(1, 0, 0) }, // dirección del recorrido en espacio local
    uSamples:        { value: Array.from({ length: SAMPLES }, () => new THREE.Vector3()) }, // desviaciones reales de la curva
    // ── Impulso (skew por inercia del scroll) ──
    uImpulse:        { value: 0 },                          // magnitud/signo del impulso
    // ── Tratamiento del dorso (cara trasera) ──
    uBackBlur:       { value: 0.013 }, // blur extra respecto al frente
    uBackDark:       { value: 0.16 },  // < 1 → más oscuro
    uBackContrast:   { value: 0.7 },   // < 1 → menos contraste (hacia gris)
    uBackDesat:      { value: 0.35 },  // 0..1 → mezcla hacia luminancia
    uBackAlpha:      { value: 0.92 },  // < 1 → un poco menos opaco
  });

  const material = useMemo(() => {
    const m = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    m.depthWrite = false;
    m.side = THREE.DoubleSide;   // dorso visible al girar (tratado en el fragment shader)
    m.forceSinglePass = true;    // 1 sola pasada → gl_FrontFacing funciona (sino la cara frontal tapa al dorso)

    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms.current);

      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
           uniform float uTime;
           uniform vec2  uHalf;
           uniform float uCurve;
           uniform float uDistortion;
           uniform float uBreathSpeed;
           uniform float uBreathAmount;
           uniform vec3  uTangentLocal;
           uniform vec3  uSamples[9];
           uniform float uImpulse;`
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
           float nx = position.x / uHalf.x;
           float ny = position.y / uHalf.y;
           // Lámina que sigue el path: cada vértice toma la desviación REAL de la curva
           // (muestreada en 9 puntos a lo ancho) interpolada según su posición sobre el recorrido.
           float sTan = dot(position.xyz, uTangentLocal) / uHalf.x; // −1..1 a lo ancho de la cinta
           float fidx = clamp(sTan * 0.5 + 0.5, 0.0, 1.0) * 8.0;    // 0..8
           int i0 = int(floor(fidx));
           int i1 = min(i0 + 1, 8);
           vec3 sheetOff = mix(uSamples[i0], uSamples[i1], fidx - float(i0));
           transformed.xyz += sheetOff;
           // Impulso: SOLO las 4 esquinas se estiran en la DIRECCIÓN del scroll (tangente del
           // recorrido). nx²·ny² es máximo en las puntas y 0 en los bordes medios → el
           // estiramiento se concentra en las esquinas → tirón elástico hacia donde se scrollea.
           float corner = nx * nx * ny * ny;
           transformed.xyz += uTangentLocal * (uImpulse * corner * 2.5);`
        );

      // Blur por profundidad (9-tap) + esquinas redondeadas (SDF con AA)
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
           uniform float uBlur;
           uniform float uAspect;
           uniform float uRadius;
           uniform float uBackBlur;
           uniform float uBackDark;
           uniform float uBackContrast;
           uniform float uBackDesat;
           uniform float uBackAlpha;`
        )
        .replace(
          "#include <map_fragment>",
          `#ifdef USE_MAP
             // 5-tap cross blur (sin diagonales — 44% menos fetches que el 9-tap)
             float b = uBlur + (gl_FrontFacing ? 0.0 : uBackBlur);
             vec4 _t = vec4(0.0);
             _t += texture2D( map, vMapUv );
             _t += texture2D( map, vMapUv + vec2( b, 0.0) );
             _t += texture2D( map, vMapUv + vec2(-b, 0.0) );
             _t += texture2D( map, vMapUv + vec2(0.0,  b) );
             _t += texture2D( map, vMapUv + vec2(0.0, -b) );
             diffuseColor *= _t / 5.0;
           #endif

           vec2 _p = (vMapUv - 0.5) * vec2(uAspect, 1.0);
           vec2 _hs = vec2(0.5 * uAspect, 0.5);
           vec2 _q = abs(_p) - (_hs - uRadius);
           float _d = length(max(_q, 0.0)) + min(max(_q.x, _q.y), 0.0) - uRadius;
           float _edge = fwidth(_d) + 0.0008;
           diffuseColor.a *= 1.0 - smoothstep(-_edge, _edge, _d);`
        );
    };
    return m;
  }, [texture]);

  useFrame((_, dt) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Progreso de la animación de entrada (0..1) con easeOutCubic + stagger.
    // Uso tiempo real (no dt acumulado) para que un primer frame largo no la salte de una.
    const now = performance.now() / 1000;
    if (introStartRef.current === null) introStartRef.current = now;
    const ip = clamp01((now - introStartRef.current - introDelay) / INTRO_DUR);
    const intro = 1 - Math.pow(1 - ip, 3);

    const o = offset.get();
    const t = remap(fract(slotU - o)); // posición con gap aparente constante (espaciado parejo en px)

    // Posición sobre la curva + escalonado vertical (cada card un poco más abajo que la anterior)
    curve.getPointAt(t, _p);
    mesh.position.copy(_p);
    mesh.position.y -= (t - 0.5) * stairSlope; // centrado: el medio no se mueve, se inclina la fila

    // ── Lugar de la card en el recorrido (t≈0.5 = protagonista) ──
    const signed = THREE.MathUtils.clamp((t - 0.5) / 0.5, -1, 1); // −1 izquierda · +1 derecha
    const away   = Math.abs(signed);
    awayRef.current = away;
    const turn   = Math.pow(away, 0.70);     // se aparta de lo frontal apenas deja el centro
    const prox   = 1 - Math.pow(away, 0.85); // protagonismo MUY concentrado: una sola card domina

    // ── 1. Orientación que SIGUE la forma del camino (base por tangente, tipo cinta) ──
    // X local = tangente · Z local (normal) = hacia dónde mira la card. En el centro la
    // tangente va casi en +X → la card mira a cámara (frontal). Hacia los extremos la
    // tangente se hunde y curva → la base rota acompañando la espiral horizontal.
    curve.getTangentAt(t, _tan).normalize();
    // up de referencia robusto: si la tangente es casi vertical, usa +Z para no degenerar el cross
    const refUp = Math.abs(_tan.y) > 0.85 ? _refZ : _up;
    _nrm.crossVectors(_tan, refUp).normalize();
    _yax.crossVectors(_nrm, _tan).normalize();
    _basis.makeBasis(_tan, _yax, _nrm);
    _qPath.setFromRotationMatrix(_basis);

    // CADENA: cada card se alinea con la tangente local → toda la fila fluye junta siguiendo
    // la curva (no rotaciones individuales). En el centro la tangente es casi horizontal → la
    // card principal queda de frente; hacia los lados la cadena se inclina/gira acompañando la
    // curva, toda encadenada.
    // Orientación 100% por tangente → cinta continua: los bordes de cards vecinas coinciden
    mesh.quaternion.copy(_qPath);

    // ── 3. Escala: base constante, la card central se achica un poco (prox máximo en t≈0.5)
    const scale = cardScale * (1 - prox * 0.12) * lerp(0.6, 1, intro);
    mesh.scale.setScalar(scale);

    // Fade muy al borde: las cards giradas (que muestran el reverso) siguen visibles más tiempo
    const edgeFade = smoothstep(0.015, 0.07, t) * (1 - smoothstep(0.93, 0.985, t));
    // Plateau sólido: principal + vecinas izq/der opacas; sólo las lejanas se atenúan
    const solid = 1 - smoothstep(0.45, 0.95, away);
    const opacity = edgeFade * lerp(0.24, 1, solid) * intro;
    // Hover: oscurece bastante la card apuntada (transición suave)
    const hoverTarget = hoveredRef.current ? 1 : 0;
    hoverFadeRef.current += (hoverTarget - hoverFadeRef.current) * Math.min(1, dt * 10);
    const bright = lerp(0.18, 1.20, prox) * lerp(1, 0.4, hoverFadeRef.current); // lejanas oscuras · central viva · se oscurece al hover
    const blur = Math.pow(away, 1.35) * (mobile ? 0.009 : 0.015); // lejanas más borrosas

    material.opacity = opacity;
    material.color.setScalar(bright);
    mesh.renderOrder = Math.round(_p.z * 1000);
    mesh.visible = opacity > 0.01;

    _qInv.copy(mesh.quaternion).invert();
    _tanLocal.copy(_tan).applyQuaternion(_qInv).normalize(); // dirección del recorrido en local

    const u = uniforms.current;
    u.uTime.value += dt;
    u.uBlur.value = blur;
    u.uTangentLocal.value.copy(_tanLocal);
    u.uImpulse.value = impulse.get();

    // ── Muestreo REAL de la curva a lo ancho de la card → cinta pegada al path ──
    // La card abarca un tramo de la curva igual a su ancho. Para cada punto se toma la
    // desviación de la curva respecto a la línea tangente (en local, compensando el scale).
    // El shader interpola entre estas desviaciones, así la lámina sigue el recorrido literal.
    const W = H * aspect * scale;          // ancho de la card en el mundo
    const rangeT = W / curveLen;           // porción de t que abarca la card
    // Deformación marcada que sigue la curva → efecto TÚNEL (las cards se comban con el recorrido)
    const bendGain = (mobile ? 0.36 : 0.52) * (0.4 + 0.6 * turn);
    for (let i = 0; i < SAMPLES; i++) {
      const ti = THREE.MathUtils.clamp(t + (i / (SAMPLES - 1) - 0.5) * rangeT, 0, 1);
      curve.getPointAt(ti, _ptmp);
      const s = (ti - t) * curveLen;       // arc-length desde el centro de la card
      _off.copy(_ptmp).sub(_p).addScaledVector(_tan, -s);            // desviación vs línea tangente (mundo)
      _off.applyQuaternion(_qInv).multiplyScalar(bendGain / scale);  // a local + compensar el scale del mesh
      u.uSamples.value[i].copy(_off);
    }

    u.uHalf.value.set(H * aspect * 0.5, H * 0.5);
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const mesh = meshRef.current;
    if (!mesh) return onSelect(slug, imageUrl, { left: 0, top: 0, width: 0, height: 0 });
    // Proyecta las 4 esquinas del plano a pantalla → rect para el morph de transición
    mesh.updateWorldMatrix(true, false);
    const canvas = gl.domElement.getBoundingClientRect();
    const hw = H * aspect * 0.5;
    const hh = H * 0.5;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [cx, cy] of [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]] as const) {
      _ptmp.set(cx, cy, 0).applyMatrix4(mesh.matrixWorld).project(camera);
      const sx = canvas.left + (_ptmp.x * 0.5 + 0.5) * canvas.width;
      const sy = canvas.top + (-_ptmp.y * 0.5 + 0.5) * canvas.height;
      minX = Math.min(minX, sx); maxX = Math.max(maxX, sx);
      minY = Math.min(minY, sy); maxY = Math.max(maxY, sy);
    }
    onSelect(slug, imageUrl, { left: minX, top: minY, width: maxX - minX, height: maxY - minY });
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    if (awayRef.current > maxAway) return; // sólo la central y sus costados
    e.stopPropagation();
    hoveredRef.current = true;
    onHoverStart(title, imageUrl);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    if (!hoveredRef.current) return;
    hoveredRef.current = false;
    onHoverEnd();
    document.body.style.cursor = "";
  };

  return (
    <mesh
      ref={meshRef}
      material={material}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry args={[H * aspect, H, mobile ? 16 : 28, mobile ? 10 : 18]} />
    </mesh>
  );
}
