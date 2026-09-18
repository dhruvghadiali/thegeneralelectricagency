import { ROLE_PATHS } from "@Enums";
import { createAccountPasswordApi } from "@Api/factories/account.factory";

export const superAdminAccountApi = createAccountPasswordApi(ROLE_PATHS.SUPER_ADMIN);
