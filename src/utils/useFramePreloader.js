import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Number of frames fetched in parallel.
 *
 * Kept above the HTTP/1.1 six-connection cap so progress stays smooth on HTTP/2
 * without flooding the connection pool on older servers.
 */
const CONCURRENCY = 12;

/** Each frame gets one silent retry before it counts as failed. */
const PER_IMAGE_RETRIES = 1;

/**
 * How many frames may permanently fail before the error screen is shown.
 *
 * The renderer falls back to the nearest loaded frame, so a couple of missing
 * frames out of 300 are invisible and not worth blocking a visitor over. A real
 * network failure loses far more than this. Set to 0 to be strict.
 */
export const MAX_TOLERATED_FAILURES = 3;

export const PRELOAD_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  READY: "ready",
  ERROR: "error",
};

function createImage() {
  const image = new Image();
  image.decoding = "async";
  return image;
}

function isImageReady(image) {
  return Boolean(image?.complete && image.naturalWidth && image.naturalHeight);
}

/**
 * Fetches a set of image URLs through a fixed-size worker pool.
 *
 * Kept as a plain function (no React) so the retry, tolerance and cancellation
 * behaviour can be tested directly.
 *
 * @returns {Promise<{loaded:number, failed:number, failedIndexes:Set<number>}>}
 */
export async function loadFrameSet({
  urls,
  images,
  onProgress,
  isCancelled = () => false,
  concurrency = CONCURRENCY,
  retries = PER_IMAGE_RETRIES,
}) {
  const total = urls.length;
  const failedIndexes = new Set();

  // Counted purely by the loop below. Every index passes through it, including
  // images that are already decoded (they resolve immediately), so seeding this
  // from the ready count would double-count them on a retry.
  let loaded = 0;
  let failed = 0;

  const loadFrame = (index) =>
    new Promise((resolve) => {
      const image = images[index];
      const url = urls[index];

      if (!image || !url) {
        resolve(false);
        return;
      }

      if (isImageReady(image)) {
        resolve(true);
        return;
      }

      let remainingRetries = retries;

      const cleanup = () => {
        image.onload = null;
        image.onerror = null;
      };

      const handleLoad = () => {
        cleanup();
        resolve(true);
      };

      const handleError = () => {
        if (remainingRetries > 0) {
          remainingRetries -= 1;
          // Re-assigning the same src re-issues the request.
          image.src = "";
          image.src = url;
          return;
        }

        cleanup();
        resolve(false);
      };

      image.onload = handleLoad;
      image.onerror = handleError;
      image.src = url;

      // A cached image can already be complete before the handlers attach.
      if (isImageReady(image)) {
        handleLoad();
      }
    });

  let cursor = 0;

  const runWorker = async () => {
    while (!isCancelled() && cursor < total) {
      const index = cursor;
      cursor += 1;

      // Sequential by design: this is one worker in a fixed-size pool.
      const succeeded = await loadFrame(index);

      if (isCancelled()) {
        return;
      }

      if (succeeded) {
        loaded += 1;
      } else {
        failed += 1;
        failedIndexes.add(index);
      }

      onProgress?.({ loaded, failed, total });
    }
  };

  await Promise.all(
    Array.from({ length: Math.max(1, Math.min(concurrency, total)) }, runWorker),
  );

  return { loaded, failed, failedIndexes };
}

/**
 * Preloads every animation frame up front and reports progress.
 *
 * The images it creates are handed to the canvas renderer, so nothing is
 * downloaded twice: this hook is the only thing that ever fetches a frame.
 */
export default function useFramePreloader(frameUrls, { enabled = true } = {}) {
  const [state, setState] = useState(() => ({
    status: enabled ? PRELOAD_STATUS.LOADING : PRELOAD_STATUS.READY,
    loaded: 0,
    failed: 0,
    total: frameUrls.length,
  }));

  const imagesRef = useRef([]);
  const failedIndexesRef = useRef(new Set());
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setState({
        status: PRELOAD_STATUS.READY,
        loaded: 0,
        failed: 0,
        total: frameUrls.length,
      });
      return undefined;
    }

    let isActive = true;
    const total = frameUrls.length;

    // Reuse anything already decoded so a retry only refetches what failed.
    const images = frameUrls.map(
      (_, index) => imagesRef.current[index] ?? createImage(),
    );
    imagesRef.current = images;
    failedIndexesRef.current = new Set();

    // Starts at zero and is corrected by the first onProgress tick; cached
    // frames resolve immediately so this is never visible as a stall.
    setState({
      status: PRELOAD_STATUS.LOADING,
      loaded: 0,
      failed: 0,
      total,
    });

    loadFrameSet({
      urls: frameUrls,
      images,
      isCancelled: () => !isActive,
      onProgress: ({ loaded, failed }) => {
        if (isActive) {
          setState({ status: PRELOAD_STATUS.LOADING, loaded, failed, total });
        }
      },
    }).then(({ loaded, failed, failedIndexes }) => {
      if (!isActive) {
        return;
      }

      failedIndexesRef.current = failedIndexes;
      setState({
        status:
          failed > MAX_TOLERATED_FAILURES
            ? PRELOAD_STATUS.ERROR
            : PRELOAD_STATUS.READY,
        loaded,
        failed,
        total,
      });
    });

    return () => {
      isActive = false;
    };
  }, [attempt, enabled, frameUrls]);

  const retry = useCallback(() => {
    // Drop only the failed images so the retry refetches nothing else.
    failedIndexesRef.current.forEach((index) => {
      imagesRef.current[index] = createImage();
    });
    failedIndexesRef.current = new Set();
    setAttempt((previous) => previous + 1);
  }, []);

  const settled = state.loaded + state.failed;

  return {
    status: state.status,
    loaded: state.loaded,
    failed: state.failed,
    total: state.total,
    progress: state.total > 0 ? settled / state.total : 1,
    images: imagesRef,
    retry,
  };
}
