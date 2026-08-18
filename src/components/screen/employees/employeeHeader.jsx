import { Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function EmployeeHeader({ onAddEmployee }) {
  return (
    <header className="flex justify-end">
      <h1 className="sr-only">Employees</h1>
      <Button onClick={onAddEmployee} className="w-full sm:w-auto">
        <Plus className="size-4" />
        Add employee
      </Button>
    </header>
  );
}

export default EmployeeHeader;
