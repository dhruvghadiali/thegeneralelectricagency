import _ from "lodash";

import {
  EMPLOYEE_TABLE_DEFAULTS,
  TABLE_DEFAULTS,
  USER_TYPE_BY_ROLE,
} from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";

/**
 * Converts frontend employee values into the backend's snake_case contract.
 */
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

  // The frontend holds the hyphenated ROLE_PATHS value while the backend
  // stores the underscored user_type.
  return { ...payload, user_type: USER_TYPE_BY_ROLE[payload.user_type] };
}

// Create and update currently accept the same editable fields. Separate
// exports allow either endpoint contract to diverge later.
export function toEmployeeUpdatePayload(values) {
  return toEmployeeCreatePayload(values);
}

/**
 * Converts frontend table state into the employee list endpoint's query.
 */
export function toEmployeeListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = EMPLOYEE_TABLE_DEFAULTS.LIMIT,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({
    columns,
    page,
    limit,
    search,
    sort,
    filters,
  });
}
