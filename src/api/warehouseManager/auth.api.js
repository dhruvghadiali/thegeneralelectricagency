import { ROLE_PATHS } from "@Enums";
import { createAuthApi } from "@/api/factories/auth.factory";

export const warehouseManagerAuthApi = createAuthApi(
  ROLE_PATHS.WAREHOUSE_MANAGER,
);
