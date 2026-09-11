import { getImageProps } from "next/image";

export const HERO_SIZES = "(max-aspect-ratio: 9/5) 180vh, 100vw";
export const HERO_QUALITY = 95;

// Mismo srcset que el hero del caso: el overlay del morph y la precarga eligen la
// misma variante que después pinta <Image>, así la reusan de caché.
export function heroImageSet(src: string) {
  const { props } = getImageProps({ src, alt: "", fill: true, sizes: HERO_SIZES, quality: HERO_QUALITY });
  return { src: props.src, srcSet: props.srcSet ?? "", sizes: HERO_SIZES };
}

// Variante optimizada de ancho fijo para usos fuera de <Image> (texturas, thumbs).
// `width` es el ancho CSS: devuelve la variante 2x.
export function optimizedSrc(src: string, width: number, quality = 90) {
  return getImageProps({ src, alt: "", width, height: width, quality }).props.src;
}
