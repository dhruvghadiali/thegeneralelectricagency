import { apiClient } from "@Api/client.api";
import { TALLY_ENDPOINTS } from "@Tally/api/endpoints.constants";

export function createTallyCompaniesMutationApi(rolePath) {
  return {
    createTallyCompany: async (payload) => {
      const { data } = await apiClient.post(`/${rolePath}/${TALLY_ENDPOINTS.COMPANIES}`, payload);
      return Array.isArray(data) ? (data[0] ?? {}) : (data ?? {});
    },
  };
}

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
