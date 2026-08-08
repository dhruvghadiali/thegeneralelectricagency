import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { Card } from "@/components/ui/card";
import {
  employeeAdded,
  employeeDeleted,
  employeeDialogClosed,
  employeeDialogOpened,
  employeeRoleFilterChanged,
  employeeSearchChanged,
  employeeUpdated,
} from "@/store/employee/employee.slice";
import {
  fullName,
  roleLabel,
} from "@/components/screen/employees/employee.utils";

import EmployeeHeader from "@/components/screen/employees/employeeHeader";
import EmployeeSearch from "@/components/screen/employees/employeeSearch";
import EmployeeSummary from "@/components/screen/employees/employeeSummary";
import EmployeeDialogs from "@/components/screen/employees/employeeDialogs";
import EmployeeEmptyState from "@/components/screen/employees/employeeEmptyState";
import EmployeeMobileView from "@/components/screen/employees/employeeMobileView";
import EmployeeDesktopTable from "@/components/screen/employees/employeeDesktopTable";

function Employees() {
  const dispatch = useDispatch();
  const {
    items: employees,
    search,
    roleFilter,
    dialog,
  } = useSelector((state) => state.employees);

  const filteredEmployees = useMemo(
    () =>
      _.filter(employees, (employee) => {
        const searchableData =
          `${fullName(employee)} ${employee.username} ${employee.email} ${roleLabel(employee.role)}`.toLowerCase();
        return (
          searchableData.includes(search.trim().toLowerCase()) &&
          (roleFilter === "all" || employee.role === roleFilter)
        );
      }),
    [employees, roleFilter, search],
  );

  const saveEmployee = (values) => {
    if (dialog?.type === "edit") {
      dispatch(employeeUpdated({ ...values, id: dialog.employee.id }));
    } else {
      dispatch(employeeAdded(values));
    }
    dispatch(employeeDialogClosed());
  };

  const deleteEmployee = () => {
    if (dialog?.employee?.id) {
      dispatch(employeeDeleted(dialog.employee.id));
    }
    dispatch(employeeDialogClosed());
  };

  const openDialog = (type, employee) =>
    dispatch(employeeDialogOpened({ type, ...(employee && { employee }) }));
  const hasFilters = Boolean(search.trim()) || roleFilter !== "all";

  return (
    <main className="mx-auto w-full max-w-[1600px] space-y-6 pb-8">
      <EmployeeHeader onAddEmployee={() => openDialog("add")} />
      <EmployeeSummary employees={employees} />

      <Card className="gap-0 overflow-hidden shadow-none">
        <EmployeeSearch
          search={search}
          onSearchChange={(value) => dispatch(employeeSearchChanged(value))}
          roleFilter={roleFilter}
          onRoleFilterChange={(value) =>
            dispatch(employeeRoleFilterChanged(value))
          }
        />
        {filteredEmployees.length > 0 ? (
          <>
            <EmployeeDesktopTable
              employees={filteredEmployees}
              onEdit={(employee) => openDialog("edit", employee)}
              onDelete={(employee) => openDialog("delete", employee)}
            />
            <EmployeeMobileView
              employees={filteredEmployees}
              onEdit={(employee) => openDialog("edit", employee)}
              onDelete={(employee) => openDialog("delete", employee)}
            />
          </>
        ) : (
          <EmployeeEmptyState hasFilters={hasFilters} />
        )}
        <div className="border-t px-4 py-3 text-xs text-muted-foreground">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </Card>

      <EmployeeDialogs
        dialog={dialog}
        onClose={() => dispatch(employeeDialogClosed())}
        onSave={saveEmployee}
        onDelete={deleteEmployee}
      />
    </main>
  );
}

export default Employees;
