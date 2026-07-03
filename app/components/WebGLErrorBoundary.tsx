"use client";

import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: () => void;
};

type State = {
  failed: boolean;
};

/** Evita que un fallo de WebGL/Three rompa toda la página. */
export default class WebGLErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.warn("[Nuba] WebGL scene failed, using list fallback:", error.message);
    this.props.onError?.();
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
