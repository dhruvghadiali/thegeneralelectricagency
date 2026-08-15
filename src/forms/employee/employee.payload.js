import _ from "lodash";

import { ROLE_BY_USER_TYPE, USER_TYPE_BY_ROLE } from "@Enums";

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
  const payload = _.mapValues(CREATE_PAYLOAD_FIELDS, (formField) =>
    _.trim(_.get(values, formField, "")),
  );

  // The role is the one field whose *value* differs between the two sides,
  // not just its key: the form holds the hyphenated ROLE_PATHS value, the
  // backend stores the underscored user_type.
  return { ...payload, user_type: USER_TYPE_BY_ROLE[payload.user_type] };
}

export function fromEmployeeResponse(response = {}) {
  const record = _.mapValues(RESPONSE_FIELDS, (paths) => {
    const key = _.find(paths, (path) => !_.isNil(_.get(response, path)));
    return _.isUndefined(key) ? null : _.get(response, key);
  });

  // Mirror of the outbound mapping - the table, filter and role label all
  // key off ROLE_PATHS, so the stored user_type is translated back. Here the
  // fallback earns its place: RESPONSE_FIELDS also accepts a `role` key, and
  // an endpoint echoing the hyphenated spelling needs no translation.
  return { ...record, role: ROLE_BY_USER_TYPE[record.role] ?? record.role };
}
