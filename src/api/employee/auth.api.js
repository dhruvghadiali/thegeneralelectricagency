import { ROLE_PATHS } from "@Enums";
import { createAuthApi } from "@Api/factories/auth.factory";

export const employeeAuthApi = createAuthApi(ROLE_PATHS.EMPLOYEE);
