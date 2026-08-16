import { ROLE_PATHS } from "@Enums";
import {
  createCompanyListApi,
  createCompanyMutationApi,
} from "@Api/factories/company.factory";

export const employeeCompanyApi = {
  ...createCompanyListApi(ROLE_PATHS.EMPLOYEE),
  ...createCompanyMutationApi(ROLE_PATHS.EMPLOYEE),
};
