import _ from "lodash";

/** Restore authentication accepts the password and no other request fields. */
export function toEmployeeRestorePayload(values = {}) {
  return { password: _.get(values, "password", "") };
}
