import { ROLE_PATHS } from "@Enums/role.enum";
import { createAuthApi } from "@/api/factories/createAuthApi";

export const employeeAuthApi = createAuthApi(ROLE_PATHS.EMPLOYEE);
