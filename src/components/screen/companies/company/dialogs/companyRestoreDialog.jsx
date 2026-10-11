import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import RestoreCompanyForm from "@Forms/company/restoreCompany/restoreCompanyForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";

function CompanyRestoreDialog({
  company,
  isRestoring,
  error,
  onClose,
  onRestore,
}) {
  return (
    <Dialog
      open={Boolean(company)}
      onOpenChange={(open) => !open && !isRestoring && onClose()}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Restore company?</DialogTitle>
          <DialogDescription>
            Enter your password to restore{" "}
            <span className="font-medium text-foreground">
              {company?.name ?? "this company"}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <FormErrorAlert message={error} />
        {company && (
          <RestoreCompanyForm
            key={company.id}
            onSubmit={onRestore}
            isSubmitting={isRestoring}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CompanyRestoreDialog;
