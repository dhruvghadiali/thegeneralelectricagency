import { useEffect, useMemo, useState } from "react";

export const MOBILE_FRAME_QUERY = "(max-width: 767px)";
export const DEFAULT_DESKTOP_FRAME_PATH = "/motor-frames/desktop";
/**
 * Phone frames are 831x1478, not the 1080x1920 masters.
 *
 * A 390px phone at our 1.75x DPR cap needs an 831x1477 source to fill the
 * screen with object-fit: cover, so the masters were decoding 1.78x more pixels
 * than could ever be displayed. Decode cost is what makes the scroll stutter,
 * and it scales with source pixels - not with file size.
 *
 * The 1080x1920 set is still on disk at /motor-frames/mobile if a larger source
 * is ever needed; regenerate with:
 *   convert mobile/frame_XXXX.webp -resize 832x1478 -quality 82 \
 *     -define webp:method=6 mobile-lite/frame_XXXX.webp
 */
export const DEFAULT_MOBILE_FRAME_PATH = "/motor-frames/mobile-lite";
export const DEFAULT_FRAME_COUNT = 300;

/**
 * Play every Nth frame on phones.
 *
 * 300 frames at 1080x1920 is ~2.3GB once decoded, far past what a phone will
 * hold resident. The browser evicts and re-decodes on each draw, and those
 * synchronous decodes stall the main thread - which starves React and leaves
 * the navigation and section content visibly trailing the canvas. Halving the
 * set halves both the memory and the decode pressure; at this scroll length the
 * animation is still smooth.
 */
export const MOBILE_FRAME_STEP = 2;

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
  sourceFrameCount = DEFAULT_FRAME_COUNT,
  desktopFramePath = DEFAULT_DESKTOP_FRAME_PATH,
  mobileFramePath = DEFAULT_MOBILE_FRAME_PATH,
  mobileFrameQuery = MOBILE_FRAME_QUERY,
  mobileFrameStep = MOBILE_FRAME_STEP,
} = {}) {
  const useMobileFrames = useMediaQuery(mobileFrameQuery);
  const framePath = useMobileFrames ? mobileFramePath : desktopFramePath;
  const step = useMobileFrames ? Math.max(1, mobileFrameStep) : 1;

  const frameUrls = useMemo(() => {
    const urls = [];

    for (let source = 0; source < sourceFrameCount; source += step) {
      urls.push(getFrameUrl(framePath, source + FIRST_FRAME));
    }

    // Always finish on the true last frame so the animation still resolves to
    // the fully assembled motor regardless of the step.
    const lastUrl = getFrameUrl(framePath, sourceFrameCount);

    if (urls[urls.length - 1] !== lastUrl) {
      urls.push(lastUrl);
    }

    return urls;
  }, [framePath, sourceFrameCount, step]);

  return {
    frameUrls,
    framePath,
    frameCount: frameUrls.length,
    useMobileFrames,
  };
}
