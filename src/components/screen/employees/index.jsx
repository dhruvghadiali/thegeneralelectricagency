import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import {
  createEmployee,
  deleteEmployee,
  restoreEmployee,
  updateEmployee,
} from "@Redux/employee/employee.action";
import { selectEmployeeDialogState } from "@Redux/employee/employee.selector";
import {
  employeeDialogClosed,
  employeeDialogOpened,
} from "@Redux/employee/employee.slice";
import {
  EMPLOYEE_TABLE_CONFIG,
  EmployeeTableActions,
  useEmployeeTable,
} from "@Tables/employee";

import EmployeeHeader from "@screenComponent/employees/header";
import EmployeeDialogs from "@screenComponent/employees/dialogs";

/**
 * Searching, sorting, filtering and paging are all done by the backend and
 * driven by the shared table, so this screen is only what is specific to
 * employees: the header controls, the row actions and the dialogs.
 */
function Employees() {
  const dispatch = useDispatch();
  const table = useEmployeeTable();
  const {
    dialog,
    isCreating,
    createError,
    isUpdating,
    updateError,
    isRestoring,
    restoreError,
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

  const restoreSelectedEmployee = async (values) => {
    if (!dialog?.employee?.id) return;

    try {
      await dispatch(
        restoreEmployee({ id: dialog.employee.id, values }),
      ).unwrap();
      table.refresh();
    } catch {
      // The store keeps the dialog open with a display-ready error.
    }
  };

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <EmployeeHeader onAddEmployee={() => openDialog("add")} />

      <DataTable
        {...EMPLOYEE_TABLE_CONFIG}
        rows={table.rows}
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
          <EmployeeTableActions
            employee={employee}
            onEdit={(row) => openDialog("edit", row)}
            onDelete={(row) => openDialog("delete", row)}
            onRestore={(row) => openDialog("restore", row)}
          />
        )}
      />

      <EmployeeDialogs
        dialog={dialog}
        isSaving={dialog?.type === "edit" ? isUpdating : isCreating}
        saveError={dialog?.type === "edit" ? updateError : createError}
        isRestoring={isRestoring}
        restoreError={restoreError}
        isDeleting={isDeleting}
        deleteError={deleteError}
        onClose={() => dispatch(employeeDialogClosed())}
        onSave={saveEmployee}
        onRestore={restoreSelectedEmployee}
        onDelete={deleteSelectedEmployee}
      />
    </main>
  );
}

export default Employees;
