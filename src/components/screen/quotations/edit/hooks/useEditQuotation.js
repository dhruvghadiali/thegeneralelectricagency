import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectQuotationEditingId } from "@Redux/quotation/quotation.selector";
import { quotationEditingStarted } from "@Redux/quotation/quotation.slice";
import useQuotationProductSearch from "@screenComponent/quotations/form/productInformation/hooks/useQuotationProductSearch";
import useQuotationPageKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/page/useQuotationPageKeyboardShortcut";
import { clearPreviousFieldKeyboardNavigation } from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useEditQuotation(quotation) {
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

  return {
    exitDialog,
    isWaitingForQuotation:
      String(editingQuotationId ?? "") !== String(quotation?.id ?? ""),
  };
}

export default useEditQuotation;
