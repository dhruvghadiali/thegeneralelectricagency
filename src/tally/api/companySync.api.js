import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ROLE_PATHS } from "@Enums";
import { TALLY_ENDPOINTS } from "@Tally/api/endpoints.constants";

const TALLY_COMPANY_SYNCS_PATH =
  `/${ROLE_PATHS.TECH_SUPPORT}/${TALLY_ENDPOINTS.COMPANY_SYNCS}`;

function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
}

export async function getTallyCompanySyncs(params = {}, config = {}) {
  const { data } = await apiClient.get(TALLY_COMPANY_SYNCS_PATH, {
    params,
    ...config,
  });

  return unwrapPayload(data);
}
