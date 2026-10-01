import { apiClient } from "@Api/client.api";
import { ROLE_PATHS } from "@Enums";
import { TALLY_ENDPOINTS } from "@Tally/api/endpoints.constants";

export const systemProductsApi = {
  async getProducts(config = {}) {
    const { data } = await apiClient.get(
      `/${ROLE_PATHS.TECH_SUPPORT}/${TALLY_ENDPOINTS.PRODUCTS}`,
      config,
    );

    return data;
  },
};
