import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import AddEmployeeForm from "@Forms/employee/addEmployee/addEmployeeForm";
import { ADD_EMPLOYEE_INITIAL_VALUES } from "@Forms/employee/addEmployee/addEmployee.initialValues";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";

function EmployeeFormDialog({ dialog, isSaving, error, onClose, onSave }) {
  const isOpen = dialog?.type === "add" || dialog?.type === "edit";
  const isEditing = dialog?.type === "edit";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit employee" : "Add new employee"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update this employee's details and access role."
              : "Enter the details below to add someone to your team."}
          </DialogDescription>
        </DialogHeader>
        {isOpen && (
          <>
            <FormErrorAlert message={error} />
            <AddEmployeeForm
              key={`${dialog.type}-${dialog.employee?.id ?? "new"}`}
              employee={dialog.employee ?? ADD_EMPLOYEE_INITIAL_VALUES}
              onSubmit={onSave}
              isSubmitting={isSaving}
              submitLabel={isEditing ? "Save changes" : "Add employee"}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeFormDialog;
