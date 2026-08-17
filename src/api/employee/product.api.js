import { ROLE_PATHS } from "@Enums";
import {
  createProductListApi,
  createProductMutationApi,
} from "@Api/factories/product.factory";

export const employeeProductApi = {
  ...createProductListApi(ROLE_PATHS.EMPLOYEE),
  ...createProductMutationApi(ROLE_PATHS.EMPLOYEE),
};
