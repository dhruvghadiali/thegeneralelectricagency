import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { TALLY_ENDPOINTS } from "@Tally/api/endpoints.constants";

const tallyCompanySyncsPath = (rolePath) =>
  `/${rolePath}/${TALLY_ENDPOINTS.COMPANY_SYNCS}`;

function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
}

export function createTallyCompanySyncListApi(rolePath) {
  return {
    getTallyCompanySyncs: async (params = {}, config = {}) => {
      const { data } = await apiClient.get(tallyCompanySyncsPath(rolePath), {
        params,
        ...config,
      });

      return unwrapPayload(data);
    },
  };
}

export function createTallyCompanySyncMutationApi(rolePath) {
  return {
    createTallyCompanySync: async (payload) => {
      const { data } = await apiClient.post(
        tallyCompanySyncsPath(rolePath),
        payload,
      );

      return unwrapPayload(data);
    },
  };
}
