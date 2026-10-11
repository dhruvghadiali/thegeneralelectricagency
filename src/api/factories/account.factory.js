import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

export function createAccountPasswordApi(rolePath) {
  return {
    changePassword: (payload) =>
      apiClient.patch(`/${rolePath}/${ENDPOINTS.ACCOUNT.PASSWORD}`, payload),
  };
}
