import { useEffect } from "react";

import { QUOTATION_FORM_MODES } from "@Enums";
import CreateQuotationForm from "@screenComponent/quotations/form/createQuotationForm";
import useQuotationCompanySearch from "@screenComponent/quotations/form/companyInformation/hooks/useQuotationCompanySearch";
import QuotationExitDialog from "@screenComponent/quotations/dialogs/quotationExitDialog";
import { clearPreviousFieldKeyboardNavigation } from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";
import useQuotationPageKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/page/useQuotationPageKeyboardShortcut";
import useQuotationProductSearch from "@screenComponent/quotations/form/productInformation/hooks/useQuotationProductSearch";

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
        mode={QUOTATION_FORM_MODES.CREATE}
        open={exitDialog.isExitDialogOpen}
        onClose={exitDialog.closeExitDialog}
        onDiscard={exitDialog.discardAndExit}
        onKeep={exitDialog.keepAndExit}
      />
    </main>
  );
}

export default CreateQuotation;
