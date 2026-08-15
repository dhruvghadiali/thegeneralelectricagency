import _ from "lodash";

import { EMPLOYEE_TABLE_DEFAULTS, ROLE_BY_USER_TYPE, TABLE_DEFAULTS, USER_TYPE_BY_ROLE } from "@Enums";
import { buildColumnFilterParams, buildSortParams } from "@/utils/dataTable.util";

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
  id: ["_id", "id"],
  empId: ["emp_id", "empId"],
  firstName: ["first_name", "firstName"],
  lastName: ["last_name", "lastName"],
  email: ["email"],
  phone: ["phone_number", "phone"],
  username: ["username"],
  role: ["user_type", "role"],
  isActive: ["is_active", "isActive"],
  joined: ["created_at", "createdAt", "joined"],
  updatedAt: ["updated_at", "updatedAt"],
};

const PAGINATION_FIELDS = {
  page: ["page"],
  limit: ["limit"],
  total: ["total"],
  totalPages: ["total_pages", "totalPages"],
};

/**
 * Reads the first path that is actually present, so a field the endpoint
 * omits comes back as null rather than undefined.
 */
function pickFields(source, fieldPaths) {
  return _.mapValues(fieldPaths, (paths) => {
    const key = _.find(paths, (path) => !_.isNil(_.get(source, path)));
    return _.isUndefined(key) ? null : _.get(source, key);
  });
}

export function toEmployeeCreatePayload(values) {
  const payload = _.mapValues(CREATE_PAYLOAD_FIELDS, (formField) =>
    _.trim(_.get(values, formField, "")),
  );

  // The role is the one field whose *value* differs between the two sides,
  // not just its key: the form holds the hyphenated ROLE_PATHS value, the
  // backend stores the underscored user_type.
  return { ...payload, user_type: USER_TYPE_BY_ROLE[payload.user_type] };
}

/**
 * Turns the table's query state into the query string the list endpoint
 * takes:
 *
 *   ?page=1&limit=20&search=raj&sort_by=first_name&sort_order=asc
 *   &user_type=employee&is_active=true&created_at_from=2024-01-01
 *
 * The column filters are built from the column definitions, so adding a
 * filterable column to employee.columns.jsx is all it takes to add a
 * parameter - there is nothing to change here.
 */
export function toEmployeeListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = EMPLOYEE_TABLE_DEFAULTS.LIMIT,
  search = "",
  sort = null,
  filters = {},
} = {}) {
  const params = {
    page,
    limit,
    search: _.trim(search) || undefined,
    ...buildSortParams(sort),
    ...buildColumnFilterParams(columns, filters),
  };

  return _.omitBy(params, _.isUndefined);
}

export function fromEmployeeResponse(response = {}) {
  const record = pickFields(response, RESPONSE_FIELDS);

  // Mirror of the outbound mapping - the role label and role filter both key
  // off ROLE_PATHS, so the stored user_type is translated back. Here the
  // fallback earns its place: RESPONSE_FIELDS also accepts a `role` key, and
  // an endpoint echoing the hyphenated spelling needs no translation.
  return {
    ...record,
    role: ROLE_BY_USER_TYPE[record.role] ?? record.role,
    // A record with no flag is treated as active - only an explicit `false`
    // deactivates someone.
    isActive: _.isNil(record.isActive) ? true : Boolean(record.isActive),
  };
}

/**
 * `requested` is what the client asked for, and stands in whenever the
 * backend omits an echo of it - so the pager never falls back to page 0.
 */
export function fromEmployeePaginationResponse(pagination = {}, requested = {}) {
  const record = pickFields(pagination, PAGINATION_FIELDS);
  const page = _.toNumber(record.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    _.toNumber(record.limit) || requested.limit || EMPLOYEE_TABLE_DEFAULTS.LIMIT;
  const total = _.toNumber(record.total) || 0;

  return {
    page,
    limit,
    total,
    totalPages: _.toNumber(record.totalPages) || Math.ceil(total / limit) || 0,
  };
}

/**
 * The list endpoint wraps its payload one level deeper than the rest of the
 * API: `data` is an array holding a single { employees, pagination } object.
 * The API module already unwrapped that array, so this takes the object.
 *
 * `items` rather than `employees` on the way out, because that is the shape
 * the shared table reducers consume.
 */
export function fromEmployeeListResponse(response = {}, requested = {}) {
  return {
    items: _.map(_.get(response, "employees", []), fromEmployeeResponse),
    pagination: fromEmployeePaginationResponse(
      _.get(response, "pagination", {}),
      requested,
    ),
  };
}
