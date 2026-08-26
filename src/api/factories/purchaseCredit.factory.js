import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

const purchaseCreditsPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.PURCHASE_CREDIT.BASE}`;

function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
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
  };
}
