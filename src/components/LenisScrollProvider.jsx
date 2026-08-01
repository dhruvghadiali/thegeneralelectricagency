import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";

function LenisScrollBridge() {
  const lenis = useLenis(() => {
    window.dispatchEvent(new Event("lenis-scroll"));
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
  const [shouldUseLenis, setShouldUseLenis] = useState(() =>
    typeof window === "undefined"
      ? false
      : !window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches,
  );

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(max-width: 1024px), (pointer: coarse)");
    const updatePreference = () => {
      setPrefersReducedMotion(motionQuery.matches);
      setShouldUseLenis(!touchQuery.matches);
    };

    updatePreference();
    motionQuery.addEventListener("change", updatePreference);
    touchQuery.addEventListener("change", updatePreference);

    return () => {
      motionQuery.removeEventListener("change", updatePreference);
      touchQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !shouldUseLenis) {
      delete window.__lenis;
    }
  }, [prefersReducedMotion, shouldUseLenis]);

  if (prefersReducedMotion || !shouldUseLenis) {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.09,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
      }}
    >
      <LenisScrollBridge />
      {children}
    </ReactLenis>
  );
}

export default LenisScrollProvider;
