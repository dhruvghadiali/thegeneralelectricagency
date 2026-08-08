import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fullName } from "@/components/screen/employees/employee.utils";

function EmployeeActions({ employee, onEdit, onDelete }) {
  const employeeName = fullName(employee);

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(employee)}
        aria-label={`Edit ${employeeName}`}
      >
        <Pencil className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(employee)}
        aria-label={`Delete ${employeeName}`}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}

export default EmployeeActions;
