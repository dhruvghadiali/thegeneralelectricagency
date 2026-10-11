import { ROLE_PATHS } from "@Enums";
import { createPurchaseCreditListApi } from "@Api/factories/purchaseCredit.factory";

// Super admins intentionally receive only the read-side API.
export const superAdminPurchaseCreditApi = createPurchaseCreditListApi(
  ROLE_PATHS.SUPER_ADMIN,
);
