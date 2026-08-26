import { ROLE_PATHS } from "@Enums";
import { createPurchaseCreditMutationApi } from "@Api/factories/purchaseCredit.factory";

export const employeePurchaseCreditApi = {
  ...createPurchaseCreditMutationApi(ROLE_PATHS.EMPLOYEE),
};
