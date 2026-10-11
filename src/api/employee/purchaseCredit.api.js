import { ROLE_PATHS } from "@Enums";
import {
  createPurchaseCreditListApi,
  createPurchaseCreditMutationApi,
} from "@Api/factories/purchaseCredit.factory";

export const employeePurchaseCreditApi = {
  ...createPurchaseCreditListApi(ROLE_PATHS.EMPLOYEE),
  ...createPurchaseCreditMutationApi(ROLE_PATHS.EMPLOYEE),
};
