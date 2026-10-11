import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

const quotationDetailsPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.QUOTATION.DETAILS}`;

function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
}

export function createQuotationDetailsMutationApi(rolePath) {
  return {
    createQuotationDetails: async (payload) => {
      const { data } = await apiClient.post(
        quotationDetailsPath(rolePath),
        payload,
      );

      return unwrapPayload(data);
    },
  };
}
