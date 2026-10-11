import { ROLE_PATHS } from "@Enums";
import {
  createPurchaseListApi,
  createPurchaseMutationApi,
} from "@Api/factories/purchase.factory";

export const employeePurchaseApi = {
  ...createPurchaseListApi(ROLE_PATHS.EMPLOYEE),
  ...createPurchaseMutationApi(ROLE_PATHS.EMPLOYEE),
};
