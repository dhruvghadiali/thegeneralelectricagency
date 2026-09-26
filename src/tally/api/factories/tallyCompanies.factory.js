import { apiClient } from "@Api/client.api";
import { TALLY_ENDPOINTS } from "@Tally/api/endpoints.constants";

export function createTallyCompaniesListApi(rolePath) {
  return {
    getTallyCompanies: async (params = {}, config = {}) => {
      const { data } = await apiClient.get(
        `/${rolePath}/${TALLY_ENDPOINTS.COMPANIES}`,
        { params, ...config },
      );

      return Array.isArray(data) ? (data[0] ?? {}) : (data ?? {});
    },
  };
}
