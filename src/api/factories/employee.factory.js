import _ from "lodash";

import { apiClient } from "@/api/client.api";
import { ENDPOINTS } from "@/api/endpoints.constants";

/**
 * Employee management is scoped under the acting role's path segment, the same
 * way auth is - e.g. /super-admin/employees. Only roles allowed to manage
 * people get a module built from this factory.
 */
export function createEmployeeApi(rolePath) {
  return {
    createEmployee: async (payload) => {
      const { data } = await apiClient.post(
        `/${rolePath}/${ENDPOINTS.EMPLOYEE.BASE}`,
        payload,
      );
      return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
    },
  };
}
