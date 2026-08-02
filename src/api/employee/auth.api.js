import { ROLE_PATHS } from "@/api/roles";
import { createAuthApi } from "@/api/factories/createAuthApi";

export const employeeAuthApi = createAuthApi(ROLE_PATHS.EMPLOYEE);
