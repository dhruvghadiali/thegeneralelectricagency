import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { selectQuotationEditingId } from "@Redux/quotation/quotation.selector";
import { quotationEditingStarted } from "@Redux/quotation/quotation.slice";
import { clearPreviousFieldKeyboardNavigation } from "@screenComponent/quotations/hooks/handlePreviousFieldKeyboardNavigation";
import useQuotationPageKeyboardShortcut from "@screenComponent/quotations/hooks/useQuotationPageKeyboardShortcut";
import useQuotationProductSearch from "@screenComponent/quotations/hooks/useQuotationProductSearch";
import EditQuotationExitDialog from "@screenComponent/quotations/edit/editQuotationExitDialog";
import EditQuotationForm from "@screenComponent/quotations/edit/editQuotationForm";

function EditQuotation({ quotation }) {
  const dispatch = useDispatch();
  const editingQuotationId = useSelector(selectQuotationEditingId);
  const hydratedQuotationIdRef = useRef(null);
  const exitDialog = useQuotationPageKeyboardShortcut();
  useQuotationProductSearch();

  useEffect(() => {
    if (!quotation) return;

    const quotationId = String(quotation.id ?? "");

    if (hydratedQuotationIdRef.current === quotationId) return;

    hydratedQuotationIdRef.current = quotationId;
    dispatch(quotationEditingStarted(quotation));
  }, [dispatch, quotation]);

  useEffect(
    () => () => {
      clearPreviousFieldKeyboardNavigation();
    },
    [],
  );

  const isWaitingForQuotation =
    String(editingQuotationId ?? "") !== String(quotation?.id ?? "");

  if (isWaitingForQuotation) {
    return (
      <main
        className="flex h-full min-h-0 w-full items-center justify-center"
        aria-live="polite"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Loading quotation…
        </div>
      </main>
    );
  }

  return (
    <main className="h-full min-h-0 w-full">
      <EditQuotationForm />
      <EditQuotationExitDialog
        open={exitDialog.isExitDialogOpen}
        onClose={exitDialog.closeExitDialog}
        onDiscard={exitDialog.discardAndExit}
        onKeep={exitDialog.keepAndExit}
      />
    </main>
  );
}

export default EditQuotation;
