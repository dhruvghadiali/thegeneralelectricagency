import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { TALLY_ENDPOINTS } from "@Tally/api/endpoints.constants";

function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
}

export function createUnmappedProductsListApi(rolePath) {
  return {
    getUnmappedProducts: async (params = {}, config = {}) => {
      const { data } = await apiClient.get(
        `/${rolePath}/${TALLY_ENDPOINTS.UNMAPPED_PRODUCTS}`,
        { params, ...config },
      );

      return unwrapPayload(data);
    },
  };
}
