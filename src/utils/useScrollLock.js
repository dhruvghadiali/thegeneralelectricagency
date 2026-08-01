import { useEffect } from "react";

/**
 * Reference-counted page scroll lock.
 *
 * Counted rather than boolean because more than one thing can want the page
 * held still at the same time (the loading gate and a sheet, or one sheet
 * opening as another closes). A naive lock would let the first release undo the
 * lock the second one still needs.
 */
let lockCount = 0;
let restoreStyles = null;

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

function applyLock() {
  const root = document.documentElement;
  const scrollbarWidth = getScrollbarWidth();

  restoreStyles = {
    overflow: root.style.overflow,
    paddingRight: root.style.paddingRight,
  };

  root.style.overflow = "hidden";

  // Removing the scrollbar widens the viewport; pad it back so the layout
  // behind the sheet does not shift sideways as it opens.
  if (scrollbarWidth > 0) {
    const currentPadding =
      Number.parseFloat(window.getComputedStyle(root).paddingRight) || 0;
    root.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
  }

  // Lenis keeps its own scroll loop running, so hiding overflow is not enough
  // on its own - it has to be told to stop as well.
  window.__lenis?.stop();
}

function releaseLock() {
  const root = document.documentElement;

  root.style.overflow = restoreStyles?.overflow ?? "";
  root.style.paddingRight = restoreStyles?.paddingRight ?? "";
  restoreStyles = null;

  window.__lenis?.start();
}

/** Acquires a lock. Returns the resulting lock count. */
export function lockPageScroll() {
  lockCount += 1;

  if (lockCount === 1) {
    applyLock();
  }

  return lockCount;
}

/** Releases one lock. Returns the remaining lock count. */
export function unlockPageScroll() {
  if (lockCount === 0) {
    return 0;
  }

  lockCount -= 1;

  if (lockCount === 0) {
    releaseLock();
  }

  return lockCount;
}

export function getScrollLockCount() {
  return lockCount;
}

/** Locks page scrolling for as long as `isLocked` is true. */
export default function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked || typeof document === "undefined") {
      return undefined;
    }

    lockPageScroll();

    return unlockPageScroll;
  }, [isLocked]);
}
