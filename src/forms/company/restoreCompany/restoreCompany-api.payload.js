import _ from "lodash";

export function toCompanyRestorePayload(values = {}) {
  return { password: _.get(values, "password", "") };
}
