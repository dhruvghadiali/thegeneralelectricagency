import { ROLE_PATHS } from "@Enums";
import { createAuthApi } from "@/api/factories/createAuthApi";

export const warehouseManagerAuthApi = createAuthApi(
  ROLE_PATHS.WAREHOUSE_MANAGER,
);
