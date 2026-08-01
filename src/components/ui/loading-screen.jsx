import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";

import logoImage from "@Assets/images/logo.png";
import "./loading-screen.css";

/**
 * Kicked off at module evaluation, not at first render, so the player chunk is
 * already in flight by the time the loader mounts.
 */
const loaderLottieModule = import("./loader-lottie");

// A failed chunk renders nothing rather than throwing into an absent error
// boundary; the timeout below still reveals the rest of the loader.
const LoaderLottie = lazy(() =>
  loaderLottieModule.catch(() => ({ default: () => null })),
);

/**
 * If the player chunk never arrives, show the rest of the loader anyway rather
 * than leaving the visitor staring at an empty background.
 */
const ANIMATION_WAIT_TIMEOUT_MS = 1500;

/**
 * Full screen gate shown while the motor animation frames download.
 *
 * Two states: progress while loading, and a recoverable error if frames could
 * not be fetched. The error state always offers a way forward so a flaky
 * connection never becomes a dead end.
 */
function LoadingScreen({
  progress = 0,
  loaded = 0,
  total = 0,
  failed = 0,
  hasError = false,
  onRetry,
  onContinue,
}) {
  const percentage = Math.min(100, Math.round(progress * 100));

  /**
   * The animation leads; everything else follows it in.
   *
   * Without this the text and progress bar paint first and the animation pops
   * in afterwards, which reads as a broken load rather than a designed one.
   * The error state has no animation, so it never waits.
   */
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const isContentRevealed = hasError || isAnimationReady;

  useEffect(() => {
    if (isContentRevealed) {
      return undefined;
    }

    const timeoutId = window.setTimeout(
      () => setIsAnimationReady(true),
      ANIMATION_WAIT_TIMEOUT_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, [isContentRevealed]);

  return (
    <div
      className={`showcase-loader ${hasError ? "showcase-loader--error" : ""} ${
        isContentRevealed ? "showcase-loader--revealed" : ""
      }`}
      role={hasError ? "alertdialog" : "status"}
      aria-live={hasError ? "assertive" : "polite"}
      aria-busy={hasError ? undefined : "true"}
      aria-label={
        hasError
          ? "Could not load the showcase"
          : `Loading showcase, ${percentage} percent`
      }
    >
      <div className="showcase-loader__panel">
        <div className="showcase-loader__brand">
          <span className="showcase-loader__logo-mark">
            <img src={logoImage} alt="" aria-hidden="true" />
          </span>
          <div>
            <strong>The General Electric Stores</strong>
            <span>India's Largest Dealer in Rotating Machine &amp; Drives</span>
          </div>
        </div>

        {hasError ? (
          <div className="showcase-loader__error">
            <span className="showcase-loader__error-icon" aria-hidden="true">
              <WifiOff size={26} strokeWidth={2.2} />
            </span>

            <h1>We couldn&apos;t load the showcase</h1>
            <p>
              {loaded > 0
                ? `Only ${loaded} of ${total} animation frames reached your browser.`
                : "None of the animation frames reached your browser."}{" "}
              This is usually a slow or interrupted connection.
            </p>

            <div className="showcase-loader__actions">
              <button
                type="button"
                className="showcase-loader__button showcase-loader__button--primary"
                onClick={onRetry}
              >
                <RefreshCw size={17} strokeWidth={2.4} />
                Try again
              </button>
              <button
                type="button"
                className="showcase-loader__button"
                onClick={onContinue}
              >
                Continue without the animation
              </button>
            </div>

            <p className="showcase-loader__note">
              <AlertTriangle size={14} strokeWidth={2.3} aria-hidden="true" />
              Continuing shows a still image instead of the scroll animation.
              Everything else works normally.
            </p>
          </div>
        ) : (
          <div className="showcase-loader__progress">
            <div className="showcase-loader__lottie" aria-hidden="true">
              <Suspense fallback={null}>
                <LoaderLottie onReady={() => setIsAnimationReady(true)} />
              </Suspense>
            </div>

            <div
              className="showcase-loader__percentage"
              aria-hidden="true"
            >
              <strong>{percentage}</strong>
              <span>%</span>
            </div>

            <div
              className="showcase-loader__bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percentage}
            >
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>

            <p className="showcase-loader__caption">
              Preparing the motor showcase
              <span>
                {loaded.toLocaleString()} of {total.toLocaleString()} frames
                {failed > 0 ? ` · ${failed} retrying` : ""}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;
