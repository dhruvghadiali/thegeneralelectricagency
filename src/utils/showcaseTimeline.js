/**
 * Single source of truth for the home showcase scroll timeline.
 *
 * Both the motor frame animation and the section navigation derive their state
 * from the helpers in this file, so the background animation and the foreground
 * content can never drift apart.
 *
 * Timeline layout (in viewport heights, measured from the top of the showcase
 * section):
 *
 *   0                      -> 0.62   intro overlay, motor starts assembling
 *   0.62 + n * 1.15        -> ...    section n is active (n = 0..4)
 *   6.37                            last frame of the motor animation
 *   7.37                            end of the sticky section
 */

import { showcaseSections } from "@/utils/showcaseSections";

export const SHOWCASE_REVEAL_START_VH = 0.62;
export const SHOWCASE_SECTION_STEP_VH = 1.15;
export const SHOWCASE_SECTION_COUNT = showcaseSections.length;

/**
 * The motor animation spans exactly the same scroll range as the sections, so
 * frame 1 lines up with the intro and the final frame lines up with the end of
 * the last section. Derived - never hard-code it again.
 */
export const SHOWCASE_FOREGROUND_FRAME_SCROLL_VH =
  SHOWCASE_REVEAL_START_VH + SHOWCASE_SECTION_STEP_VH * SHOWCASE_SECTION_COUNT;

/** One extra viewport so the sticky stage can settle before the page ends. */
export const SHOWCASE_TOTAL_HEIGHT_VH = SHOWCASE_FOREGROUND_FRAME_SCROLL_VH + 1;

/**
 * Dead zone (as a fraction of a section) applied around every section boundary
 * so sub-pixel scroll jitter cannot flip the active section back and forth.
 */
const SECTION_BOUNDARY_GUARD = 0.06;

/**
 * Ignore viewport height changes smaller than this. Mobile browsers grow and
 * shrink the viewport as the URL bar hides, and remeasuring on every one of
 * those events would shift the whole timeline underneath the user mid-scroll.
 */
const VIEWPORT_HEIGHT_NOISE_PX = 140;

let cachedViewportWidth = 0;
let cachedViewportHeight = 0;

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Layout viewport height.
 *
 * This intentionally uses `innerHeight` rather than `visualViewport.height`:
 * CSS length units (vh/dvh) resolve against the layout viewport, and the
 * showcase geometry has to agree with the CSS or the animation and the
 * navigation end up on two different rulers.
 */
export function getShowcaseViewportHeight() {
  if (typeof window === "undefined") {
    return 0;
  }

  const width = window.innerWidth || 0;
  const height = window.innerHeight || 0;

  const shouldRemeasure =
    !cachedViewportHeight ||
    width !== cachedViewportWidth ||
    Math.abs(height - cachedViewportHeight) > VIEWPORT_HEIGHT_NOISE_PX;

  if (shouldRemeasure) {
    cachedViewportWidth = width;
    cachedViewportHeight = height;
  }

  return cachedViewportHeight;
}

/** Force a remeasure on the next read (orientation change, resize, ...). */
export function invalidateShowcaseViewport() {
  cachedViewportWidth = 0;
  cachedViewportHeight = 0;
}

export function getShowcaseScrollMetrics(originTop = 0) {
  const viewportHeight = getShowcaseViewportHeight();

  return {
    viewportHeight,
    originTop,
    revealStart: viewportHeight * SHOWCASE_REVEAL_START_VH,
    sectionLength: viewportHeight * SHOWCASE_SECTION_STEP_VH,
    frameScrollDistance: viewportHeight * SHOWCASE_FOREGROUND_FRAME_SCROLL_VH,
    totalHeight: viewportHeight * SHOWCASE_TOTAL_HEIGHT_VH,
  };
}

/** Absolute scroll position that centres a given section in its own range. */
export function getSectionScrollTop(index, originTop = 0) {
  const { revealStart, sectionLength } = getShowcaseScrollMetrics(originTop);
  const safeIndex = clamp(index, 0, SHOWCASE_SECTION_COUNT - 1);

  return originTop + revealStart + (safeIndex + 0.5) * sectionLength;
}

/**
 * Map a continuous section position to a discrete index, with hysteresis so the
 * active section only changes once the boundary has been crossed decisively.
 */
export function resolveActiveIndex(sectionPosition, previousIndex = 0) {
  const maxIndex = SHOWCASE_SECTION_COUNT - 1;
  const previous = clamp(
    Number.isFinite(previousIndex) ? Math.round(previousIndex) : 0,
    0,
    maxIndex,
  );
  const candidate = Math.floor(sectionPosition);

  if (candidate === previous) {
    return previous;
  }

  if (candidate > previous && sectionPosition >= candidate + SECTION_BOUNDARY_GUARD) {
    return clamp(candidate, 0, maxIndex);
  }

  if (
    candidate < previous &&
    sectionPosition <= candidate + 1 - SECTION_BOUNDARY_GUARD
  ) {
    return clamp(candidate, 0, maxIndex);
  }

  return previous;
}

/**
 * Derive the complete showcase state for a scroll position.
 *
 * `progress` (motor frame) and `activeIndex` (foreground content + navigation)
 * are computed here together from the same numbers, in the same tick.
 */
export function resolveShowcaseState(scrollY, originTop = 0, previousIndex = 0) {
  const metrics = getShowcaseScrollMetrics(originTop);
  const offset = scrollY - originTop;

  const progress =
    metrics.frameScrollDistance > 0
      ? clamp(offset / metrics.frameScrollDistance, 0, 1)
      : 0;

  const sectionPosition =
    metrics.sectionLength > 0
      ? (offset - metrics.revealStart) / metrics.sectionLength
      : 0;

  const activeIndex = resolveActiveIndex(sectionPosition, previousIndex);
  const isRevealed = offset >= metrics.revealStart;

  return {
    progress,
    sectionPosition,
    activeIndex,
    isRevealed,
    viewportHeight: metrics.viewportHeight,
    totalHeight: metrics.totalHeight,
  };
}
