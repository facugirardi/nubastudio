import { useRef } from "react";

// Contenedor mutable minimalista (get/set) para valores animados por rAF.
// Reemplaza a framer-motion useMotionValue: acá los valores solo se leen/escriben
// dentro de loops de requestAnimationFrame, sin suscripciones reactivas.
export type MotionValue<T = number> = {
  get: () => T;
  set: (v: T) => void;
};

export function useMotionValue<T>(initial: T): MotionValue<T> {
  const ref = useRef<{ value: T; mv: MotionValue<T> } | null>(null);
  if (ref.current === null) {
    const store = { value: initial } as { value: T; mv: MotionValue<T> };
    store.mv = {
      get: () => store.value,
      set: (v: T) => {
        store.value = v;
      },
    };
    ref.current = store;
  }
  return ref.current.mv;
}
