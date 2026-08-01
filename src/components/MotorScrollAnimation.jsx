import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import logoImage from "@Assets/images/logo.png";
import { getCurrentScrollY } from "@/utils/scrollPosition";
import {
  clamp,
  getShowcaseViewportHeight,
  SHOWCASE_FOREGROUND_FRAME_SCROLL_VH,
} from "@/utils/showcaseTimeline";
import "./MotorScrollAnimation.css";

const DEFAULT_FRAME_COUNT = 300;
const FIRST_FRAME = 1;
const MOBILE_FRAME_QUERY = "(max-width: 767px)";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}

function useResponsiveFramePreference(mediaQuery = MOBILE_FRAME_QUERY) {
  const [useMobileFrames, setUseMobileFrames] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    const frameMediaQuery = window.matchMedia(mediaQuery);
    const updateFramePreference = () => setUseMobileFrames(frameMediaQuery.matches);

    updateFramePreference();
    frameMediaQuery.addEventListener("change", updateFramePreference);

    return () => {
      frameMediaQuery.removeEventListener("change", updateFramePreference);
    };
  }, [mediaQuery]);

  return useMobileFrames;
}

function getFrameUrl(basePath, frameNumber) {
  return `${basePath}/frame_${String(frameNumber).padStart(4, "0")}.webp`;
}

function isImageReady(image) {
  return Boolean(image?.complete && image.naturalWidth && image.naturalHeight);
}

function findNearestLoadedFrame(images, targetIndex) {
  for (let offset = 1; offset < images.length; offset += 1) {
    const previousIndex = targetIndex - offset;
    const nextIndex = targetIndex + offset;

    if (previousIndex >= 0 && isImageReady(images[previousIndex])) {
      return previousIndex;
    }

    if (nextIndex < images.length && isImageReady(images[nextIndex])) {
      return nextIndex;
    }
  }

  return isImageReady(images[targetIndex]) ? targetIndex : -1;
}

function drawImageToCanvas(canvas, image, objectFit = "contain") {
  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");

  if (!context || !image?.naturalWidth || !image?.naturalHeight) {
    return;
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth = canvasWidth;
  let drawHeight = canvasHeight;

  if (objectFit === "cover") {
    if (imageRatio > canvasRatio) {
      drawWidth = canvasHeight * imageRatio;
    } else {
      drawHeight = canvasWidth / imageRatio;
    }
  } else if (imageRatio > canvasRatio) {
    drawHeight = canvasWidth / imageRatio;
  } else {
    drawWidth = canvasHeight * imageRatio;
  }

  const x = (canvasWidth - drawWidth) / 2;
  const y = (canvasHeight - drawHeight) / 2;

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.fillStyle = "#f7f9fb";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(image, x, y, drawWidth, drawHeight);
}

function MotorScrollAnimation({
  children,
  frameCount = DEFAULT_FRAME_COUNT,
  framePath,
  desktopFramePath = "/motor-frames/desktop",
  mobileFramePath = "/motor-frames/mobile",
  mobileFrameQuery = MOBILE_FRAME_QUERY,
  animationDurationVh = 500,
  foregroundFrameScrollVh = SHOWCASE_FOREGROUND_FRAME_SCROLL_VH,
  freezeAnimation = false,
  freezeFrameProgress = 0.14,
  objectFit,
  showIntroOverlay,
  /**
   * Optional external progress feed. When provided the component stops deriving
   * its own scroll progress and renders exactly the frame the owner asks for,
   * which is what keeps the motor locked to the foreground content.
   */
  progressSource,
  /** Explicit pixel height for the scroll track (keeps JS and CSS on one ruler). */
  sectionHeight,
  /**
   * Ref holding images already fetched by the preloader. When supplied this
   * component does no fetching of its own - the loading gate has already pulled
   * every frame, and re-fetching here would double the network cost.
   */
  preloadedImages,
}) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  const ownFrameImagesRef = useRef([]);
  const frameImagesRef = preloadedImages ?? ownFrameImagesRef;
  const currentFrameRef = useRef(0);
  const progressRef = useRef(0);
  const renderFrameRef = useRef(null);
  const resizeFrameRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const [isPosterReady, setIsPosterReady] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const useMobileFrames = useResponsiveFramePreference(mobileFrameQuery);
  const hasForegroundContent = Boolean(children);
  const canvasObjectFit = objectFit ?? (hasForegroundContent ? "cover" : "contain");
  const shouldShowIntroOverlay = showIntroOverlay ?? !hasForegroundContent;
  const activeFramePath = framePath ?? (useMobileFrames ? mobileFramePath : desktopFramePath);

  const frameUrls = useMemo(
    () =>
      Array.from({ length: frameCount }, (_, index) =>
        getFrameUrl(activeFramePath, index + FIRST_FRAME)
      ),
    [activeFramePath, frameCount]
  );

  useEffect(() => {
    // Frames already fetched by the loading gate - nothing to do here.
    if (preloadedImages) {
      setIsPosterReady(true);
      return undefined;
    }

    let isMounted = true;
    let preloadIndex = 1;
    let preloadTimer = 0;
    const images = frameUrls.map(() => {
      const image = new Image();
      image.decoding = "async";
      return image;
    });

    frameImagesRef.current = images;
    currentFrameRef.current = 0;
    setIsPosterReady(false);

    const loadFrameAtIndex = (index) => {
      const image = images[index];
      const src = frameUrls[index];

      if (!image || !src || image.src) {
        return image;
      }

      if (index === 0) {
        image.onload = () => {
          if (!isMounted) {
            return;
          }

          setIsPosterReady(true);
          drawImageToCanvas(canvasRef.current, image, canvasObjectFit);
        };
      }

      image.src = src;

      if (index === 0 && isImageReady(image)) {
        setIsPosterReady(true);
        drawImageToCanvas(canvasRef.current, image, canvasObjectFit);
      }

      return image;
    };

    loadFrameAtIndex(0);

    const preloadNextBatch = () => {
      if (!isMounted || prefersReducedMotion) {
        return;
      }

      const batchSize = useMobileFrames ? 5 : 14;
      const batchDelay = useMobileFrames ? 80 : 18;

      for (
        let loadedInBatch = 0;
        preloadIndex < frameUrls.length && loadedInBatch < batchSize;
        loadedInBatch += 1, preloadIndex += 1
      ) {
        loadFrameAtIndex(preloadIndex);
      }

      if (preloadIndex < frameUrls.length) {
        preloadTimer = window.setTimeout(preloadNextBatch, batchDelay);
      }
    };

    if (!prefersReducedMotion) {
      preloadTimer = window.setTimeout(preloadNextBatch, useMobileFrames ? 80 : 18);
    }

    return () => {
      isMounted = false;
      window.clearTimeout(preloadTimer);
      frameImagesRef.current = [];
    };
  }, [
    canvasObjectFit,
    frameImagesRef,
    frameUrls,
    preloadedImages,
    prefersReducedMotion,
    useMobileFrames,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const renderFrame = (frameIndex) => {
      const image = frameImagesRef.current[frameIndex];

      if (!image) {
        return;
      }

      if (!image.src && frameUrls[frameIndex]) {
        image.src = frameUrls[frameIndex];
      }

      if (!isImageReady(image)) {
        const loadedFallbackIndex = findNearestLoadedFrame(frameImagesRef.current, frameIndex);

        if (loadedFallbackIndex !== -1) {
          drawImageToCanvas(canvas, frameImagesRef.current[loadedFallbackIndex], canvasObjectFit);
        }

        image.addEventListener(
          "load",
          () => {
            if (currentFrameRef.current === frameIndex) {
              drawImageToCanvas(canvas, image, canvasObjectFit);
            }
          },
          { once: true }
        );
        return;
      }

      drawImageToCanvas(canvas, image, canvasObjectFit);
    };

    renderFrameRef.current = renderFrame;

    return () => {
      renderFrameRef.current = null;
    };
  }, [canvasObjectFit, frameImagesRef, frameUrls]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stickyElement = stickyRef.current;

    if (!canvas || !stickyElement) {
      return undefined;
    }

    const resizeCanvas = () => {
      const bounds = stickyElement.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2.5);
      const nextWidth = Math.max(1, Math.round(bounds.width * pixelRatio));
      const nextHeight = Math.max(1, Math.round(bounds.height * pixelRatio));

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }

      renderFrameRef.current?.(currentFrameRef.current);
    };

    const queueResize = () => {
      window.cancelAnimationFrame(resizeFrameRef.current);
      resizeFrameRef.current = window.requestAnimationFrame(resizeCanvas);
    };

    resizeCanvas();
    window.addEventListener("resize", queueResize, { passive: true });

    return () => {
      window.removeEventListener("resize", queueResize);
      window.cancelAnimationFrame(resizeFrameRef.current);
    };
  }, []);

  /**
   * The single place a progress value turns into a rendered frame. Writing the
   * overlay opacity and the debug attribute imperatively (instead of via state)
   * keeps this on the same tick as the scroll event - a React re-render per
   * frame is exactly what made the background lag behind the content.
   */
  const applyProgress = useCallback(
    (rawProgress) => {
      const nextProgress = freezeAnimation
        ? clamp(freezeFrameProgress, 0, 1)
        : clamp(rawProgress, 0, 1);

      progressRef.current = nextProgress;

      const section = sectionRef.current;

      if (section) {
        section.style.setProperty(
          "--motor-overlay-opacity",
          String(clamp(1 - nextProgress / 0.2, 0, 1)),
        );
      }

      const nextFrame = Math.round(nextProgress * (frameCount - 1));

      if (nextFrame === currentFrameRef.current) {
        return;
      }

      currentFrameRef.current = nextFrame;
      section?.setAttribute("data-active-frame", String(nextFrame + FIRST_FRAME));
      renderFrameRef.current?.(nextFrame);
    },
    [frameCount, freezeAnimation, freezeFrameProgress],
  );

  // Externally driven: the owner of the timeline pushes progress to us.
  useEffect(() => {
    if (!progressSource) {
      return undefined;
    }

    return progressSource(applyProgress);
  }, [applyProgress, progressSource]);

  // Self driven fallback, for standalone use without a shared timeline.
  useEffect(() => {
    if (progressSource || prefersReducedMotion) {
      return undefined;
    }

    const updateFrameFromScroll = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const viewportHeight = getShowcaseViewportHeight();
      const scrollableDistance = hasForegroundContent
        ? viewportHeight * Math.max(foregroundFrameScrollVh, 1)
        : viewportHeight * Math.max(animationDurationVh / 100 - 1, 1);

      applyProgress(
        scrollableDistance > 0
          ? (getCurrentScrollY() - (section.offsetTop || 0)) / scrollableDistance
          : 0,
      );
    };

    const queueScrollUpdate = () => {
      if (scrollFrameRef.current) {
        return;
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        updateFrameFromScroll();
      });
    };

    updateFrameFromScroll();
    window.addEventListener("scroll", queueScrollUpdate, { passive: true });
    window.addEventListener("lenis-scroll", queueScrollUpdate, { passive: true });
    window.addEventListener("resize", queueScrollUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", queueScrollUpdate);
      window.removeEventListener("lenis-scroll", queueScrollUpdate);
      window.removeEventListener("resize", queueScrollUpdate);
      window.cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [
    animationDurationVh,
    applyProgress,
    foregroundFrameScrollVh,
    hasForegroundContent,
    prefersReducedMotion,
    progressSource,
  ]);

  // Re-render the current frame whenever the frame set or renderer changes so a
  // freshly mounted canvas never shows frame 1 while the page is scrolled down.
  useEffect(() => {
    applyProgress(progressRef.current);
  }, [applyProgress, canvasObjectFit, frameUrls]);

  const trackStyle = useMemo(() => {
    const style = { "--motor-overlay-opacity": 1 };

    if (sectionHeight > 0) {
      style.height = `${Math.round(sectionHeight)}px`;
      style.minHeight = `${Math.round(sectionHeight)}px`;
    }

    return style;
  }, [sectionHeight]);

  return (
    <section
      ref={sectionRef}
      className={`motor-scroll-animation ${
        hasForegroundContent ? "motor-scroll-animation--with-foreground" : ""
      } ${
        useMobileFrames ? "motor-scroll-animation--mobile-frames" : "motor-scroll-animation--desktop-frames"
      }`}
      data-frame-path={activeFramePath}
      style={trackStyle}
    >
      <div ref={stickyRef} className="motor-scroll-animation__sticky">
        <canvas
          ref={canvasRef}
          className="motor-scroll-animation__canvas"
          aria-label="360-degree motor assembly scroll animation"
        />

        {!isPosterReady && (
          <div className="motor-scroll-animation__loading" aria-hidden="true" />
        )}

        {hasForegroundContent && (
          <div className="motor-scroll-animation__content-veil" aria-hidden="true" />
        )}

      </div>

      {shouldShowIntroOverlay && (
        <div className="motor-scroll-animation__overlay">
          <div className="motor-scroll-animation__logo-mark">
            <img
              src={logoImage}
              alt="The General Electric Stores"
              className="motor-scroll-animation__logo"
            />
          </div>
          <h2>The General Electric Stores</h2>
          <p>India's Largest Dealer in Rotating Machine & Drives</p>
        </div>
      )}

      {hasForegroundContent && (
        <div className="motor-scroll-animation__foreground">{children}</div>
      )}
    </section>
  );
}

export default MotorScrollAnimation;
