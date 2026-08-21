import _ from "lodash";

import { USER_TYPE_BY_ROLE } from "@Enums";

const MUTATION_PAYLOAD_FIELDS = {
  first_name: "firstName",
  last_name: "lastName",
  email: "email",
  phone_number: "phone",
  username: "username",
  user_type: "role",
};

export function toEmployeeCreatePayload(values) {
  const payload = _.mapValues(MUTATION_PAYLOAD_FIELDS, (formField) =>
    _.trim(_.get(values, formField, "")),
  );

  return { ...payload, user_type: USER_TYPE_BY_ROLE[payload.user_type] };
}

// Add and edit currently share the same fields. Separate exports keep their
// endpoint contracts free to diverge later.
export function toEmployeeUpdatePayload(values) {
  return toEmployeeCreatePayload(values);
}
