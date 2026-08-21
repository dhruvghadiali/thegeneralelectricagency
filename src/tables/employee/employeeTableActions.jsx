import { Pencil, RotateCcw, Trash2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { fullName } from "@Tables/employee/employeeTable.utils";

function EmployeeTableActions({ employee, onEdit, onDelete, onRestore }) {
  const employeeName = fullName(employee);
  const isInactive = !employee.isActive;

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(employee)}
        disabled={isInactive}
        aria-label={`Edit ${employeeName}`}
      >
        <Pencil className="size-4" />
      </Button>
      {isInactive ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRestore(employee)}
          aria-label={`Restore ${employeeName}`}
          title={`Restore ${employeeName}`}
          className="text-muted-foreground hover:text-primary"
        >
          <RotateCcw className="size-4" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(employee)}
          aria-label={`Delete ${employeeName}`}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      )}
    </div>
  );
}

export default EmployeeTableActions;
