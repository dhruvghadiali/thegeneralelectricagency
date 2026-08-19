import _ from "lodash";

import {
  EMPLOYEE_TABLE_DEFAULTS,
  ROLE_BY_USER_TYPE,
  TABLE_DEFAULTS,
} from "@Enums";

/**
 * Maps backend employee response fields to the frontend's camelCase model.
 * Alternate paths support endpoints that echo request casing.
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

function pickFields(source, fieldPaths) {
  return _.mapValues(fieldPaths, (paths) => {
    const key = _.find(paths, (path) => !_.isNil(_.get(source, path)));
    return _.isUndefined(key) ? null : _.get(source, key);
  });
}

function fromEmployeeResponse(response = {}) {
  const record = pickFields(response, RESPONSE_FIELDS);

  return {
    ...record,
    role: ROLE_BY_USER_TYPE[record.role] ?? record.role,
    // Only an explicit false marks an employee as inactive.
    isActive: _.isNil(record.isActive) ? true : Boolean(record.isActive),
  };
}

function fromEmployeePaginationResponse(pagination = {}, requested = {}) {
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

function fromEmployeeSummaryResponse(summary = {}) {
  return {
    totalEmployees: _.toNumber(summary.total_employees) || 0,
    activeEmployees: _.toNumber(summary.active_employees) || 0,
    activeWarehouseManagers:
      _.toNumber(summary.active_warehouse_managers) || 0,
  };
}

/**
 * Converts the unwrapped list response into the shared frontend table shape.
 */
export function fromEmployeeListResponse(response = {}, requested = {}) {
  return {
    items: _.map(_.get(response, "employees", []), fromEmployeeResponse),
    pagination: fromEmployeePaginationResponse(
      _.get(response, "pagination", {}),
      requested,
    ),
    summary: fromEmployeeSummaryResponse(_.get(response, "summary", {})),
  };
}
