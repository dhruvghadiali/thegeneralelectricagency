import {
  TALLY_BASE_URL,
  tallyClient,
} from "@Tally/api/client.api";
import { TALLY_ENDPOINTS } from "@Tally/api/endpoints.constants";

export function createTallyConnectorApi() {
  return {
    getStatus: async (config = {}) => {
      const healthUrl = new URL(
        TALLY_ENDPOINTS.CONNECTOR_HEALTH,
        TALLY_BASE_URL,
      );
      const { data } = await tallyClient.get(healthUrl.href, {
        timeout: 5000,
        responseType: "json",
        ...config,
      });

      return data;
    },
  };
}
