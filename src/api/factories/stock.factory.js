import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

const stocksPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.STOCK.BASE}`;

function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
}

export function createStandaloneStockReadApi(rolePath) {
  return {
    getStandaloneStockCount: async (productId, config = {}) => {
      const { data } = await apiClient.get(
        `${stocksPath(rolePath)}/${ENDPOINTS.STOCK.STANDALONE}/${productId}`,
        config,
      );

      return unwrapPayload(data);
    },
  };
}
