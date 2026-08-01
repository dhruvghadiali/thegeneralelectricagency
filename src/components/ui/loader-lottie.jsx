import { useEffect, useRef } from "react";
// The light player drops expressions and effects, which this animation does not
// use. Half the bytes of the full build, and the loader is the one thing on the
// page that must never be slow.
import lottie from "lottie-web/build/player/lottie_light";

import loadingAnimation from "@/assets/json/loading-img-01.json";

/**
 * Isolated so the player and its animation data land in their own chunk.
 *
 * Calls `onReady` once the SVG is actually in the DOM, which is what the
 * loading screen waits for before revealing the rest of its content.
 */
function LoaderLottie({ onReady }) {
  const containerRef = useRef(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const animation = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      // Lottie mutates the data it is given, so hand it a copy.
      animationData: structuredClone(loadingAnimation),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
        progressiveLoad: false,
      },
    });

    const handleReady = () => onReadyRef.current?.();

    animation.addEventListener("DOMLoaded", handleReady);

    return () => {
      animation.removeEventListener("DOMLoaded", handleReady);
      animation.destroy();
    };
  }, []);

  return <div ref={containerRef} className="showcase-loader__lottie-canvas" />;
}

export default LoaderLottie;
