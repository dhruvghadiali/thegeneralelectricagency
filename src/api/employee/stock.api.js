import { createStandaloneStockReadApi } from "@Api/factories/stock.factory";
import { ROLE_PATHS } from "@Enums";

export const employeeStockApi = {
  ...createStandaloneStockReadApi(ROLE_PATHS.EMPLOYEE),
};
