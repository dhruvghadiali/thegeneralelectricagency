import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import RestoreEmployeeForm from "@Forms/employee/restoreEmployee/restoreEmployeeForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";
import { fullName } from "@Tables/employee/employeeTable.utils";

function EmployeeRestoreDialog({
  dialog,
  isRestoring,
  error,
  onClose,
  onRestore,
}) {
  const isOpen = dialog?.type === "restore";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && !isRestoring && onClose()}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Restore employee?</DialogTitle>
          <DialogDescription>
            Enter your password to restore{" "}
            <span className="font-medium text-foreground">
              {dialog?.employee ? fullName(dialog.employee) : "this employee"}
            </span>
            .
          </DialogDescription>
        </DialogHeader>
        <FormErrorAlert message={error} />
        {isOpen && (
          <RestoreEmployeeForm
            key={dialog.employee?.id}
            onSubmit={onRestore}
            isSubmitting={isRestoring}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeRestoreDialog;
