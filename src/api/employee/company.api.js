import { ROLE_PATHS } from "@Enums";
import {
  createCompanyAddressMutationApi,
  createCompanyContactListApi,
  createCompanyContactMutationApi,
  createCompanyListApi,
  createCompanyMutationApi,
} from "@Api/factories/company.factory";

export const employeeCompanyApi = {
  ...createCompanyListApi(ROLE_PATHS.EMPLOYEE),
  ...createCompanyAddressMutationApi(ROLE_PATHS.EMPLOYEE),
  ...createCompanyContactListApi(ROLE_PATHS.EMPLOYEE),
  ...createCompanyContactMutationApi(ROLE_PATHS.EMPLOYEE),
  ...createCompanyMutationApi(ROLE_PATHS.EMPLOYEE),
};
