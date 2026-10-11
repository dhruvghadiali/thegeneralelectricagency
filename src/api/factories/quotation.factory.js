import _ from "lodash";

import { apiClient } from "@Api/client.api";
import { ENDPOINTS } from "@Api/endpoints.constants";

const quotationDetailsPath = (rolePath) =>
  `/${rolePath}/${ENDPOINTS.QUOTATION.DETAILS}`;

function unwrapPayload(data) {
  return _.isArray(data) && data.length > 0 ? data[0] : (data ?? {});
}

function unwrapListPayload(data) {
  const wrappedPayload = _.isArray(data) && data.length === 1 ? data[0] : null;
  const isWrappedList =
    _.isPlainObject(wrappedPayload) &&
    [
      "quotation_details",
      "quotationDetails",
      "quotations",
      "items",
      "pagination",
    ].some((key) => key in wrappedPayload);

  return isWrappedList ? wrappedPayload : (data ?? {});
}

export function createQuotationDetailsListApi(rolePath) {
  return {
    getQuotationDetails: async (params = {}, config = {}) => {
      const { data } = await apiClient.get(quotationDetailsPath(rolePath), {
        params,
        ...config,
      });

      return unwrapListPayload(data);
    },
  };
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
