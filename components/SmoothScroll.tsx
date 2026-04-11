"use client";

import { ReactLenis } from '@studio-freight/react-lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.2, smoothWheel: true }}>
      {/* Bypass strict generic type validation for React 19 vs 18 differences */}
      {children as any}
    </ReactLenis>
  );
}
