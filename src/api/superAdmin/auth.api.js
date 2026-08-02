import { ROLE_PATHS } from "@Enums/role.enum";
import { createAuthApi } from "@/api/factories/createAuthApi";

export const superAdminAuthApi = createAuthApi(ROLE_PATHS.SUPER_ADMIN);
