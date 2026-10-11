import _ from "lodash";

/**
 * Placeholder pushed into the page list where a run of pages is collapsed.
 * The pager renders it as a gap instead of a button.
 */
export const PAGINATION_ELLIPSIS = "ellipsis";

/**
 * Builds the page buttons to render: always the first and last page, a
 * window of `siblings` pages either side of the current one, and an ellipsis
 * wherever pages were skipped. Short ranges are returned in full.
 */
export function buildPageItems(currentPage, totalPages, siblings = 1) {
  const pageCount = _.toNumber(totalPages) || 0;
  const page = _.clamp(_.toNumber(currentPage) || 1, 1, Math.max(pageCount, 1));

  if (pageCount < 1) {
    return [];
  }

  // first + last + current + 2 siblings + 2 ellipsis slots
  const maxVisible = siblings * 2 + 5;

  if (pageCount <= maxVisible) {
    return _.range(1, pageCount + 1);
  }

  const windowStart = Math.max(page - siblings, 1);
  const windowEnd = Math.min(page + siblings, pageCount);
  const hasLeftGap = windowStart > 2;
  const hasRightGap = windowEnd < pageCount - 1;
  const edgeRunLength = siblings * 2 + 3;

  if (!hasLeftGap && hasRightGap) {
    return [..._.range(1, edgeRunLength + 1), PAGINATION_ELLIPSIS, pageCount];
  }

  if (hasLeftGap && !hasRightGap) {
    return [1, PAGINATION_ELLIPSIS, ..._.range(pageCount - edgeRunLength + 1, pageCount + 1)];
  }

  return [
    1,
    PAGINATION_ELLIPSIS,
    ..._.range(windowStart, windowEnd + 1),
    PAGINATION_ELLIPSIS,
    pageCount,
  ];
}

/**
 * The "Showing 21 to 40 of 42" range. `count` is how many rows actually came
 * back, so a short final page reads correctly.
 */
export function getRowRange({ page, limit, total, count }) {
  const rowCount = _.toNumber(count) || 0;

  if (rowCount < 1) {
    return { from: 0, to: 0, total: _.toNumber(total) || 0 };
  }

  const from = ((_.toNumber(page) || 1) - 1) * (_.toNumber(limit) || rowCount) + 1;

  return { from, to: from + rowCount - 1, total: _.toNumber(total) || rowCount };
}
