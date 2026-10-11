import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

const purchaseCreditsPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.PURCHASE_CREDIT.BASE}`;

function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
}

export function createPurchaseCreditListApi(rolePath) {
  return {
    getPurchaseCredits: async (params = {}, config = {}) => {
      const { data } = await apiClient.get(purchaseCreditsPath(rolePath), {
        params,
        ...config,
      });

      return unwrapPayload(data);
    },
  };
}

export function createPurchaseCreditMutationApi(rolePath) {
  return {
    createPurchaseCredit: async (payload) => {
      const { data } = await apiClient.post(
        purchaseCreditsPath(rolePath),
        payload,
      );

      return unwrapPayload(data);
    },

    updatePurchaseCredit: async (purchaseCreditId, payload) => {
      const { data } = await apiClient.patch(
        `${purchaseCreditsPath(rolePath)}/${purchaseCreditId}`,
        payload,
      );

      return unwrapPayload(data);
    },

    updatePurchaseCreditPayment: async (
      purchaseCreditId,
      paymentId,
      payload,
    ) => {
      const { data } = await apiClient.patch(
        `${purchaseCreditsPath(rolePath)}/${purchaseCreditId}/payments/${paymentId}`,
        payload,
      );

      return unwrapPayload(data);
    },

    createPurchaseCreditPayment: async (purchaseCreditId, payload) => {
      const { data } = await apiClient.post(
        `${purchaseCreditsPath(rolePath)}/${purchaseCreditId}/payments`,
        payload,
      );

      return unwrapPayload(data);
    },

    createPurchaseCreditPaymentPlanning: async (
      purchaseCreditId,
      payload,
    ) => {
      const { data } = await apiClient.post(
        `${purchaseCreditsPath(rolePath)}/${purchaseCreditId}/${ENDPOINTS.PURCHASE_CREDIT.PAYMENT_PLANNINGS}`,
        payload,
      );

      return unwrapPayload(data);
    },

    updatePurchaseCreditPaymentPlanning: async (
      purchaseCreditId,
      paymentPlanningId,
      payload,
    ) => {
      const { data } = await apiClient.patch(
        `${purchaseCreditsPath(rolePath)}/${purchaseCreditId}/${ENDPOINTS.PURCHASE_CREDIT.PAYMENT_PLANNINGS}/${paymentPlanningId}`,
        payload,
      );

      return unwrapPayload(data);
    },
  };
}
