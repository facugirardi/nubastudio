export type LightTarget = {
  x: number;
  y: number;
  hover: number;
  intensity: number;
};

export type HeroLight = {
  setPalette: (index: number) => void;
  destroy: () => void;
};

type RGB = [number, number, number];
type Palette = { core: RGB; mid: RGB; outer: RGB; rim: RGB };

const PALETTES: Palette[] = [
  { core: [1, 1, 1], mid: [0.9, 0.91, 0.94], outer: [0.86, 0.9, 0.82], rim: [1, 1, 1] },
  { core: [1, 0.86, 0.7], mid: [1, 0.55, 0.5], outer: [0.62, 0.52, 1], rim: [1, 0.8, 0.68] },
  { core: [0.86, 0.9, 1], mid: [0.5, 0.58, 1], outer: [0.32, 0.38, 0.95], rim: [0.7, 0.77, 1] },
  { core: [0.95, 1, 0.78], mid: [0.8, 1, 0.1], outer: [0.78, 1, 0], rim: [0.86, 1, 0.35] },
];

const MAX_TURN = Math.PI * 1.4;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform float uDpr;
uniform float uTime;
uniform vec2 uCenter;
uniform float uHalf;
uniform vec2 uLight;
uniform float uIntensity;
uniform float uHover;
uniform vec3 uCore;
uniform vec3 uMid;
uniform vec3 uOuter;
uniform vec3 uRim;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return v;
}

float sdRoundBox(vec2 q, float b, float r) {
  vec2 d = abs(q) - vec2(b - r);
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y * uDpr - gl_FragCoord.y) / uDpr;
  vec2 q = p - uCenter;
  float r = uHalf * 0.434;
  float d = sdRoundBox(q, uHalf, r);

  vec2 e = vec2(0.75, 0.0);
  vec2 n = normalize(vec2(
    sdRoundBox(q + e.xy, uHalf, r) - sdRoundBox(q - e.xy, uHalf, r),
    sdRoundBox(q + e.yx, uHalf, r) - sdRoundBox(q - e.yx, uHalf, r)
  ));

  vec2 ep = q - n * max(d, 0.0);
  vec2 toL = uLight - ep;
  float distL = length(toL);
  float facing = max(dot(n, toL / max(distL, 1.0)), 0.0);
  float atten = 1.0 / (1.0 + (distL * distL) / (uHalf * uHalf * 12.0));
  float lit = pow(facing, 1.8) * atten * uIntensity * 1.8;

  float t = uTime * 0.06;
  vec3 col = vec3(0.0);

  if (d < 0.0) {
    vec2 sp = q / uHalf;
    float f = fbm(sp * 1.6 + vec2(t * 1.3, -t));
    float g = fbm(sp * 2.4 - vec2(t * 0.8, t * 1.1) + f);
    vec3 sky = mix(uMid, uCore, smoothstep(0.25, 0.8, f));
    sky = mix(sky, uOuter, smoothstep(0.55, 0.95, g) * 0.35);
    vec2 lightDir = uLight / max(length(uLight), 1.0);
    float side = clamp(dot(q / uHalf, lightDir) * 0.5 + 0.5, 0.0, 1.0);
    sky *= 0.68 + 0.34 * side * uIntensity + 0.1 * uHover;
    col = sky;
  } else {
    float edge = exp(-d / 2.2);
    float bleed = exp(-d / (uHalf * 0.32));
    float wide = exp(-d / (uHalf * 1.1));
    col += uRim * (edge * 0.9 + bleed * 0.55) * lit;
    col += uRim * wide * 0.12 * lit;
    col += uRim * (edge * 0.7 + bleed * 0.35) * uHover * 0.6;

    float atmos = fbm(q / uHalf * 0.9 + vec2(t, t * 0.6));
    float amb = exp(-d / (uHalf * 0.6)) * 0.13 + exp(-length(q) / (uHalf * 2.2)) * 0.035;
    col += mix(uOuter, uMid, 0.85) * amb * (0.7 + 0.6 * atmos);
  }

  vec2 border = min(p, uRes - p) / (uRes * 0.5);
  col *= smoothstep(0.0, 0.35, min(border.x, border.y));

  col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * 0.018;
  col = max(col, 0.0);
  float a = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
  gl_FragColor = vec4(col, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) throw new Error("shader");
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "compile");
  return s;
}

export function createHeroLight({
  canvas,
  mark,
  target,
  palette,
  onLost,
}: {
  canvas: HTMLCanvasElement;
  mark: HTMLElement;
  target: LightTarget;
  palette: number;
  onLost: () => void;
}): HeroLight | null {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false, powerPreference: "low-power" });
  if (!gl) return null;

  let program: WebGLProgram;
  try {
    program = gl.createProgram() as WebGLProgram;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("link");
  } catch {
    return null;
  }

  gl.useProgram(program);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const U = {
    res: u("uRes"),
    dpr: u("uDpr"),
    time: u("uTime"),
    center: u("uCenter"),
    half: u("uHalf"),
    light: u("uLight"),
    intensity: u("uIntensity"),
    hover: u("uHover"),
    core: u("uCore"),
    mid: u("uMid"),
    outer: u("uOuter"),
    rim: u("uRim"),
  };

  const cur = { x: target.x, y: target.y, hover: target.hover, intensity: target.intensity };
  let angle = Math.atan2(target.y, target.x);
  let radius = Math.hypot(target.x, target.y);
  const colors = structuredClone(PALETTES[palette]);
  let goal = PALETTES[palette];

  let w = 0;
  let h = 0;
  let dpr = 1;
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) loop();
  });
  io.observe(canvas);

  let raf = 0;
  let last = performance.now();
  const start = last;
  let running = false;

  const frame = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const k = 1 - Math.exp(-dt * 8);
    const goalRadius = Math.hypot(target.x, target.y);
    if (goalRadius > 2) {
      const goalAngle = Math.atan2(target.y, target.x);
      const delta = Math.atan2(Math.sin(goalAngle - angle), Math.cos(goalAngle - angle));
      const maxStep = MAX_TURN * dt;
      angle += Math.max(-maxStep, Math.min(maxStep, delta * k));
    }
    radius += (goalRadius - radius) * k;
    cur.x = Math.cos(angle) * radius;
    cur.y = Math.sin(angle) * radius;
    cur.hover += (target.hover - cur.hover) * (1 - Math.exp(-dt * 7));
    cur.intensity += (target.intensity - cur.intensity) * (1 - Math.exp(-dt * 4));
    const kc = 1 - Math.exp(-dt * 3.5);
    (["core", "mid", "outer", "rim"] as const).forEach((key) => {
      for (let i = 0; i < 3; i++) colors[key][i] += (goal[key][i] - colors[key][i]) * kc;
    });

    const c = canvas.getBoundingClientRect();
    const m = mark.getBoundingClientRect();

    gl.uniform2f(U.res, w, h);
    gl.uniform1f(U.dpr, dpr);
    gl.uniform1f(U.time, (now - start) / 1000);
    gl.uniform2f(U.center, m.left + m.width / 2 - c.left, m.top + m.height / 2 - c.top);
    gl.uniform1f(U.half, m.width / 2);
    gl.uniform2f(U.light, cur.x, cur.y);
    gl.uniform1f(U.intensity, cur.intensity);
    gl.uniform1f(U.hover, cur.hover);
    gl.uniform3fv(U.core, colors.core);
    gl.uniform3fv(U.mid, colors.mid);
    gl.uniform3fv(U.outer, colors.outer);
    gl.uniform3fv(U.rim, colors.rim);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    else running = false;
  };

  function loop() {
    if (running || !visible || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  const onVisibility = () => loop();
  document.addEventListener("visibilitychange", onVisibility);

  const onContextLost = (e: Event) => {
    e.preventDefault();
    destroy();
    onLost();
  };
  canvas.addEventListener("webglcontextlost", onContextLost);

  loop();

  function destroy() {
    cancelAnimationFrame(raf);
    running = false;
    ro.disconnect();
    io.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    canvas.removeEventListener("webglcontextlost", onContextLost);
  }

  return {
    setPalette: (index) => {
      goal = PALETTES[index] ?? PALETTES[0];
    },
    destroy,
  };
}
