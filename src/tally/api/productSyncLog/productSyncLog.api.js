import { apiClient } from "@Api/client.api";
import { ROLE_PATHS } from "@Enums";
import { TALLY_ENDPOINTS } from "@Tally/api/endpoints.constants";

export const tallyProductSyncLogApi = {
  async getTallyProductSyncLogs({ page = 1, limit = 10 } = {}, config = {}) {
    const { data } = await apiClient.get(
      `/${ROLE_PATHS.TECH_SUPPORT}/${TALLY_ENDPOINTS.PRODUCT_SYNC_LOGS}`,
      { params: { page, limit }, ...config },
    );

    return Array.isArray(data) ? (data[0] ?? {}) : (data ?? {});
  },
};
