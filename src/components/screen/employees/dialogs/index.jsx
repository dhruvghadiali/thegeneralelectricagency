import EmployeeDeleteDialog from "@screenComponent/employees/dialogs/employeeDeleteDialog";
import EmployeeFormDialog from "@screenComponent/employees/dialogs/employeeFormDialog";
import EmployeeRestoreDialog from "@screenComponent/employees/dialogs/employeeRestoreDialog";

function EmployeeDialogs({
  dialog,
  isSaving,
  saveError,
  isRestoring,
  restoreError,
  isDeleting,
  deleteError,
  onClose,
  onSave,
  onRestore,
  onDelete,
}) {
  return (
    <>
      <EmployeeFormDialog
        dialog={dialog}
        isSaving={isSaving}
        error={saveError}
        onClose={onClose}
        onSave={onSave}
      />
      <EmployeeRestoreDialog
        dialog={dialog}
        isRestoring={isRestoring}
        error={restoreError}
        onClose={onClose}
        onRestore={onRestore}
      />
      <EmployeeDeleteDialog
        dialog={dialog}
        isDeleting={isDeleting}
        error={deleteError}
        onClose={onClose}
        onDelete={onDelete}
      />
    </>
  );
}

export default EmployeeDialogs;
