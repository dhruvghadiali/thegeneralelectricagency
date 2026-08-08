import _ from "lodash";

import { apiClient } from "@/api/client.api";
import { ENDPOINTS } from "@/api/endpoints.constants";

/**
 * All three roles share the same auth contract, just scoped under their own
 * path segment - e.g. /employee/auth/signin vs /super-admin/auth/signin.
 */
export function createAuthApi(rolePath) {
  return {
    signIn: async (payload) => {
      const { data } = await apiClient.post(`/${rolePath}/${ENDPOINTS.AUTH.SIGN_IN}`, payload);
      return _.isArray(data) && data.length > 0 ? data[0] : {};
    },
  };
}
