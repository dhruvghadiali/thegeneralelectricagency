import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

/**
 * Employee management is scoped under the acting role's path segment, the same
 * way auth is - e.g. /super-admin/employees. Only roles allowed to manage
 * people get modules built from these factories.
 *
 * Reads and writes are built separately: a role may be allowed to browse the
 * directory without being allowed to change it, and keeping the two apart
 * lets each role module take only the half it is entitled to.
 */

const employeesPath = (rolePath) => `/${rolePath}/${ENDPOINTS.EMPLOYEE.BASE}`;

/**
 * Every endpoint on this API answers with { status, message, data }, and on
 * the employee routes `data` is an array wrapping the real payload. The
 * client interceptor unwraps the envelope; this unwraps the array so callers
 * only ever see the payload object.
 */
function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
}

/**
 * Read side of the directory.
 */
export function createEmployeeListApi(rolePath) {
  return {
    /**
     * GET /:role/employees?page&limit&search&user_type&is_active
     *
     * Resolves to the { employees, pagination } object.
     *
     * `config` carries the AbortSignal, so a request made obsolete by fast
     * typing or paging is cancelled rather than raced.
     */
    getEmployees: async (params = {}, config = {}) => {
      const { data } = await apiClient.get(employeesPath(rolePath), {
        params,
        ...config,
      });

      return unwrapPayload(data);
    },
  };
}

/**
 * Write side of the directory.
 */
export function createEmployeeMutationApi(rolePath) {
  return {
    /**
     * POST /:role/employees - resolves to the created employee record.
     */
    createEmployee: async (payload) => {
      const { data } = await apiClient.post(employeesPath(rolePath), payload);

      return unwrapPayload(data);
    },

    /**
     * PATCH /:role/employees/:id - resolves to the updated employee record.
     */
    updateEmployee: async (employeeId, payload) => {
      const { data } = await apiClient.patch(
        `${employeesPath(rolePath)}/${employeeId}`,
        payload,
      );

      return unwrapPayload(data);
    },

    /** PATCH /:role/employees/:id/restore - restores an inactive employee. */
    restoreEmployee: async (employeeId, payload) => {
      const { data } = await apiClient.patch(
        `${employeesPath(rolePath)}/${employeeId}/${ENDPOINTS.EMPLOYEE.RESTORE}`,
        payload,
      );

      return unwrapPayload(data);
    },

    /**
     * DELETE /:role/employees/:id.
     */
    deleteEmployee: async (employeeId) => {
      const { data } = await apiClient.delete(
        `${employeesPath(rolePath)}/${employeeId}`,
      );

      return unwrapPayload(data);
    },
  };
}
