import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

const companiesPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.COMPANY.BASE}`;
const systemCompaniesPath = (rolePath) =>
  `${companiesPath(rolePath)}/${ENDPOINTS.COMPANY.SYSTEM}`;
const companyAddressesPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.COMPANY_ADDRESS.BASE}`;
const migrateCompanyFromTallyPath = (rolePath) =>
  `${companiesPath(rolePath)}/${ENDPOINTS.COMPANY.MIGRATE_FROM_TALLY}`;

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

export function createSystemCompanyListApi(rolePath) {
  return {
    getSystemCompanies: async (params = {}, config = {}) => {
      const { data } = await apiClient.get(systemCompaniesPath(rolePath), {
        params,
        ...config,
      });

      return unwrapPayload(data);
    },
  };
}

export function createCompanyAddressMutationApi(rolePath) {
  return {
    updateCompanyAddress: async (addressId, payload) => {
      const { data } = await apiClient.patch(
        `${companyAddressesPath(rolePath)}/${addressId}`,
        payload,
      );

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

    updateCompany: async (companyId, payload) => {
      const { data } = await apiClient.patch(
        `${companiesPath(rolePath)}/${companyId}`,
        payload,
      );

      return unwrapPayload(data);
    },

    migrateCompanyFromTally: async (payload) => {
      const { data } = await apiClient.post(
        migrateCompanyFromTallyPath(rolePath),
        payload,
      );

      return unwrapPayload(data);
    },

    deleteCompany: async (companyId) => {
      const { data } = await apiClient.delete(
        `${companiesPath(rolePath)}/${companyId}`,
      );

      return unwrapPayload(data);
    },
  };
}
