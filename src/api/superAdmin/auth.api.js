import { ROLE_PATHS } from "@Enums";
import { createAuthApi } from "@/api/factories/auth.factory";

export const superAdminAuthApi = createAuthApi(ROLE_PATHS.SUPER_ADMIN);
