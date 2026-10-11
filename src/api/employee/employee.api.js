import { createWarehouseManagerListApi } from "@Api/factories/employee.factory";
import { ROLE_PATHS } from "@Enums";

export const employeeEmployeeApi = {
  ...createWarehouseManagerListApi(ROLE_PATHS.EMPLOYEE),
};
