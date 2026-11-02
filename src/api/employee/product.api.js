import { ROLE_PATHS } from "@Enums";
import {
  createProductListApi,
  createProductMigrateFromTallyApi,
  createProductMutationApi,
  createTallyProductListApi,
} from "@Api/factories/product.factory";

export const employeeProductApi = {
  ...createProductListApi(ROLE_PATHS.EMPLOYEE),
  ...createTallyProductListApi(ROLE_PATHS.EMPLOYEE),
  ...createProductMigrateFromTallyApi(ROLE_PATHS.EMPLOYEE),
  ...createProductMutationApi(ROLE_PATHS.EMPLOYEE),
};
