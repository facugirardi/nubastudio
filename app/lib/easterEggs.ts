import { CONTACT, SITE_URL } from "./seo";
import { localePath, type Lang } from "./lang";

const LIME = "color:#C6FF00";
const DIM = "color:#888";
const MONO = "font-family:ui-monospace,monospace";

const LOGO = [
  "  ▄▄████████████████████▄▄  ",
  " ██████████████████████████ ",
  "████████████████████████████",
  "████████████████████████████",
  "█████████████▀▀▀▀▀▀█████████",
  "██████████▀         ▀███████",
  "█████████▀            ██████",
  "██████▀               ██████",
  "██████                ██████",
  "██████               ▄██████",
  "███████▄          ▄▄████████",
  "████████████████████████████",
  " ██████████████████████████ ",
  "  ▀▀████████████████████▀▀  ",
].join("\n");

const TEXT = {
  en: {
    hello: "Looking at the code? We'd get along.",
    write: "Write to us:",
    help: "Type nuba.help() to see what else is in here.",
    commands: {
      help: "this list",
      cases: "our projects, in a table",
      contact: "how to reach us",
      rain: "make it rain",
    },
    raining: "☔ Bring an umbrella.",
  },
  es: {
    hello: "¿Mirando el código? Nos vamos a llevar bien.",
    write: "Escribinos:",
    help: "Escribí nuba.help() para ver qué más hay acá.",
    commands: {
      help: "esta lista",
      cases: "nuestros proyectos, en una tabla",
      contact: "cómo contactarnos",
      rain: "que llueva",
    },
    raining: "☔ Traé paraguas.",
  },
} as const;

let installed = false;

/** Navega como un link interno más, así pasa por la transición de páginas. */
function go(href: string) {
  const a = document.createElement("a");
  a.href = href;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function rain() {
  if (document.querySelector("[data-nuba-rain]")) return;
  const canvas = document.createElement("canvas");
  canvas.dataset.nubaRain = "";
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:140";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.remove();

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const drops = Array.from({ length: Math.round(w / 9) }, () => ({
    x: Math.random() * w,
    y: Math.random() * -h,
    v: 9 + Math.random() * 9,
    l: 10 + Math.random() * 16,
  }));
  const DURATION = 6000;
  const start = performance.now();

  const frame = (now: number) => {
    const t = now - start;
    const fade = t > DURATION - 1000 ? Math.max(0, (DURATION - t) / 1000) : 1;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = `rgba(255,255,255,${0.55 * fade})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (const d of drops) {
      d.y += d.v;
      if (d.y > h && t < DURATION - 1000) {
        d.y = -d.l;
        d.x = Math.random() * w;
      }
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - d.l * 0.12, d.y + d.l);
    }
    ctx.stroke();
    if (t < DURATION) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}

function printBanner(lang: Lang) {
  const t = TEXT[lang];
  console.log(`%c${LOGO}`, `${LIME};${MONO};font-size:10px;line-height:1`);
  console.log(`%c${t.hello}`, "font-size:13px;font-weight:600");
  console.log(`%c${t.write} %c${CONTACT.email || CONTACT.whatsapp}`, DIM, LIME);
  console.log(`%c${t.help}`, `${DIM};${MONO}`);
}

function installConsole(lang: Lang) {
  const t = TEXT[lang];
  const api = {
    help() {
      const rows = Object.entries(t.commands).map(([k, v]) => `%cnuba.${k}()%c  ${v}`);
      console.log(rows.join("\n"), ...rows.flatMap(() => [`${LIME};${MONO}`, DIM]));
    },
    cases() {
      import("../data/works").then(({ visibleWorks }) =>
        console.table(
          visibleWorks.map((w) => ({ project: w.title, url: SITE_URL + localePath(lang, `/cases/${w.slug}`) }))
        )
      );
    },
    contact() {
      console.log(`%c${[CONTACT.email && `✉ ${CONTACT.email}`, `✆ ${CONTACT.whatsapp}`].filter(Boolean).join("\n")}`, `${LIME};${MONO}`);
      go(localePath(lang, "/contact"));
    },
    rain() {
      console.log(t.raining);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) rain();
    },
  };
  Object.defineProperty(window, "nuba", { value: api, configurable: true });
}

export function installEasterEggs(lang: Lang) {
  if (installed) return;
  installed = true;
  printBanner(lang);
  installConsole(lang);
}
