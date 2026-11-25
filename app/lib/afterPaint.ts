/**
 * Corre `cb` después del próximo pintado. Sirve para armar animaciones de GSAP/ScrollTrigger
 * fuera de la hidratación: GSAP lee estilos y layout al crear tweens y, con el DOM recién
 * montado, eso fuerza un recálculo completo de estilos (reflow forzado). Devuelve cómo cancelarlo.
 */
export function afterPaint(cb: () => void): () => void {
  let timer = 0;
  const frame = requestAnimationFrame(() => {
    timer = window.setTimeout(cb, 0);
  });
  return () => {
    cancelAnimationFrame(frame);
    window.clearTimeout(timer);
  };
}
