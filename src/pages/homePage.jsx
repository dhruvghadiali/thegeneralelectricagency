import ShowcaseScrollNavigation from "@/components/ShowcaseScrollNavigation";
import LoadingScreen from "@/components/ui/loading-screen";
import { showcaseSections } from "@/utils/showcaseSections";
import HomeScreenComponent from "@ScreenComponents/home";
import ServicesIntroComponent from "@ScreenComponents/services";
import ClientsIntroComponent from "@ScreenComponents/clients";
import PartnersScreenComponent from "@ScreenComponents/partners";
import ContactUsScreenComponent from "@ScreenComponents/contactUs";
import { SHOWCASE_FOREGROUND_FRAME_SCROLL_VH } from "@/utils/showcaseTimeline";
import useShowcaseScrollState from "@/utils/useShowcaseScrollState";
import useScrollLock from "@/utils/useScrollLock";
import useFramePreloader, { PRELOAD_STATUS } from "@/utils/useFramePreloader";
import {
  useMotorFrames,
  usePrefersReducedMotion,
} from "@/utils/useMotorFrames";
import { lazy, memo, Suspense, useEffect, useRef, useState } from "react";

const MotorScrollAnimation = lazy(
  () => import("@/components/MotorScrollAnimation"),
);

/**
 * Memoised because none of them take props.
 *
 * Without this, every section change re-rendered all five mounted sections.
 * On a phone that commit does not fit in a frame, so the navigation and content
 * fall behind the canvas - which updates imperatively and stays pinned to the
 * scroll. Memoising reduces a section change to five className swaps.
 */
const showcaseComponents = {
  home: memo(HomeScreenComponent),
  services: memo(ServicesIntroComponent),
  clients: memo(ClientsIntroComponent),
  partners: memo(PartnersScreenComponent),
  "contact-us": memo(ContactUsScreenComponent),
};

export default function HomePage() {
  const showcaseRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { frameUrls, framePath, frameCount, useMobileFrames } = useMotorFrames();

  /** Set when the visitor chooses to continue after a failed preload. */
  const [hasDismissedError, setHasDismissedError] = useState(false);

  /**
   * Visitors who asked for reduced motion never see the scroll animation, so
   * making them wait for 12MB of frames would be pure cost with no payoff.
   */
  const shouldPreload = !prefersReducedMotion;

  const {
    status: preloadStatus,
    progress: preloadProgress,
    loaded,
    failed,
    total,
    images: preloadedImages,
    retry,
  } = useFramePreloader(frameUrls, { enabled: shouldPreload });

  const hasPreloadError =
    preloadStatus === PRELOAD_STATUS.ERROR && !hasDismissedError;
  const isGateOpen =
    !shouldPreload ||
    hasDismissedError ||
    preloadStatus === PRELOAD_STATUS.READY;

  /**
   * Freeze scrolling behind the gate, otherwise the visitor can scroll the
   * showcase timeline while it is still hidden and arrive mid-animation when
   * the loader clears.
   */
  useScrollLock(!isGateOpen);

  // Start the showcase from the top once the gate lifts.
  useEffect(() => {
    if (!isGateOpen) {
      window.scrollTo(0, 0);
      return;
    }

    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [isGateOpen]);

  /**
   * Sections are mounted one step ahead of the scroll and never unmounted.
   *
   * Mounting on arrival used to replay every entry animation right as the user
   * got there, so the content was always a few hundred milliseconds behind the
   * motor. Warming the neighbours means a section is fully settled before it is
   * ever revealed, and switching becomes an instant cross-fade.
   */
  const [mountedIndexes, setMountedIndexes] = useState(() => new Set([0, 1]));

  const {
    activeIndex,
    isRevealed,
    totalHeight,
    subscribeToProgress,
    scrollToSection,
  } = useShowcaseScrollState(showcaseRef);

  useEffect(() => {
    setMountedIndexes((previous) => {
      const required = [activeIndex - 1, activeIndex, activeIndex + 1].filter(
        (index) => index >= 0 && index < showcaseSections.length,
      );

      if (required.every((index) => previous.has(index))) {
        return previous;
      }

      const next = new Set(previous);
      required.forEach((index) => next.add(index));

      return next;
    });
  }, [activeIndex]);

  const handleRetry = () => {
    setHasDismissedError(false);
    retry();
  };

  return (
    <>
      {!isGateOpen && (
        <LoadingScreen
          progress={preloadProgress}
          loaded={loaded}
          failed={failed}
          total={total}
          hasError={hasPreloadError}
          onRetry={handleRetry}
          onContinue={() => setHasDismissedError(true)}
        />
      )}

      <div
        className="home-page-with-motor-background"
        ref={showcaseRef}
        aria-hidden={isGateOpen ? undefined : "true"}
        inert={isGateOpen ? undefined : true}
      >
        <ShowcaseScrollNavigation
          activeIndex={activeIndex}
          isRevealed={isRevealed}
          onSelectSection={scrollToSection}
        />
        <Suspense
          fallback={<div className="h-screen bg-white" aria-hidden="true" />}
        >
          <MotorScrollAnimation
            frameCount={frameCount}
            frameUrls={frameUrls}
            framePath={framePath}
            isMobileViewport={useMobileFrames}
            preloadedImages={shouldPreload ? preloadedImages : undefined}
            animationDurationVh={650}
            foregroundFrameScrollVh={SHOWCASE_FOREGROUND_FRAME_SCROLL_VH}
            progressSource={subscribeToProgress}
            sectionHeight={totalHeight}
          >
            <div className="showcase-stage">
              {showcaseSections.map((section, index) => {
                const Component = showcaseComponents[section.id];
                const isActive = isRevealed && index === activeIndex;

                if (!Component || !mountedIndexes.has(index)) {
                  return null;
                }

                return (
                  <div
                    key={section.id}
                    className={`showcase-stage__panel ${
                      isActive ? "showcase-stage__panel--active" : ""
                    }`}
                    aria-hidden={isActive ? undefined : "true"}
                    inert={isActive ? undefined : true}
                  >
                    <Component />
                  </div>
                );
              })}
            </div>
          </MotorScrollAnimation>
        </Suspense>
      </div>
    </>
  );
}
