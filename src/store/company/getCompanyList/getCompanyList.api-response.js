import { COMPANY_LIST_DEFAULTS, TABLE_DEFAULTS } from "@Enums";
import { fromCompanyListApiResponse } from "@utils/apiResponse/company/companyList.api-response";

export function fromCompanyListResponse(response = {}, requested = {}) {
  return fromCompanyListApiResponse(response, requested, {
    page: TABLE_DEFAULTS.PAGE,
    limit: COMPANY_LIST_DEFAULTS.limit,
  });
}
