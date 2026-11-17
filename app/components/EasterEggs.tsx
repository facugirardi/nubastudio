"use client";

import { useEffect } from "react";
import { useLanguage } from "../lib/i18n";

/** Consola y título de pestaña: se cargan cuando el navegador está libre, nunca en la carga crítica. */
export default function EasterEggs() {
  const { lang } = useLanguage();

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => {
      import("../lib/easterEggs").then((m) => m.installEasterEggs(lang)).catch(() => {});
    });
    return () => cancel(handle);
  }, [lang]);

  return null;
}
