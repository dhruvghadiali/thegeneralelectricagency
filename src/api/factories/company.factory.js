import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

const companiesPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.COMPANY.BASE}`;
const companyContactsPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.COMPANY_CONTACT.BASE}`;
const companyAddressesPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.COMPANY_ADDRESS.BASE}`;

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

export function createCompanyContactListApi(rolePath) {
  return {
    getCompanyContacts: async (params = {}, config = {}) => {
      const { data } = await apiClient.get(companyContactsPath(rolePath), {
        params,
        ...config,
      });

      return unwrapPayload(data);
    },
  };
}

export function createCompanyContactMutationApi(rolePath) {
  return {
    createCompanyContact: async (payload) => {
      const { data } = await apiClient.post(
        companyContactsPath(rolePath),
        payload,
      );

      return unwrapPayload(data);
    },

    updateCompanyContact: async (contactId, payload) => {
      const { data } = await apiClient.patch(
        `${companyContactsPath(rolePath)}/${contactId}`,
        payload,
      );

      return unwrapPayload(data);
    },

    reassignCompanyContact: async (contactId, payload) => {
      const { data } = await apiClient.patch(
        `${companyContactsPath(rolePath)}/${contactId}/${ENDPOINTS.COMPANY_CONTACT.REASSIGN}`,
        payload,
      );

      return unwrapPayload(data);
    },

    deleteCompanyContact: async (contactId) => {
      const { data } = await apiClient.delete(
        `${companyContactsPath(rolePath)}/${contactId}`,
      );

      return unwrapPayload(data);
    },
  };
}

export function createCompanyAddressMutationApi(rolePath) {
  return {
    createCompanyAddress: async (payload) => {
      const { data } = await apiClient.post(
        companyAddressesPath(rolePath),
        payload,
      );

      return unwrapPayload(data);
    },

    updateCompanyAddress: async (addressId, payload) => {
      const { data } = await apiClient.patch(
        `${companyAddressesPath(rolePath)}/${addressId}`,
        payload,
      );

      return unwrapPayload(data);
    },

    deleteCompanyAddress: async (addressId) => {
      const { data } = await apiClient.delete(
        `${companyAddressesPath(rolePath)}/${addressId}`,
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

    deleteCompany: async (companyId) => {
      const { data } = await apiClient.delete(
        `${companiesPath(rolePath)}/${companyId}`,
      );

      return unwrapPayload(data);
    },
  };
}
