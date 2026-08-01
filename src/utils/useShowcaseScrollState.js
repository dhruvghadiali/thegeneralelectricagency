import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getCurrentScrollY, scrollToY } from "@/utils/scrollPosition";
import {
  getSectionScrollTop,
  invalidateShowcaseViewport,
  resolveShowcaseState,
} from "@/utils/showcaseTimeline";

const PROGRESS_EPSILON = 0.0002;

/**
 * Owns the one and only scroll subscription for the home showcase.
 *
 * `activeIndex` / `isRevealed` are React state because they change a handful of
 * times per scroll and drive rendering. `progress` is deliberately *not* React
 * state - it changes every frame, so it is pushed straight to subscribers
 * (the canvas renderer) to keep the motor pinned to the scroll position without
 * re-rendering the whole page 60 times a second.
 */
export default function useShowcaseScrollState(sectionRef) {
  const [state, setState] = useState(() => ({
    activeIndex: 0,
    isRevealed: false,
    viewportHeight: 0,
    totalHeight: 0,
  }));

  const stateRef = useRef(state);
  const progressRef = useRef(0);
  const subscribersRef = useRef(new Set());
  const frameRef = useRef(0);

  const publishProgress = useCallback((progress) => {
    progressRef.current = progress;
    subscribersRef.current.forEach((subscriber) => subscriber(progress));
  }, []);

  const sync = useCallback(() => {
    const originTop = sectionRef?.current?.offsetTop ?? 0;
    const previous = stateRef.current;
    const next = resolveShowcaseState(
      getCurrentScrollY(),
      originTop,
      previous.activeIndex,
    );

    if (Math.abs(next.progress - progressRef.current) > PROGRESS_EPSILON) {
      publishProgress(next.progress);
    }

    const hasDiscreteChange =
      next.activeIndex !== previous.activeIndex ||
      next.isRevealed !== previous.isRevealed ||
      next.viewportHeight !== previous.viewportHeight ||
      next.totalHeight !== previous.totalHeight;

    if (!hasDiscreteChange) {
      return;
    }

    const nextState = {
      activeIndex: next.activeIndex,
      isRevealed: next.isRevealed,
      viewportHeight: next.viewportHeight,
      totalHeight: next.totalHeight,
    };

    stateRef.current = nextState;
    setState(nextState);
  }, [publishProgress, sectionRef]);

  useEffect(() => {
    const queueSync = () => {
      if (frameRef.current) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        sync();
      });
    };

    const handleResize = () => {
      invalidateShowcaseViewport();
      queueSync();
    };

    sync();

    window.addEventListener("scroll", queueSync, { passive: true });
    window.addEventListener("lenis-scroll", queueSync, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", queueSync);
      window.removeEventListener("lenis-scroll", queueSync);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [sync]);

  /**
   * Subscribe to frame-accurate scroll progress. The subscriber is invoked
   * immediately with the current value so a late-mounting canvas (the motor is
   * lazy loaded) never renders a stale frame.
   */
  const subscribeToProgress = useCallback((subscriber) => {
    if (typeof subscriber !== "function") {
      return () => {};
    }

    subscribersRef.current.add(subscriber);
    subscriber(progressRef.current);

    return () => {
      subscribersRef.current.delete(subscriber);
    };
  }, []);

  const scrollToSection = useCallback(
    (index) => {
      const originTop = sectionRef?.current?.offsetTop ?? 0;
      scrollToY(getSectionScrollTop(index, originTop));
    },
    [sectionRef],
  );

  return useMemo(
    () => ({
      activeIndex: state.activeIndex,
      isRevealed: state.isRevealed,
      totalHeight: state.totalHeight,
      viewportHeight: state.viewportHeight,
      subscribeToProgress,
      scrollToSection,
    }),
    [
      scrollToSection,
      state.activeIndex,
      state.isRevealed,
      state.totalHeight,
      state.viewportHeight,
      subscribeToProgress,
    ],
  );
}
