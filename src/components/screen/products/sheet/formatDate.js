import moment from "moment";

export function formatDate(value) {
  if (!value) return "—";

  const date = moment(value);
  return date.isValid() ? date.format("DD MMM YYYY") : "—";
}
