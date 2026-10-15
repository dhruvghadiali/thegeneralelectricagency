import { TABLE_DEFAULTS } from "@Enums";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";
import { fromCompanyListApiResponse } from "@utils/apiResponse/company/companyList.api-response";

export function fromCompanyListResponse(response = {}, requested = {}) {
  return fromCompanyListApiResponse(response, requested, {
    page: TABLE_DEFAULTS.PAGE,
    limit: COMPANY_TABLE_DEFAULTS.limit,
  });
}
