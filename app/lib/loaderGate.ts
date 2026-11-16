/**
 * Coordina el loader de la home con la entrada del hero: el hero arranca su
 * animación cuando el loader empieza a abrirse (o de una, si no hay loader).
 */
export const LOADER_ID = "nuba-loader";
export const LOADER_KEY = "nuba_loader";

let revealed = false;
const waiting = new Set<() => void>();

export function markRevealed() {
  revealed = true;
  waiting.forEach((cb) => cb());
  waiting.clear();
}

function loaderActive() {
  const el = document.getElementById(LOADER_ID);
  return Boolean(el && el.dataset.state !== "skip" && el.dataset.state !== "done");
}

export function onLoaderReveal(cb: () => void): () => void {
  if (revealed || !loaderActive()) {
    cb();
    return () => {};
  }
  waiting.add(cb);
  return () => waiting.delete(cb);
}
