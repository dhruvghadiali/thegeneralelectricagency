import { ROLE_PATHS } from "@/api/roles";
import { createAuthApi } from "@/api/factories/createAuthApi";

export const superAdminAuthApi = createAuthApi(ROLE_PATHS.SUPER_ADMIN);
