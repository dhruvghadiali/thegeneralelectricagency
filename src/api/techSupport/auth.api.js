import { ROLE_PATHS } from "@Enums";
import { createAuthApi } from "@Api/factories/auth.factory";

export const techSupportAuthApi = createAuthApi(ROLE_PATHS.TECH_SUPPORT);
