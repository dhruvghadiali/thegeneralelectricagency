import {
  createQuotationDetailsListApi,
  createQuotationDetailsMutationApi,
} from "@Api/factories/quotation.factory";
import { ROLE_PATHS } from "@Enums";

export const employeeQuotationApi = {
  ...createQuotationDetailsListApi(ROLE_PATHS.EMPLOYEE),
  ...createQuotationDetailsMutationApi(ROLE_PATHS.EMPLOYEE),
};
