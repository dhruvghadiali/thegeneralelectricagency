import { QUOTATION_FORM_MODES } from "@Enums";
import QuotationExitDialog from "@screenComponent/quotations/dialogs/quotationExitDialog";
import EditQuotationLoading from "@screenComponent/quotations/edit/editQuotationLoading";
import useEditQuotation from "@screenComponent/quotations/edit/hooks/useEditQuotation";
import EditQuotationForm from "@screenComponent/quotations/form/editQuotationForm";

function EditQuotation({ quotation }) {
  const { exitDialog, isWaitingForQuotation } = useEditQuotation(quotation);

  if (isWaitingForQuotation) return <EditQuotationLoading />;

  return (
    <main className="h-full min-h-0 w-full">
      <EditQuotationForm />
      <QuotationExitDialog
        mode={QUOTATION_FORM_MODES.EDIT}
        open={exitDialog.isExitDialogOpen}
        onClose={exitDialog.closeExitDialog}
        onDiscard={exitDialog.discardAndExit}
      />
    </main>
  );
}

export default EditQuotation;
