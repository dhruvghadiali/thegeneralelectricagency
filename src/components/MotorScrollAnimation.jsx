import { useEffect, useMemo, useRef, useState } from "react";
import logoImage from "@Assets/images/logo.png";
import "./MotorScrollAnimation.css";

const DEFAULT_FRAME_COUNT = 300;
const FIRST_FRAME = 1;
const MOBILE_FRAME_QUERY = "(max-width: 767px)";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

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
  foregroundFrameScrollVh = 5.25,
  freezeAnimation = false,
  freezeFrameProgress = 0.14,
  objectFit,
  showIntroOverlay,
}) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  const frameImagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const renderFrameRef = useRef(null);
  const resizeFrameRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const [progress, setProgress] = useState(0);
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
    let isMounted = true;
    const urlsToPreload = prefersReducedMotion ? frameUrls.slice(0, 1) : frameUrls;

    frameImagesRef.current = [];
    currentFrameRef.current = 0;
    setIsPosterReady(false);

    urlsToPreload.forEach((src, index) => {
      const image = new Image();
      image.decoding = "async";
      frameImagesRef.current[index] = image;

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

      if (index === 0 && image.complete && image.naturalWidth) {
        setIsPosterReady(true);
        drawImageToCanvas(canvasRef.current, image, canvasObjectFit);
      }
    });

    return () => {
      isMounted = false;
      frameImagesRef.current = [];
    };
  }, [canvasObjectFit, frameUrls, prefersReducedMotion]);

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

      if (!image.complete) {
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
  }, [canvasObjectFit]);

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

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const updateFrameFromScroll = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const naturalScrollableDistance = section.offsetHeight - window.innerHeight;
      const animationScrollableDistance = hasForegroundContent
        ? window.innerHeight * Math.max(foregroundFrameScrollVh, 1)
        : window.innerHeight * Math.max(animationDurationVh / 100 - 1, 1);
      const scrollableDistance = Math.min(naturalScrollableDistance, animationScrollableDistance);
      const scrollProgress =
        scrollableDistance > 0
          ? clamp((window.scrollY - sectionTop) / scrollableDistance, 0, 1)
          : 0;
      const nextProgress = freezeAnimation
        ? clamp(freezeFrameProgress, 0, 1)
        : scrollProgress;
      const nextFrame = Math.round(nextProgress * (frameCount - 1));

      if (nextFrame !== currentFrameRef.current) {
        currentFrameRef.current = nextFrame;
        renderFrameRef.current?.(nextFrame);
      }

      setProgress(nextProgress);
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
    window.addEventListener("resize", queueScrollUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", queueScrollUpdate);
      window.removeEventListener("resize", queueScrollUpdate);
      window.cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [
    activeFramePath,
    animationDurationVh,
    foregroundFrameScrollVh,
    frameCount,
    freezeAnimation,
    freezeFrameProgress,
    hasForegroundContent,
    prefersReducedMotion,
  ]);

  return (
    <section
      ref={sectionRef}
      className={`motor-scroll-animation ${
        hasForegroundContent ? "motor-scroll-animation--with-foreground" : ""
      } ${
        useMobileFrames ? "motor-scroll-animation--mobile-frames" : "motor-scroll-animation--desktop-frames"
      }`}
      data-active-frame={currentFrameRef.current + FIRST_FRAME}
      data-frame-path={activeFramePath}
      style={{ "--motor-overlay-opacity": clamp(1 - progress / 0.2, 0, 1) }}
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
