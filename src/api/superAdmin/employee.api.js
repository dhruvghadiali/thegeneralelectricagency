import { ROLE_PATHS } from "@Enums";
import {
  createEmployeeListApi,
  createEmployeeMutationApi,
} from "@Api/factories/employee.factory";

/**
 * The super admin can both browse and change the directory, so its module is
 * the read and write halves combined. A read-only role would take
 * createEmployeeListApi on its own.
 */
export const superAdminEmployeeApi = {
  ...createEmployeeListApi(ROLE_PATHS.SUPER_ADMIN),
  ...createEmployeeMutationApi(ROLE_PATHS.SUPER_ADMIN),
};
