import { ROLE_PATHS } from "@Enums";
import { createEmployeeApi } from "@/api/factories/employee.factory";

export const superAdminEmployeeApi = createEmployeeApi(ROLE_PATHS.SUPER_ADMIN);
