import { ROLE_PATHS } from "@Enums";
import { createAuthApi } from "@/api/factories/createAuthApi";

export const superAdminAuthApi = createAuthApi(ROLE_PATHS.SUPER_ADMIN);
