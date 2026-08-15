import _ from "lodash";

/**
 * The signin form works in camelCase and also carries the selected role,
 * which is a client-side routing concern the backend never sees - the role
 * picks the endpoint, only the credentials go in the body. All translation
 * between the form and the API contract lives here, so neither the form nor
 * the store has to know about the other side's naming.
 */
const SIGN_IN_PAYLOAD_FIELDS = {
  username: "username",
  password: "password",
};

/**
 * Identifiers are trimmed because a stray space is always a typo. Passwords
 * are sent exactly as typed - whitespace can be part of the secret.
 */
const TRIMMED_FIELDS = ["username"];

/**
 * Response field names are read from a list because the three role endpoints
 * echo the signed-in user slightly differently - some nest it under `user`,
 * some return it flat.
 */
const RESPONSE_FIELDS = {
  token: ["token", "access_token", "accessToken"],
  username: ["user.username", "username", "user_name"],
  email: ["user.email", "email"],
};

export function toSignInPayload(values) {
  return _.mapValues(SIGN_IN_PAYLOAD_FIELDS, (formField, apiField) => {
    const value = _.get(values, formField, "");
    return _.includes(TRIMMED_FIELDS, apiField) ? _.trim(value) : value;
  });
}

export function fromSignInResponse(response = {}) {
  return _.mapValues(RESPONSE_FIELDS, (paths) => {
    const key = _.find(paths, (path) => !_.isNil(_.get(response, path)));
    return _.isUndefined(key) ? null : _.get(response, key);
  });
}
