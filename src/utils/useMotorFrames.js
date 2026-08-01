import { useEffect, useMemo, useState } from "react";

export const MOBILE_FRAME_QUERY = "(max-width: 767px)";
export const DEFAULT_DESKTOP_FRAME_PATH = "/motor-frames/desktop";
export const DEFAULT_MOBILE_FRAME_PATH = "/motor-frames/mobile";
export const DEFAULT_FRAME_COUNT = 300;

const FIRST_FRAME = 1;

export function getFrameUrl(basePath, frameNumber) {
  return `${basePath}/frame_${String(frameNumber).padStart(4, "0")}.webp`;
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Resolves which frame set to use and builds the full URL list.
 *
 * This lives outside the animation component because the preloader has to know
 * the URLs before the (lazy loaded) canvas ever mounts.
 */
export function useMotorFrames({
  frameCount = DEFAULT_FRAME_COUNT,
  desktopFramePath = DEFAULT_DESKTOP_FRAME_PATH,
  mobileFramePath = DEFAULT_MOBILE_FRAME_PATH,
  mobileFrameQuery = MOBILE_FRAME_QUERY,
} = {}) {
  const useMobileFrames = useMediaQuery(mobileFrameQuery);
  const framePath = useMobileFrames ? mobileFramePath : desktopFramePath;

  const frameUrls = useMemo(
    () =>
      Array.from({ length: frameCount }, (_, index) =>
        getFrameUrl(framePath, index + FIRST_FRAME),
      ),
    [frameCount, framePath],
  );

  return { frameUrls, framePath, frameCount, useMobileFrames };
}
