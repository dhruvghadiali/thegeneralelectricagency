import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fullName } from "@/components/screen/employees/employee.utils";
import { EMPLOYEE_INITIAL_VALUES } from "@/forms/employee/employee.initialValues";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EmployeeForm from "@/components/screen/employees/employeeForm";

function EmployeeDialogs({ dialog, onClose, onSave, onDelete }) {
  const isFormOpen = dialog?.type === "add" || dialog?.type === "edit";

  return (
    <>
      <Dialog open={isFormOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialog?.type === "edit" ? "Edit employee" : "Add new employee"}
            </DialogTitle>
            <DialogDescription>
              {dialog?.type === "edit"
                ? "Update this employee's details and access role."
                : "Enter the details below to add someone to your team."}
            </DialogDescription>
          </DialogHeader>
          {isFormOpen && (
            <EmployeeForm
              key={`${dialog.type}-${dialog.employee?.id ?? "new"}`}
              employee={dialog.employee ?? EMPLOYEE_INITIAL_VALUES}
              onSubmit={onSave}
              submitLabel={
                dialog.type === "edit" ? "Save changes" : "Add employee"
              }
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={dialog?.type === "delete"}
        onOpenChange={(open) => !open && onClose()}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete employee?</DialogTitle>
            <DialogDescription>
              This will permanently remove{" "}
              <span className="font-medium text-foreground">
                {dialog?.employee ? fullName(dialog.employee) : "this employee"}
              </span>{" "}
              from the employee directory. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={onDelete}>
              <Trash2 className="size-4" /> Delete employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EmployeeDialogs;
