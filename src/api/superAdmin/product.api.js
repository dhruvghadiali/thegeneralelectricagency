import { ROLE_PATHS } from "@Enums";
import { createProductListApi } from "@Api/factories/product.factory";

// Super admins intentionally receive only the read-side API.
export const superAdminProductApi = createProductListApi(
  ROLE_PATHS.SUPER_ADMIN,
);
