import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";

function LenisScrollBridge() {
  const lenis = useLenis(() => {
    window.dispatchEvent(new Event("scroll"));
  });

  useEffect(() => {
    if (!lenis) {
      return undefined;
    }

    window.__lenis = lenis;

    return () => {
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, [lenis]);

  return null;
}

function LenisScrollProvider({ children }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  if (prefersReducedMotion) {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.09,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.15,
        syncTouch: true,
        anchors: true,
      }}
    >
      <LenisScrollBridge />
      {children}
    </ReactLenis>
  );
}

export default LenisScrollProvider;
