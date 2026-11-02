"use client";

/**
 * La espiral 3D (three.js + react-three-fiber + drei). Vive aparte de Works.tsx
 * y se importa de forma diferida (ver loadSpiral en Works): en móvil, en la vista
 * lista y en los navegadores sin WebGL este módulo ni se descarga.
 */
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "./motionValue";
import ProjectImagePlane, { cardTextureSrc } from "./ProjectImagePlane";
import WebGLErrorBoundary from "./WebGLErrorBoundary";
import { visibleWorks } from "../data/works";

const DEBUG_PATH = false; // dibuja el path punteado + un punto donde cae cada card (spacing/orientación)
// Probar formas del resorte: "vertical" = columna que sube coileando · "spiral" = remolino hacia la cámara
const CURVE_MODE: "vertical" | "spiral" = "vertical";
const CARD_SCALE = 0.44; // escala constante de todas las cards (alfombras del mismo tamaño)

const WORKS = visibleWorks.map(({ title, image, slug, subtitle, year }) => ({
  title,
  image,
  slug,
  subtitle,
  year,
}));

const N = WORKS.length;

/* ───────── Debug temporal: línea del path + puntos de cada card ───────── */
function PathDebug({
  curve,
  remap,
  offset,
  count,
}: {
  curve: THREE.CatmullRomCurve3;
  remap: (u: number) => number;
  offset: MotionValue<number>;
  count: number;
}) {
  const points = useMemo(() => curve.getPoints(220), [curve]);
  const dotsRef = useRef<(THREE.Mesh | null)[]>([]);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const o = offset.get();
    for (let k = 0; k < count; k++) {
      const raw = k / count - o;
      const u = raw - Math.floor(raw); // fract
      curve.getPointAt(remap(u), tmp);
      dotsRef.current[k]?.position.copy(tmp);
    }
  });
  return (
    <>
      <Line points={points} color="#C6FF00" lineWidth={1} dashed dashSize={0.18} gapSize={0.12} transparent opacity={0.5} />
      {Array.from({ length: count }).map((_, k) => (
        <mesh key={k} ref={(el) => { dotsRef.current[k] = el; }}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color="#ff2d6b" />
        </mesh>
      ))}
    </>
  );
}

/* ───────── Escena 3D: curva abierta + cards a lo largo del recorrido ───────── */
function Scene({
  offset,
  impulse,
  mobile,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  offset: MotionValue<number>;
  impulse: MotionValue<number>;
  mobile: boolean;
  onSelect: (slug: string, image: string, rect: { left: number; top: number; width: number; height: number }) => void;
  onHoverStart: (title: string, image: string) => void;
  onHoverEnd: () => void;
}) {
  // Ancho de la card más ancha (Nubapay cover es ~16:9; el resto 3:2).
  const maxAspect = 1.78;

  // Hélice / RESORTE horizontal: las cards avanzan en X mientras coilean en el plano Y-Z.
  // Centro (s=0.5) al frente (protagonista); hacia los lados giran y recedan al fondo.
  const curve = useMemo(() => {
    const Wmain     = mobile ? 2.6 : 3.7;   // longitud del recorrido (más aplastado en vertical)
    const Rcoil     = mobile ? 1.6 : 2.1;  // radio del coil (más ancho)
    const Rz        = mobile ? 3.0 : 3.8;   // radio en profundidad (más ancho)
    const endDepth  = mobile ? 4.5 : 6.8;   // cuánto recede hacia los extremos (central al frente)
    const turns     = 2.3;                  // vueltas del resorte (menos vueltas → curvas más abiertas, no se tocan)
    const xStart    = mobile ? -1.7 : -2.5; // X del inicio (arriba)
    const xEnd      = mobile ? 2.8 : 4.2;   // X del final (abajo)
    const WkickStart = mobile ? -1.9 : -2.9;  // empuje de la punta de ARRIBA (inicio): negativo = se expande a la DERECHA
    const WkickEnd   = mobile ? -2.4 : -3.6;  // empuje de la punta de ABAJO (final): negativo = se expande a la IZQUIERDA
    const sideSpread = mobile ? 2.6 : 3.4;    // cuánto se tiran los brazos hacia los COSTADOS (X) en vez de salir rectos
    const tilt      = 0.262;                // inclinación de toda la columna (~15° a la izquierda)
    const tiltAxis  = new THREE.Vector3(0, 0, 1);

    const STEPS = 14;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= STEPS; i++) {
      const s = i / STEPS;
      const theta = (s - 0.5) * turns * Math.PI * 2; // θ=0 en el centro
      const depth = Math.abs(s - 0.5) * endDepth;    // los extremos recedan al fondo
      let x: number, y: number, z: number;
      if (CURVE_MODE === "vertical") {
        // Resorte VERTICAL: avanza en Y (columna), coilea en X-Z; central al frente
        const u = (s - 0.5) * 2; // −1 (inicio) .. +1 (final)
        const kick = u < 0 ? WkickStart : WkickEnd;                       // punta de arriba vs abajo
        const tipMag = Math.pow(Math.abs(u), 3);                          // 0 en el centro · 1 en las puntas
        const sideKick = Math.sign(u) * tipMag * kick;                    // X: abre las puntas a los costados
        // ── Apertura lateral de los brazos VISIBLES: en vez de salir rectos, se tiran a los costados ──
        // pow(|u|, 1.8) = apertura GRADUAL desde el centro (intacto) hacia las puntas: curvatura suave
        // (radio grande) → los brazos se tiran a los lados sin doblez abrupto que combe las cards.
        const spread   = -Math.sign(u) * Math.pow(Math.abs(u), 1.8) * sideSpread; // tira el brazo al costado
        const yExtendGain = u < 0 ? 0.05 : 0.45;                         // arriba: casi sin extensión axial (no se dispara) · abajo: igual
        const yExtend = Math.sign(u) * tipMag * Math.abs(kick) * yExtendGain; // Y: las puntas se extienden en el eje (evita la U)
        const yLift = (u < 0 ? -1.0 : -2.5) * tipMag;                    // inicio ahora BAJA un poco (no se va arriba) · final baja
        const centerDrop = (1 - u * u) * -0.6;                            // negativo = levanta un poco la zona central
        y = THREE.MathUtils.lerp(Wmain, -Wmain, s) - yExtend + yLift - centerDrop; // inicio ARRIBA → final ABAJO
        // Coil de amplitud CONSTANTE (mismo ancho en todo el resorte, puntas = centro)
        x = Rcoil * Math.sin(theta) + THREE.MathUtils.lerp(xStart, xEnd, s) + sideKick + spread;
        z = Rz * Math.cos(theta) - depth;
      } else {
        // ESPIRAL hacia la cámara: eje en Z, coilea en X-Y; central al frente (s=0.5 → z máx)
        const r = Rcoil + depth * 0.35;              // el radio abre hacia los extremos
        x = r * Math.cos(theta);
        y = r * Math.sin(theta);
        z = -depth; // s=0.5 al frente (z=0), extremos al fondo
      }
      pts.push(new THREE.Vector3(x, y, z).applyAxisAngle(tiltAxis, tilt));
    }
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
  }, [mobile]);

  useEffect(() => {
    return () => {
      for (const w of WORKS) useTexture.clear(cardTextureSrc(w.image));
    };
  }, []);

  // ── Espaciado PEGADO POR ARCO (alfombras una al lado de la otra, mismo tamaño) ──
  // Cada card ocupa un tramo de la curva igual a su ancho en el mundo. getPointAt ya está
  // parametrizado por longitud de arco, así que un reparto uniforme (remap = identidad) deja
  // las cards equiespaciadas por arco = pegadas borde a borde, formando una cinta/túnel.
  const { remap, count } = useMemo(() => {
    const CARD_W = 2.15 * maxAspect;     // ancho de la card MÁS ANCHA en el mundo (aspect real)
    const SC = CARD_SCALE;              // escala constante (= a la de la card)
    const GAP_W = -0.12;                // solape leve: menos separación que borde a borde
    const cardArc = CARD_W * SC + GAP_W;
    const len = curve.getLength();
    const count = Math.max(3, Math.round(len / cardArc));
    const remap = (u: number) => Math.min(0.999999, Math.max(0, u)); // arc-length uniforme
    return { remap, count };
  }, [curve, mobile, maxAspect]);

  return (
    <group position={[-0.64, -1.13, 1.9]}>
      {DEBUG_PATH && <PathDebug curve={curve} remap={remap} offset={offset} count={count} />}
      {Array.from({ length: count }).map((_, k) => {
        const work = WORKS[k % N];
        return (
          <ProjectImagePlane
            key={k}
            imageUrl={work.image}
            slug={work.slug}
            title={work.title}
            count={count}
            slotU={k / count}
            offset={offset}
            curve={curve}
            remap={remap}
            cardScale={CARD_SCALE}
            stairSlope={count * 0.28}
            impulse={impulse}
            mobile={mobile}
            onSelect={onSelect}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
          />
        );
      })}
    </group>
  );
}

/* ───────── Canvas: lo que Works monta cuando la vista es la espiral ───────── */
type SpiralProps = {
  /** La vista actual es la espiral (si no, el Canvas está en su fade-out antes de desmontarse). */
  active: boolean;
  inView: boolean;
  mobile: boolean;
  offset: MotionValue<number>;
  impulse: MotionValue<number>;
  onSelect: (slug: string, image: string, rect: { left: number; top: number; width: number; height: number }) => void;
  onHoverStart: (title: string, image: string) => void;
  onHoverEnd: () => void;
};

export default function WorksSpiral({
  active,
  inView,
  mobile,
  offset,
  impulse,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: SpiralProps) {
  return (
    <Canvas
      frameloop={active && inView ? "always" : "never"}
      dpr={[1, 1.25]}
      performance={{ min: 0.5 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: true,
      }}
      camera={{ position: [0, 0, 8.0], fov: 50 }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(0.96)",
        pointerEvents: active ? "auto" : "none",
        touchAction: active ? "pan-y" : "auto",
        transition: active
          ? "opacity 0.8s ease 0.15s"
          : "opacity 0.45s ease, transform 0.5s ease",
      }}
    >
      <Suspense fallback={null}>
        <Scene
          offset={offset}
          impulse={impulse}
          mobile={mobile}
          onSelect={onSelect}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      </Suspense>
    </Canvas>
  );
}
