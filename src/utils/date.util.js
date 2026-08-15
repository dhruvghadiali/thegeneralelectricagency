import _ from "lodash";
import moment from "moment";

/**
 * Dates arrive from the API as ISO strings and are only ever rendered, never
 * recomputed - so formatting lives here rather than in the store, and the
 * store keeps the raw value.
 */
export const DATE_FORMATS = Object.freeze({
  DATE: "DD MMM YYYY",
  DATE_TIME: "DD MMM YYYY, hh:mm A",
});

export const EMPTY_DATE_LABEL = "—";

export function formatDate(value, format = DATE_FORMATS.DATE) {
  if (_.isNil(value) || value === "") {
    return EMPTY_DATE_LABEL;
  }

  const date = moment(value);

  return date.isValid() ? date.format(format) : EMPTY_DATE_LABEL;
}

export function formatRelativeDate(value) {
  if (_.isNil(value) || value === "") {
    return EMPTY_DATE_LABEL;
  }

  const date = moment(value);

  return date.isValid() ? date.fromNow() : EMPTY_DATE_LABEL;
}
