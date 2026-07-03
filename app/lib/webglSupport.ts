type WebGLContext = WebGLRenderingContext | WebGL2RenderingContext;

function releaseContext(gl: WebGLContext) {
  const ext = gl.getExtension("WEBGL_lose_context");
  ext?.loseContext();
}

/** Comprueba si el navegador puede crear un contexto WebGL usable. */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const options: WebGLContextAttributes = {
      alpha: true,
      antialias: false,
      depth: true,
      // Sin aceleración por hardware (SwiftShader/software) el contexto falla:
      // en esas máquinas la espiral no debe mostrarse.
      failIfMajorPerformanceCaveat: true,
      powerPreference: "default",
    };

    for (const type of ["webgl2", "webgl", "experimental-webgl"] as const) {
      const gl = canvas.getContext(type, options) as WebGLContext | null;
      if (gl) {
        releaseContext(gl);
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}
