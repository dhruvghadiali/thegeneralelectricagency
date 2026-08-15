import _ from "lodash";

/**
 * The employee form works in camelCase, the backend contract is snake_case.
 * All translation between the two lives here so neither the form nor the
 * store has to know about the other side's naming.
 */
const CREATE_PAYLOAD_FIELDS = {
  first_name: "firstName",
  last_name: "lastName",
  email: "email",
  phone_number: "phone",
  username: "username",
  user_type: "role",
};

/**
 * Response field names are read from a list because some endpoints echo the
 * request casing while others return the stored document.
 */
const RESPONSE_FIELDS = {
  id: ["id", "_id"],
  firstName: ["first_name", "firstName"],
  lastName: ["last_name", "lastName"],
  email: ["email"],
  phone: ["phone_number", "phone"],
  username: ["username"],
  role: ["user_type", "role"],
  joined: ["joined", "created_at", "createdAt"],
};

export function toEmployeeCreatePayload(values) {
  return _.mapValues(CREATE_PAYLOAD_FIELDS, (formField) =>
    _.trim(_.get(values, formField, "")),
  );
}

export function fromEmployeeResponse(response = {}) {
  return _.mapValues(RESPONSE_FIELDS, (paths) => {
    const key = _.find(paths, (path) => !_.isNil(_.get(response, path)));
    return _.isUndefined(key) ? null : _.get(response, key);
  });
}
