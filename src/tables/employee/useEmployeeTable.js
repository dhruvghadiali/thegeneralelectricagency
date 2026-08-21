import { fetchEmployees } from "@Redux/employee/employee.action";
import { employeeTableActions } from "@Redux/employee/employee.slice";
import { employeeTableSelectors } from "@Redux/employee/employee.selector";
import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { EMPLOYEE_TABLE_COLUMNS } from "@Tables/employee/employeeTable.columns";

/**
 * Binds the employee slice to the shared table controller.
 *
 * Defined at module level so its identity never changes - the controller's
 * fetch effect depends on it, and a function rebuilt on each render would
 * restart that effect forever.
 */
const fetchEmployeeList = () => fetchEmployees(EMPLOYEE_TABLE_COLUMNS);

export function useEmployeeTable() {
  return useDataTable({
    selectors: employeeTableSelectors,
    actions: employeeTableActions,
    fetchAction: fetchEmployeeList,
  });
}

export default useEmployeeTable;
