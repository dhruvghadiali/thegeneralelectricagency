import { fetchEmployees } from "@Redux/employee/employee.action";
import { employeeTableActions } from "@Redux/employee/employee.slice";
import { employeeTableSelectors } from "@Redux/employee/employee.selector";
import { useDataTable } from "@/components/common/dataTable/useDataTable";
import { EMPLOYEE_COLUMNS } from "@/components/screen/employees/employee.columns";

/**
 * Binds the employee slice to the shared table controller.
 *
 * Defined at module level so its identity never changes - the controller's
 * fetch effect depends on it, and a function rebuilt on each render would
 * restart that effect forever.
 */
const fetchEmployeeList = () => fetchEmployees(EMPLOYEE_COLUMNS);

export function useEmployeeList() {
  return useDataTable({
    selectors: employeeTableSelectors,
    actions: employeeTableActions,
    fetchAction: fetchEmployeeList,
  });
}

export default useEmployeeList;
