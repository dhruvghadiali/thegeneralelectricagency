import { ROLE_PATHS } from "@Enums";
import {
  createCompanyAddressMutationApi,
  createCompanyListApi,
  createCompanyMutationApi,
  createSystemCompanyListApi,
} from "@Api/factories/company.factory";

export const employeeCompanyApi = {
  ...createCompanyListApi(ROLE_PATHS.EMPLOYEE),
  ...createSystemCompanyListApi(ROLE_PATHS.EMPLOYEE),
  ...createCompanyAddressMutationApi(ROLE_PATHS.EMPLOYEE),
  ...createCompanyMutationApi(ROLE_PATHS.EMPLOYEE),
};
