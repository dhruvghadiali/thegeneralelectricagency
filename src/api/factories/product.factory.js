import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

const productsPath = (rolePath) => `/${rolePath}/${ENDPOINTS.PRODUCT.BASE}`;

function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
}

export function createProductListApi(rolePath) {
  return {
    getProducts: async (params = {}, config = {}) => {
      const { data } = await apiClient.get(productsPath(rolePath), {
        params,
        ...config,
      });

      return unwrapPayload(data);
    },
  };
}

export function createProductMutationApi(rolePath) {
  return {
    createProduct: async (payload) => {
      const { data } = await apiClient.post(productsPath(rolePath), payload);
      return unwrapPayload(data);
    },
    updateProduct: async (productId, payload) => {
      const { data } = await apiClient.patch(
        `${productsPath(rolePath)}/${productId}`,
        payload,
      );
      return unwrapPayload(data);
    },
    deleteProduct: async (productId) => {
      const { data } = await apiClient.delete(
        `${productsPath(rolePath)}/${productId}`,
      );
      return unwrapPayload(data);
    },
  };
}
