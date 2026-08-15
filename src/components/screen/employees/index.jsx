import { useDispatch, useSelector } from "react-redux";
import { UsersRound } from "lucide-react";

import DataTable from "@/components/common/dataTable";
import { createEmployee } from "@Redux/employee/employee.action";
import { selectEmployeeDialogState } from "@Redux/employee/employee.selector";
import {
  employeeDeleted,
  employeeDialogClosed,
  employeeDialogOpened,
  employeeUpdated,
} from "@Redux/employee/employee.slice";
import { EMPLOYEE_COLUMNS } from "@/components/screen/employees/employee.columns";
import { useEmployeeList } from "@/components/screen/employees/useEmployeeList";

import EmployeeHeader from "@/components/screen/employees/employeeHeader";
import EmployeeSummary from "@/components/screen/employees/employeeSummary";
import EmployeeDialogs from "@/components/screen/employees/employeeDialogs";
import EmployeeActions from "@/components/screen/employees/employeeActions";

/**
 * Searching, sorting, filtering and paging are all done by the backend and
 * driven by the shared table, so this screen is only what is specific to
 * employees: the header, the summary cards, the row actions and the dialogs.
 */
function Employees() {
  const dispatch = useDispatch();
  const table = useEmployeeList();
  const { dialog, isCreating, createError } = useSelector(selectEmployeeDialogState);

  const openDialog = (type, employee) =>
    dispatch(employeeDialogOpened({ type, ...(employee && { employee }) }));

  const saveEmployee = async (values) => {
    if (dialog?.type === "edit") {
      dispatch(employeeUpdated({ ...values, id: dialog.employee.id }));
      dispatch(employeeDialogClosed());
      return;
    }

    try {
      // The slice closes the dialog on success; a failure keeps it open so the
      // error alert stays visible with the entered values intact.
      await dispatch(createEmployee(values)).unwrap();
      // The new row lives wherever the current sort puts it, so the list is
      // re-read rather than patched locally.
      table.refresh();
    } catch {
      // createError in the store already has a display-ready message.
    }
  };

  const deleteEmployee = () => {
    if (dialog?.employee?.id) {
      dispatch(employeeDeleted(dialog.employee.id));
    }

    dispatch(employeeDialogClosed());
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
        isSaving={isCreating}
        saveError={createError}
        onClose={() => dispatch(employeeDialogClosed())}
        onSave={saveEmployee}
        onDelete={deleteEmployee}
      />
    </main>
  );
}

export default Employees;
