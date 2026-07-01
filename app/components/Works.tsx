"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValue, type MotionValue } from "./motionValue";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import ProjectImagePlane from "./ProjectImagePlane";
import { useLenis } from "./SmoothScroll";
import { startCaseTransition } from "./caseTransition";

const DEBUG_PATH = false; // dibuja el path punteado + un punto donde cae cada card (spacing/orientación)
// Probar formas del resorte: "vertical" = columna que sube coileando · "spiral" = remolino hacia la cámara
const CURVE_MODE: "vertical" | "spiral" = "vertical";
const CARD_SCALE = 0.44; // escala constante de todas las cards (alfombras del mismo tamaño)

const WORKS = [
  { title: "Nuddo",      image: "/images/cases/nuddo/frame2.webp",         slug: "nuddo"      },
  { title: "Kennedy's",  image: "/images/cases/kennedys/ken1.webp",        slug: "kennedys"   },
  { title: "FFMates",    image: "/images/cases/ffmates/ffmatesmock1.webp", slug: "ffmates"    },
  { title: "CheckRTO",   image: "/images/cases/checkrto/check1.webp",      slug: "checkrto"   },
  { title: "Bausing",    image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&h=600&fit=crop", slug: "bausing"    },
  { title: "PartidosYa", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop", slug: "partidosya" },
];

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
}: {
  view: "spiral" | "list";
  setView: (v: "spiral" | "list") => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mobile, setMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const [labelTitle, setLabelTitle] = useState("");   // nombre del proyecto en hover
  const [labelImage, setLabelImage] = useState("");   // thumbnail del proyecto en hover
  const [labelOpen, setLabelOpen] = useState(false);  // dispara el slide del label
  const [hovered, setHovered] = useState<number | null>(null); // work activo en la lista
  const floatRef = useRef<HTMLDivElement>(null);      // contenedor de la imagen flotante

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

  // Imagen flotante que sigue al cursor — solo activa en la vista lista
  useEffect(() => {
    const el = floatRef.current;
    if (!el || view !== "list") return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;
    let prev = performance.now();
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      // Suavizado exponencial independiente del framerate (≈ mismo feel en 60/120 Hz)
      const s = 1 - Math.exp(-dt * 13);
      cx += (mx - cx) * s;
      cy += (my - cy) * s;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [view]);

  // Scroll INFINITO: integro la velocidad de Lenis en un offset continuo (nunca salta).
  // DIR = -1 → invertido: scroll hacia abajo mueve las cards en sentido contrario.
  const lenis = useLenis();
  const offset = useMotionValue(0);
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
    if (!lenis || view !== "spiral") return;
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
  }, [lenis, offset, impulse, view]);

  // Canvas memoizado: el hover de la lista NO debe re-renderizar la escena 3D
  // (reconciliar R3F en cada hover bloquea el main thread y traba las transiciones).
  const canvas = useMemo(
    () => (
      <Canvas
        frameloop={view === "spiral" && inView ? "always" : "never"}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ alpha: true, antialias: !mobile, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8.0], fov: 50 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          opacity: view === "spiral" ? 1 : 0,
          transform: view === "spiral" ? "scale(1)" : "scale(0.9)",
          filter:
            view === "spiral"
              ? "drop-shadow(0 28px 42px rgba(0,0,0,0.7)) blur(0px)"
              : "drop-shadow(0 28px 42px rgba(0,0,0,0.7)) blur(14px)",
          pointerEvents: view === "spiral" ? "auto" : "none",
          transition:
            view === "spiral"
              ? // entra (list → spiral): más lento y suave, con delay para que la lista despeje
                "opacity 0.8s ease 0.15s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, filter 0.8s ease 0.15s"
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
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [view, inView, mobile]
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        height: view === "list" ? "100vh" : "600vh",
        position: "relative",
        background: "#000",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
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
            opacity: view === "spiral" ? 1 : 0,
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
            opacity: view === "spiral" ? 1 : 0,
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
            opacity: view === "spiral" ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {view === "spiral" && (
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

        {/* Vista lista: nombres de los proyectos (entran en cascada) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 9,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: mobile ? "0.3rem" : "0.5rem",
            padding: mobile ? "7rem 2rem 2rem" : "9rem 2rem 2rem",
            pointerEvents: view === "list" ? "auto" : "none",
          }}
        >
          {WORKS.map((w, i) => {
            const isActive = view === "list" && hovered === i;
            const isDimmed = view === "list" && hovered !== null && hovered !== i;
            return (
              <button
                key={w.slug}
                onClick={(e) => {
                  const preview = floatRef.current?.firstElementChild as HTMLElement | null;
                  const src = preview && preview.getBoundingClientRect().width > 0 ? preview : (e.currentTarget as HTMLElement);
                  const r = src.getBoundingClientRect();
                  startCaseTransition({
                    slug: w.slug,
                    image: w.image,
                    rect: { left: r.left, top: r.top, width: r.width, height: r.height },
                  });
                }}
                onMouseEnter={() => {
                  if (view !== "list") return;
                  setHovered(i);
                }}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: isActive ? "#fff" : isDimmed ? "rgba(255,255,255,0.18)" : "#fff",
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  fontSize: mobile ? "1.8rem" : "clamp(2rem, 4.5vw, 3.8rem)",
                  opacity: view === "list" ? 1 : 0,
                  transform:
                    view === "list"
                      ? "translateY(0) scale(1)"
                      : "translateY(28px) scale(0.6)",
                  transformOrigin: "center center",
                  // El delay escalonado es SOLO para la cascada de entrada (transform/opacity).
                  // color (hover dim) responde al instante: sin delay.
                  transition: `transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${
                    view === "list" ? 0.1 + i * 0.08 : 0
                  }s, opacity 0.6s ease ${
                    view === "list" ? 0.1 + i * 0.08 : 0
                  }s, color 0.22s ease 0s`,
                }}
              >
                {w.title}
              </button>
            );
          })}
        </div>

        {/* Imagen del work que sigue al cursor — detrás del texto (vista lista) */}
        <div
          ref={floatRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 8,
            pointerEvents: "none",
            willChange: "transform",
          }}
        >
          <div
            style={{
              position: "relative",
              width: mobile ? 220 : 380,
              aspectRatio: "16 / 9",
              overflow: "hidden",
              borderRadius: "10px",
              boxShadow: "0 18px 48px rgba(0,0,0,0.5)",
              opacity: view === "list" && hovered !== null ? 1 : 0,
              transform:
                view === "list" && hovered !== null ? "scale(1)" : "scale(0.92)",
              transition:
                "opacity 0.28s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {WORKS.map((w, idx) => (
              <img
                key={w.slug}
                src={w.image}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  opacity: hovered === idx ? 1 : 0,
                  transition: "opacity 0.25s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
