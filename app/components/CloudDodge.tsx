"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NUBA_CLOUD_PATH } from "./NubaMark";

type Text = {
  hint: string;
  score: string;
  best: string;
  over: string;
  retry: string;
  close: string;
};

const BEST_KEY = "nuba_dodge_best";
const CLOUD_W = 76;
const CLOUD_BOX = { x: 15, y: 23, w: 47, h: 37.5 };
const LIME = "#C6FF00";

type Bug = { x: number; y: number; v: number; s: number; spin: number };

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(n: number) {
  try {
    localStorage.setItem(BEST_KEY, String(n));
  } catch {}
}

/** Mini juego del 404: la nube esquiva bugs que caen cada vez más rápido. */
export default function CloudDodge({ text, onClose }: { text: Text; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(readBest);
  const [over, setOver] = useState(false);
  const [round, setRound] = useState(0);

  const restart = useCallback(() => {
    setOver(false);
    setScore(0);
    setRound((r) => r + 1);
  }, []);

  useEffect(() => {
    closeRef.current?.focus();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "Enter" && over) restart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [over, onClose, restart]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const cloud = new Path2D(NUBA_CLOUD_PATH);
    const scale = CLOUD_W / CLOUD_BOX.w;
    const cloudH = CLOUD_BOX.h * scale;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const player = { x: w / 2, target: w / 2 };
    const keys = { left: false, right: false };
    const bugs: Bug[] = [];
    let elapsed = 0;
    let spawn = 0;
    let shown = -1;
    let last = performance.now();
    let raf = 0;
    let dead = false;

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      player.target = e.clientX - r.left;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keys.left = true;
      if (e.key === "ArrowRight") keys.right = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keys.left = false;
      if (e.key === "ArrowRight") keys.right = false;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    const drawBug = (b: Bug) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.spin);
      ctx.fillStyle = LIME;
      ctx.fillRect(-b.s / 2, -b.s / 2, b.s, b.s);
      ctx.fillStyle = "#000";
      ctx.fillRect(-b.s / 6, -b.s / 6, b.s / 3, b.s / 3);
      ctx.restore();
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      elapsed += dt;

      const speed = 520;
      if (keys.left) player.target -= speed * dt;
      if (keys.right) player.target += speed * dt;
      player.target = Math.max(CLOUD_W / 2, Math.min(w - CLOUD_W / 2, player.target));
      player.x += (player.target - player.x) * (1 - Math.exp(-dt * 14));

      const level = 1 + elapsed / 12;
      spawn -= dt;
      if (spawn <= 0) {
        spawn = Math.max(0.12, 0.6 / level);
        bugs.push({ x: Math.random() * w, y: -20, v: (180 + Math.random() * 140) * level, s: 9 + Math.random() * 7, spin: Math.random() * 6 });
      }

      const top = h - cloudH - 36;
      const cx = player.x;
      const cy = top + cloudH * 0.55;

      ctx.clearRect(0, 0, w, h);
      for (let i = bugs.length - 1; i >= 0; i--) {
        const b = bugs[i];
        b.y += b.v * dt;
        b.spin += dt * 3;
        if (b.y > h + 20) {
          bugs.splice(i, 1);
          continue;
        }
        const dx = (b.x - cx) / (CLOUD_W * 0.46);
        const dy = (b.y - cy) / (cloudH * 0.42);
        if (dx * dx + dy * dy < 1) dead = true;
        drawBug(b);
      }

      ctx.save();
      ctx.translate(cx - CLOUD_W / 2 - CLOUD_BOX.x * scale, top - CLOUD_BOX.y * scale);
      ctx.scale(scale, scale);
      ctx.fillStyle = dead ? "#5a5a5a" : "#EDEDED";
      ctx.fill(cloud);
      ctx.restore();

      const points = Math.floor(elapsed * 10);
      if (points !== shown) {
        shown = points;
        setScore(points);
      }

      if (dead) {
        const prevBest = readBest();
        if (points > prevBest) {
          saveBest(points);
          setBest(points);
        }
        setOver(true);
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [round]);

  return (
    <div role="dialog" aria-modal="true" aria-label={text.hint} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" onClick={over ? restart : undefined} />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5 font-mono text-[11px] uppercase tracking-[0.12em] sm:px-10">
        <span className="text-white/55">
          {text.score} <span className="text-[#C6FF00] tabular-nums">{String(score).padStart(4, "0")}</span>
          <span className="ml-5">
            {text.best} <span className="text-[#EDEDED] tabular-nums">{String(best).padStart(4, "0")}</span>
          </span>
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="pointer-events-auto rounded-full border border-white/15 px-3 py-1.5 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6FF00]"
        >
          {text.close} · esc
        </button>
      </div>

      {!over && score < 25 ? (
        <p className="pointer-events-none absolute inset-x-0 top-1/3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">
          {text.hint}
        </p>
      ) : null}

      {over ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="font-display text-[clamp(1.75rem,5vw,3rem)] font-medium tracking-[-0.04em] text-[#EDEDED]">{text.over}</p>
          <p className="font-mono text-[12px] tabular-nums text-[#C6FF00]">
            {text.score} {score} · {text.best} {best}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">{text.retry}</p>
        </div>
      ) : null}
    </div>
  );
}
