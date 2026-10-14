import { useEffect } from "react";

import CreateQuotationForm from "@screenComponent/quotations/create/form/createQuotationForm";
import useQuotationCompanySearch from "@screenComponent/quotations/create/hooks/useQuotationCompanySearch";
import { clearPreviousFieldKeyboardNavigation } from "@screenComponent/quotations/hooks/handlePreviousFieldKeyboardNavigation";
import useQuotationPageKeyboardShortcut from "@screenComponent/quotations/hooks/useQuotationPageKeyboardShortcut";
import useQuotationProductSearch from "@screenComponent/quotations/hooks/useQuotationProductSearch";
import QuotationExitDialog from "@screenComponent/quotations/create/quotationExitDialog";

function CreateQuotation() {
  const exitDialog = useQuotationPageKeyboardShortcut();
  useQuotationCompanySearch();
  useQuotationProductSearch();

  useEffect(
    () => () => {
      clearPreviousFieldKeyboardNavigation();
    },
    [],
  );

  return (
    <main className="h-full min-h-0 w-full">
      <CreateQuotationForm />
      <QuotationExitDialog
        open={exitDialog.isExitDialogOpen}
        onClose={exitDialog.closeExitDialog}
        onNo={exitDialog.discardAndExit}
        onYes={exitDialog.keepAndExit}
      />
    </main>
  );
}

export default CreateQuotation;
