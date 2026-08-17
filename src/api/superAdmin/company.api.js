import { ROLE_PATHS } from "@Enums";
import {
  createCompanyContactListApi,
  createCompanyListApi,
} from "@Api/factories/company.factory";

export const superAdminCompanyApi = {
  ...createCompanyListApi(ROLE_PATHS.SUPER_ADMIN),
  ...createCompanyContactListApi(ROLE_PATHS.SUPER_ADMIN),
};
