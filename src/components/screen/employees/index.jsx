import { useDispatch, useSelector } from "react-redux";
import { UsersRound } from "lucide-react";

import DataTable from "@commonComponent/dataTable";
import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "@Redux/employee/employee.action";
import { selectEmployeeDialogState } from "@Redux/employee/employee.selector";
import {
  employeeDialogClosed,
  employeeDialogOpened,
} from "@Redux/employee/employee.slice";
import { EMPLOYEE_COLUMNS } from "@screenComponent/employees/employee.columns";
import { useEmployeeList } from "@screenComponent/employees/useEmployeeList";

import EmployeeHeader from "@screenComponent/employees/employeeHeader";
import EmployeeSummary from "@screenComponent/employees/employeeSummary";
import EmployeeDialogs from "@screenComponent/employees/employeeDialogs";
import EmployeeActions from "@screenComponent/employees/employeeActions";

/**
 * Searching, sorting, filtering and paging are all done by the backend and
 * driven by the shared table, so this screen is only what is specific to
 * employees: the header, the summary cards, the row actions and the dialogs.
 */
function Employees() {
  const dispatch = useDispatch();
  const table = useEmployeeList();
  const {
    dialog,
    isCreating,
    createError,
    isUpdating,
    updateError,
    isDeleting,
    deleteError,
  } = useSelector(selectEmployeeDialogState);

  const openDialog = (type, employee) =>
    dispatch(employeeDialogOpened({ type, ...(employee && { employee }) }));

  const saveEmployee = async (values) => {
    try {
      if (dialog?.type === "edit") {
        await dispatch(
          updateEmployee({ id: dialog.employee.id, values }),
        ).unwrap();
      } else {
        await dispatch(createEmployee(values)).unwrap();
      }

      // A changed row may move out of the current filtered or sorted page, so
      // both mutations re-read the authoritative server list.
      table.refresh();
    } catch {
      // The store keeps the dialog open with a display-ready error.
    }
  };

  const deleteSelectedEmployee = async () => {
    if (!dialog?.employee?.id) return;

    try {
      await dispatch(deleteEmployee(dialog.employee.id)).unwrap();
      table.refresh();
    } catch {
      // The store keeps the dialog open with a display-ready error.
    }
  };

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <EmployeeHeader onAddEmployee={() => openDialog("add")} />
      <EmployeeSummary />

      <DataTable
        columns={EMPLOYEE_COLUMNS}
        rows={table.rows}
        rowKey={(employee) => employee.id}
        search={table.search}
        sort={table.sort}
        columnFilters={table.columnFilters}
        pagination={table.pagination}
        pageItems={table.pageItems}
        rowRange={table.rowRange}
        activeFilterCount={table.activeFilterCount}
        isFiltered={table.isFiltered}
        onSearchChange={table.changeSearch}
        onSearchSubmit={table.submitSearch}
        onSortChange={table.changeSort}
        onColumnFilterChange={table.changeColumnFilter}
        onClearFilters={table.clearFilters}
        onPageChange={table.changePage}
        onLimitChange={table.changeLimit}
        onRetry={table.refresh}
        isLoading={table.isLoading}
        error={table.error}
        rowActions={(employee) => (
          <EmployeeActions
            employee={employee}
            onEdit={(row) => openDialog("edit", row)}
            onDelete={(row) => openDialog("delete", row)}
          />
        )}
        searchPlaceholder="Search by name, username, or email..."
        rowNoun="employees"
        emptyIcon={UsersRound}
        emptyTitle="No employees found"
        emptyDescription="Add your first employee to start building the directory."
        filteredEmptyDescription="Try changing your search or filters."
        fillHeight
      />

      <EmployeeDialogs
        dialog={dialog}
        isSaving={dialog?.type === "edit" ? isUpdating : isCreating}
        saveError={dialog?.type === "edit" ? updateError : createError}
        isDeleting={isDeleting}
        deleteError={deleteError}
        onClose={() => dispatch(employeeDialogClosed())}
        onSave={saveEmployee}
        onDelete={deleteSelectedEmployee}
      />
    </main>
  );
}

export default Employees;
