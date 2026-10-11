import { Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import EmployeeSummaryPopover from "@screenComponent/employees/header/employeeSummaryPopover";

function EmployeeHeader({ onAddEmployee }) {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <h1 className="sr-only">Employees</h1>
      <EmployeeSummaryPopover />
      <Button onClick={onAddEmployee} className="w-full sm:w-auto">
        <Plus className="size-4" />
        Add employee
      </Button>
    </header>
  );
}

export default EmployeeHeader;
