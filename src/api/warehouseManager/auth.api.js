import { ROLE_PATHS } from "@/api/roles";
import { createAuthApi } from "@/api/factories/createAuthApi";

export const warehouseManagerAuthApi = createAuthApi(
  ROLE_PATHS.WAREHOUSE_MANAGER,
);
