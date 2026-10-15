import _ from "lodash";

import { fromCompanyApiResponse } from "@utils/apiResponse/company/company.api-response";
import { fromCompanyPaginationApiResponse } from "@utils/apiResponse/company/companyPagination.api-response";
import { fromCompanySummaryApiResponse } from "@utils/apiResponse/company/companySummary.api-response";

export function fromCompanyListApiResponse(
  response = {},
  requested = {},
  defaults = {},
) {
  return {
    items: _.map(response.companies ?? [], fromCompanyApiResponse),
    pagination: fromCompanyPaginationApiResponse(
      response.pagination ?? {},
      requested,
      defaults,
    ),
    summary: fromCompanySummaryApiResponse(response.summary),
  };
}

export default fromCompanyListApiResponse;
