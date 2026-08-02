import { ROLE_PATHS } from "@Enums/role.enum";
import { createAuthApi } from "@/api/factories/createAuthApi";

export const warehouseManagerAuthApi = createAuthApi(
  ROLE_PATHS.WAREHOUSE_MANAGER,
);
