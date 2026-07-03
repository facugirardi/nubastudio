"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValue, type MotionValue } from "./motionValue";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import ProjectImagePlane from "./ProjectImagePlane";
import { useLenis } from "./SmoothScroll";
import { startCaseTransition } from "./caseTransition";
import WebGLErrorBoundary from "./WebGLErrorBoundary";
import { works } from "../data/works";

const DEBUG_PATH = false; // dibuja el path punteado + un punto donde cae cada card (spacing/orientación)
// Probar formas del resorte: "vertical" = columna que sube coileando · "spiral" = remolino hacia la cámara
const CURVE_MODE: "vertical" | "spiral" = "vertical";
const CARD_SCALE = 0.44; // escala constante de todas las cards (alfombras del mismo tamaño)

const WORKS = works.map(({ title, image, slug, subtitle, year }) => ({
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
  // Aspect REAL de cada imagen → el espaciado usa la card más ancha para que ninguna se solape
  const [maxAspect, setMaxAspect] = useState(1.5);
  useEffect(() => {
    let alive = true;
    Promise.all(
      WORKS.map(
        (w) =>
          new Promise<number>((res) => {
            const img = new window.Image();
            img.onload = () => res(img.width / img.height);
            img.onerror = () => res(1.5);
            img.src = w.image;
          })
      )
    ).then((aspects) => {
      if (alive) setMaxAspect(Math.max(...aspects));
    });
    return () => {
      alive = false;
    };
  }, []);

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

  // ── Espaciado PEGADO POR ARCO (alfombras una al lado de la otra, mismo tamaño) ──
  // Cada card ocupa un tramo de la curva igual a su ancho en el mundo. getPointAt ya está
  // parametrizado por longitud de arco, así que un reparto uniforme (remap = identidad) deja
  // las cards equiespaciadas por arco = pegadas borde a borde, formando una cinta/túnel.
  const { remap, count } = useMemo(() => {
    const CARD_W = 2.15 * maxAspect;     // ancho de la card MÁS ANCHA en el mundo (aspect real)
    const SC = CARD_SCALE;              // escala constante (= a la de la card)
    const GAP_W = 0;                   // sin separación: alfombras borde a borde
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

/* ───────── Works ───────── */
export default function Works({
  view,
  setView,
  webglAvailable = true,
  onWebGLFailed,
}: {
  view: "spiral" | "list";
  setView: (v: "spiral" | "list") => void;
  webglAvailable?: boolean;
  onWebGLFailed?: () => void;
}) {
  const effectiveView = webglAvailable ? view : "list";
  const prevViewRef = useRef(effectiveView);
  const sectionRef = useRef<HTMLElement>(null);
  const [mobile, setMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const [labelTitle, setLabelTitle] = useState("");   // nombre del proyecto en hover
  const [labelImage, setLabelImage] = useState("");   // thumbnail del proyecto en hover
  const [labelOpen, setLabelOpen] = useState(false);  // dispara el slide del label
  const [hovered, setHovered] = useState<number | null>(null); // work activo en la lista
  const [listMode, setListMode] = useState<"grid" | "list" | "feed">("list"); // sub-vista dentro de list

  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "150px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll INFINITO: integro la velocidad de Lenis en un offset continuo (nunca salta).
  // DIR = -1 → invertido: scroll hacia abajo mueve las cards en sentido contrario.
  const lenis = useLenis();
  const offset = useMotionValue(0);

  useEffect(() => {
    // Al cambiar de vista el layout de la sección cambia (list: auto · spiral: 600vh sticky):
    // volver arriba para que el sticky quede pineado y la espiral centrada.
    if (prevViewRef.current !== effectiveView) {
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    prevViewRef.current = effectiveView;
  }, [effectiveView, lenis]);

  useEffect(() => {
    if (effectiveView !== "spiral") return;
    // El scale(1) snapea al entrar, pero si la altura del contenedor no cambió el ResizeObserver
    // no dispara y queda la medición vieja (hecha con scale 0.9). Forzamos re-medición enseguida.
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    return () => clearTimeout(t);
  }, [effectiveView]);

  const impulse = useMotionValue(0);   // skew por inercia del scroll (se suaviza, vuelve a 0 al frenar)
  const FACTOR = 0.00002;        // sensibilidad scroll → ciclos de recorrido (más lento)
  const DIR = -1;                // invertido
  const IMPULSE = 0.0015;        // intensidad del efecto de impulso
  const AUTO_SPEED = 0.006;      // rotación automática: ciclos de recorrido por segundo (muy lento)
  const sensRef = useRef(FACTOR * DIR);
  const impRef = useRef(IMPULSE);
  const autoRef = useRef(AUTO_SPEED);   // magnitud de la rotación automática
  const autoDirRef = useRef(DIR);       // signo: sigue el último sentido del scroll
  const hoverCountRef = useRef(0);      // cards centrales con hover activo (>0 → frenar)
  const brakeRef = useRef(1);           // freno suavizado de la auto-rotación (1=corre · 0=frenado)
  sensRef.current = FACTOR * DIR; // se actualiza en cada render → el loop siempre lee el valor actual
  impRef.current = IMPULSE;
  autoRef.current = AUTO_SPEED;
  useEffect(() => {
    if (!lenis || effectiveView !== "spiral") return;
    let raf = 0;
    let prev = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000); // clamp: evita saltos al volver de pestaña en background
      prev = now;
      const v = lenis.velocity;
      // La rotación automática toma el sentido del último scroll (umbral: ignora ruido al frenar)
      if (Math.abs(v) > 5) autoDirRef.current = Math.sign(v) * DIR;
      // Freno: al hacer hover sobre una card central la auto-rotación se detiene (suave)
      const brakeTarget = hoverCountRef.current > 0 ? 0 : 1;
      brakeRef.current += (brakeTarget - brakeRef.current) * Math.min(1, dt * 6);
      // Avance = scroll (velocidad de Lenis) + rotación automática continua (por dt, frenable)
      const next =
        offset.get() +
        v * sensRef.current +
        autoRef.current * autoDirRef.current * dt * brakeRef.current;
      offset.set(next - Math.floor(next)); // wrap a [0,1): precisión estable, loop sin costura
      // Impulso: skew suavizado → scroll arriba = derecha · scroll abajo = izquierda
      const target = Math.max(-1, Math.min(1, -v * impRef.current));
      impulse.set(impulse.get() + (target - impulse.get()) * 0.12);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [lenis, offset, impulse, effectiveView]);

  // Canvas memoizado: el hover de la lista NO debe re-renderizar la escena 3D
  // (reconciliar R3F en cada hover bloquea el main thread y traba las transiciones).
  const canvas = useMemo(
    () =>
      webglAvailable ? (
        <WebGLErrorBoundary onError={onWebGLFailed}>
          <Canvas
            frameloop={effectiveView === "spiral" && inView ? "always" : "never"}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{
              alpha: true,
              antialias: !mobile,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
            }}
            camera={{ position: [0, 0, 8.0], fov: 50 }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              opacity: effectiveView === "spiral" ? 1 : 0,
              transform: effectiveView === "spiral" ? "scale(1)" : "scale(0.9)",
              filter:
                effectiveView === "spiral"
                  ? "drop-shadow(0 28px 42px rgba(0,0,0,0.7)) blur(0px)"
                  : "drop-shadow(0 28px 42px rgba(0,0,0,0.7)) blur(14px)",
              pointerEvents: effectiveView === "spiral" ? "auto" : "none",
              touchAction: effectiveView === "spiral" ? "pan-y" : "auto",
              transition:
                effectiveView === "spiral"
                  ? // entra (list → spiral): el transform NO transiciona (snapea a scale(1) al instante)
                    // porque R3F mide el canvas con getBoundingClientRect y un scale intermedio
                    // lo deja mal dimensionado → espiral descentrada. Solo animan opacity y blur.
                    "opacity 0.8s ease 0.15s, filter 0.8s ease 0.15s"
                  : // sale (spiral → list): más rápido
                    "opacity 0.45s ease, transform 0.5s ease, filter 0.45s ease",
            }}
          >
            <Suspense fallback={null}>
              <Scene
                offset={offset}
                impulse={impulse}
                mobile={mobile}
                onSelect={(slug, image, rect) => startCaseTransition({ slug, image, rect })}
                onHoverStart={(title, image) => {
                  hoverCountRef.current += 1;
                  setLabelTitle(title);
                  setLabelImage(image);
                  setLabelOpen(true);
                }}
                onHoverEnd={() => {
                  hoverCountRef.current = Math.max(0, hoverCountRef.current - 1);
                  if (hoverCountRef.current === 0) setLabelOpen(false);
                }}
              />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      ) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [effectiveView, inView, mobile, webglAvailable, onWebGLFailed]
  );

  // Abre el caso con la transición saliendo desde el thumbnail del item clickeado
  const openWork =
    (w: { slug: string; image: string }) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const preview = e.currentTarget.querySelector("img");
      const src = preview ?? e.currentTarget;
      const r = src.getBoundingClientRect();
      startCaseTransition({
        slug: w.slug,
        image: w.image,
        rect: { left: r.left, top: r.top, width: r.width, height: r.height },
      });
    };

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        height: effectiveView === "list" ? "auto" : mobile ? "600dvh" : "600vh",
        minHeight: effectiveView === "list" ? "100dvh" : undefined,
        position: "relative",
        background: "#000",
      }}
    >
      <style>{`
        .works-list {
          width: 100%;
          padding: clamp(7rem, 14vh, 10rem) clamp(1.25rem, 3vw, 2.5rem) clamp(3rem, 8vh, 5rem);
        }
        .works-list-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: clamp(1.5rem, 4vw, 2.75rem);
        }
        .works-mode {
          display: flex;
          align-items: baseline;
          gap: clamp(1.75rem, 5vw, 4.5rem);
        }
        .works-mode-btn {
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(1.05rem, 1.8vw, 1.6rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.28);
          transition: color 0.25s ease;
        }
        .works-mode-btn:hover {
          color: rgba(255, 255, 255, 0.6);
        }
        .works-mode-btn.is-on {
          color: #fff;
        }
        @keyframes worksBodyIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .works-body-anim {
          animation: worksBodyIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .works-list-heading {
          margin: 0;
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(1.7rem, 3.2vw, 2.7rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #fff;
        }
        .works-list-count {
          font-size: 0.38em;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.45);
          vertical-align: super;
          letter-spacing: 0;
          margin-left: 0.15em;
        }
        .works-list-row {
          width: 100%;
          display: grid;
          grid-template-columns: clamp(96px, 11vw, 148px) 1.2fr 1fr auto;
          align-items: center;
          column-gap: clamp(1.25rem, 4vw, 3.5rem);
          padding: 4px 0;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        .works-list-thumb,
        .works-list-cat,
        .works-list-year {
          transition: opacity 0.3s ease;
        }
        .works-list.is-dim .works-list-row:not(.is-active) .works-list-thumb,
        .works-list.is-dim .works-list-row:not(.is-active) .works-list-title,
        .works-list.is-dim .works-list-row:not(.is-active) .works-list-cat,
        .works-list.is-dim .works-list-row:not(.is-active) .works-list-year {
          opacity: 0.5;
        }
        .works-list-thumb {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 2px;
        }
        .works-list-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .works-list-row.is-active .works-list-thumb img,
        .works-list-row:hover .works-list-thumb img {
          transform: scale(1.07);
        }
        .works-list-meta {
          display: contents;
        }
        .works-list-title {
          display: block;
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(0.95rem, 1.25vw, 1.15rem);
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.2;
          color: #fff;
          transition: color 0.25s ease, opacity 0.3s ease;
        }
        .works-list-row.is-active .works-list-title,
        .works-list-row:hover .works-list-title {
          color: #fff;
        }
        .works-list-cat {
          display: block;
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.42);
        }
        .works-list-year {
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          color: rgba(255, 255, 255, 0.42);
          font-variant-numeric: tabular-nums;
          justify-self: end;
        }
        .works-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 1.75rem);
        }
        .works-grid-item {
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
        }
        .works-grid-thumb {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 2px;
        }
        .works-grid-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .works-grid-item:hover .works-grid-thumb img {
          transform: scale(1.06);
        }
        .works-grid-caption {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.65rem;
        }
        .works-grid-title {
          font-size: clamp(0.88rem, 1.1vw, 1rem);
          font-weight: 500;
          color: #fff;
        }
        .works-grid-year {
          font-size: clamp(0.78rem, 0.95vw, 0.88rem);
          color: rgba(255, 255, 255, 0.42);
          font-variant-numeric: tabular-nums;
        }
        .works-grid-item,
        .works-feed-item {
          transition: opacity 0.3s ease;
        }
        .works-list.is-dim .works-grid-item:not(.is-active),
        .works-list.is-dim .works-feed-item:not(.is-active) {
          opacity: 0.5;
        }
        .works-feed {
          display: flex;
          flex-direction: column;
          gap: clamp(3rem, 7vh, 5.5rem);
          width: min(900px, 100%);
          margin: 0 auto;
        }
        .works-feed-item {
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
        }
        .works-feed-thumb {
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-radius: 2px;
        }
        .works-feed-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .works-feed-item:hover .works-feed-thumb img {
          transform: scale(1.04);
        }
        .works-feed-caption {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.8rem;
        }
        .works-feed-title {
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          font-weight: 500;
          color: #fff;
        }
        .works-feed-cat {
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          color: rgba(255, 255, 255, 0.42);
          margin-left: 0.9rem;
        }
        .works-feed-year {
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          color: rgba(255, 255, 255, 0.42);
          font-variant-numeric: tabular-nums;
        }
        @media (max-width: 1023px) {
          .works-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 767px) {
          .works-list-row {
            grid-template-columns: 92px 1fr auto;
            column-gap: 1rem;
          }
          .works-list-meta {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            min-width: 0;
          }
          .works-feed-cat {
            display: none;
          }
          .works-mode-btn-feed {
            display: none;
          }
        }
        @media (max-width: 639px) {
          .works-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div
        style={{
          position: effectiveView === "list" ? "relative" : "sticky",
          top: effectiveView === "list" ? undefined : 0,
          height: effectiveView === "list" ? "auto" : mobile ? "100dvh" : "100vh",
          minHeight: effectiveView === "list" ? "100dvh" : undefined,
          width: "100%",
          overflow: effectiveView === "list" ? "visible" : "hidden",
          touchAction: effectiveView === "spiral" ? "pan-y" : "auto",
        }}
      >
        {/* Grid muy sutil */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
            maskImage: "radial-gradient(ellipse 78% 68% at 54% 50%, black 25%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 78% 68% at 54% 50%, black 25%, transparent 80%)",
            zIndex: 0,
            opacity: effectiveView === "spiral" ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Glow radial detrás de la card activa */}
        <div
          style={{
            position: "absolute",
            left: "54%",
            top: "50%",
            width: "55vw",
            height: "55vw",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(198,255,0,0.06) 0%, rgba(255,255,255,0.035) 22%, transparent 60%)",
            filter: "blur(20px)",
            zIndex: 1,
            pointerEvents: "none",
            opacity: effectiveView === "spiral" ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />


        {/* Canvas único con la curva de cards (drop-shadow real) — memoizado */}
        {canvas}

        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 7,
            background:
              "radial-gradient(ellipse 82% 76% at 54% 50%, transparent 38%, rgba(0,0,0,0.72) 100%)",
            opacity: effectiveView === "spiral" ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {effectiveView === "spiral" && (
          <>
        {/* Label del proyecto: card blanca que sube desde el medio-abajo de la pantalla */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "5%",
            transform: "translateX(-50%)",
            zIndex: 8,
            padding: "6px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              transform: labelOpen ? "translateY(0)" : "translateY(60vh)",
              transition: labelOpen
                ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"   // entra: desacelera al llegar
                : "transform 0.5s cubic-bezier(0.64, 0, 0.78, 1)",  // sale: misma curva reflejada (acelera al irse)
              willChange: "transform",
              display: "flex",
              alignItems: "center",
              gap: mobile ? "0.6rem" : "0.85rem",
              background: "#fff",
              color: "#000",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: mobile ? "0.95rem" : "1.3rem",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 400,
              padding: mobile ? "0.4rem 0.9rem 0.4rem 0.4rem" : "0.45rem 1.4rem 0.45rem 0.45rem",
              borderRadius: "10px",
              boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
            }}
          >
            {labelImage && (
              <img
                src={labelImage}
                alt=""
                style={{
                  height: mobile ? "1.9rem" : "2.4rem",
                  width: mobile ? "2.6rem" : "3.3rem",
                  objectFit: "cover",
                  borderRadius: "7px",
                  display: "block",
                  flexShrink: 0,
                }}
              />
            )}
            {labelTitle}
          </div>
        </div>

        {/* Scroll to explore */}
        <div
          style={{
            position: "absolute",
            right: "3.5rem",
            bottom: "3.5rem",
            zIndex: 10,
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            pointerEvents: "none",
            display: mobile ? "none" : "block",
          }}
        >
          scroll to explore
        </div>
          </>
        )}

        {/* Vista lista: índice editorial numerado */}
        <div
          className={`works-list${effectiveView === "list" && hovered !== null ? " is-dim" : ""}`}
          style={{
            position: "relative",
            zIndex: 9,
            pointerEvents: effectiveView === "list" ? "auto" : "none",
            opacity: effectiveView === "list" ? 1 : 0,
            transform:
              effectiveView === "list"
                ? "translateY(0)"
                : "translateY(24px)",
            transition:
              effectiveView === "list"
                ? "opacity 0.55s ease 0.1s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s"
                : "opacity 0.35s ease, transform 0.45s ease",
          }}
        >
          <header className="works-list-head">
            <h2 className="works-list-heading">
              Selected Works
              <sup className="works-list-count">({String(WORKS.length).padStart(2, "0")})</sup>
            </h2>
            <nav className="works-mode" aria-label="View mode">
              {(["grid", "list", "feed"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`works-mode-btn${listMode === m ? " is-on" : ""}${m === "feed" ? " works-mode-btn-feed" : ""}`}
                  onClick={() => setListMode(m)}
                >
                  {m === "grid" ? "Grid" : m === "list" ? "List" : "Feed"}
                </button>
              ))}
            </nav>
          </header>
          {listMode === "list" && (
          <div key="list" className="works-list-body works-body-anim">
          {WORKS.map((w, i) => {
            const isActive = effectiveView === "list" && hovered === i;
            return (
              <button
                key={w.slug}
                type="button"
                className={`works-list-row${isActive ? " is-active" : ""}`}
                onClick={openWork(w)}
                onMouseEnter={() => {
                  if (effectiveView !== "list") return;
                  setHovered(i);
                }}
                onMouseLeave={() => setHovered(null)}
                style={{
                  opacity: effectiveView === "list" ? 1 : 0,
                  transform:
                    effectiveView === "list"
                      ? "translateY(0)"
                      : "translateY(20px)",
                  transition: `opacity 0.6s ease ${effectiveView === "list" ? 0.12 + i * 0.06 : 0}s, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${effectiveView === "list" ? 0.12 + i * 0.06 : 0}s`,
                }}
              >
                <div className="works-list-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.image} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="works-list-meta">
                  <span className="works-list-title">{w.title}</span>
                  <span className="works-list-cat">{w.subtitle}</span>
                </div>
                <span className="works-list-year">{w.year}</span>
              </button>
            );
          })}
          </div>
          )}
          {listMode === "grid" && (
            <div key="grid" className="works-grid works-body-anim">
              {WORKS.map((w, i) => (
                <button
                  key={w.slug}
                  type="button"
                  className={`works-grid-item${hovered === i ? " is-active" : ""}`}
                  onClick={openWork(w)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="works-grid-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={w.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="works-grid-caption">
                    <span className="works-grid-title">{w.title}</span>
                    <span className="works-grid-year">{w.year}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          {listMode === "feed" && (
            <div key="feed" className="works-feed works-body-anim">
              {WORKS.map((w, i) => (
                <button
                  key={w.slug}
                  type="button"
                  className={`works-feed-item${hovered === i ? " is-active" : ""}`}
                  onClick={openWork(w)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="works-feed-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={w.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="works-feed-caption">
                    <span>
                      <span className="works-feed-title">{w.title}</span>
                      <span className="works-feed-cat">{w.subtitle}</span>
                    </span>
                    <span className="works-feed-year">{w.year}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
