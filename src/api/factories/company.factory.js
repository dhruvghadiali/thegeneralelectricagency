import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

const companiesPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.COMPANY.BASE}`;

function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
}

export function createCompanyListApi(rolePath) {
  return {
    getCompanies: async (params = {}, config = {}) => {
      const { data } = await apiClient.get(companiesPath(rolePath), {
        params,
        ...config,
      });

      return unwrapPayload(data);
    },
  };
}

export function createCompanyMutationApi(rolePath) {
  return {
    createCompany: async (payload) => {
      const { data } = await apiClient.post(companiesPath(rolePath), payload);

      return unwrapPayload(data);
    },
  };
}
