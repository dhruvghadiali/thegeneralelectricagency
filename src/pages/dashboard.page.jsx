import { useSelector } from "react-redux";

import { ROLE_PATHS } from "@Enums";
import SuperAdminDashboard from "@screenComponent/dashboard/superAdmin";
import EmployeeDashboard from "@screenComponent/dashboard/employee";
import WarehouseDashboard from "@screenComponent/dashboard/warehouseManager";

const DASHBOARD_BY_ROLE = {
  [ROLE_PATHS.SUPER_ADMIN]: SuperAdminDashboard,
  [ROLE_PATHS.EMPLOYEE]: EmployeeDashboard,
  [ROLE_PATHS.WAREHOUSE_MANAGER]: WarehouseDashboard,
};

function DashboardPage() {
  const role = useSelector((state) => state.auth.role);
  const RoleDashboard = DASHBOARD_BY_ROLE[role] ?? EmployeeDashboard;

  return <RoleDashboard />;
}

export default DashboardPage;
