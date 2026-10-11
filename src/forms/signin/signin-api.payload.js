import _ from "lodash";

const SIGN_IN_PAYLOAD_FIELDS = {
  username: "username",
  password: "password",
};

const TRIMMED_FIELDS = ["username"];

export function toSignInPayload(values = {}) {
  return _.mapValues(SIGN_IN_PAYLOAD_FIELDS, (formField, apiField) => {
    const value = _.get(values, formField, "");
    return _.includes(TRIMMED_FIELDS, apiField) ? _.trim(value) : value;
  });
}
