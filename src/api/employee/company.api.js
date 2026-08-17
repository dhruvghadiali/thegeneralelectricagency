import { ROLE_PATHS } from "@Enums";
import {
  createCompanyContactListApi,
  createCompanyListApi,
  createCompanyMutationApi,
} from "@Api/factories/company.factory";

export const employeeCompanyApi = {
  ...createCompanyListApi(ROLE_PATHS.EMPLOYEE),
  ...createCompanyContactListApi(ROLE_PATHS.EMPLOYEE),
  ...createCompanyMutationApi(ROLE_PATHS.EMPLOYEE),
};
