import { ROLE_PATHS } from "@Enums";
import { createCompanyListApi } from "@Api/factories/company.factory";

export const superAdminCompanyApi = {
  ...createCompanyListApi(ROLE_PATHS.SUPER_ADMIN),
};
