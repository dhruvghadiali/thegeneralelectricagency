import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

const purchasesPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.PURCHASE.BASE}`;

function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
}

export function createPurchaseListApi(rolePath) {
  return {
    getPurchases: async (params = {}, config = {}) => {
      const { data } = await apiClient.get(purchasesPath(rolePath), {
        params,
        ...config,
      });

      return unwrapPayload(data);
    },
  };
}

export function createPurchaseMutationApi(rolePath) {
  return {
    createPurchase: async (payload) => {
      const { data } = await apiClient.post(purchasesPath(rolePath), payload);
      return unwrapPayload(data);
    },
  };
}
