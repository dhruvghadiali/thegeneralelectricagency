import { createQuotationDetailsMutationApi } from "@Api/factories/quotation.factory";
import { ROLE_PATHS } from "@Enums";

export const employeeQuotationApi = {
  ...createQuotationDetailsMutationApi(ROLE_PATHS.EMPLOYEE),
};
