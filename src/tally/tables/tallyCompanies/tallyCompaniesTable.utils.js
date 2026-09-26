import { COLUMN_TYPES } from "@Enums";

export function textColumn(field, header, options = {}) {
  return {
    key: field,
    field,
    header,
    type: COLUMN_TYPES.TEXT,
    className: "min-w-44 whitespace-normal break-words",
    ...options,
  };
}
