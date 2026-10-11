import CreateQuotationForm from "@screenComponent/quotations/create/form/createQuotationForm";
import useCreateQuotationKeyboardShortcut from "@screenComponent/quotations/create/hooks/useCreateQuotationKeyboardShortcut";
import useQuotationCompanySearch from "@screenComponent/quotations/create/hooks/useQuotationCompanySearch";
import useQuotationProductSearch from "@screenComponent/quotations/create/hooks/useQuotationProductSearch";
import QuotationExitDialog from "@screenComponent/quotations/create/quotationExitDialog";

function CreateQuotation() {
  const exitDialog = useCreateQuotationKeyboardShortcut();
  useQuotationCompanySearch();
  useQuotationProductSearch();

  return (
    <main className="h-full min-h-0 w-full">
      <CreateQuotationForm />
      <QuotationExitDialog
        open={exitDialog.isExitDialogOpen}
        onClose={exitDialog.closeExitDialog}
        onNo={exitDialog.removeAndExit}
        onYes={exitDialog.saveAndExit}
      />
    </main>
  );
}

export default CreateQuotation;
