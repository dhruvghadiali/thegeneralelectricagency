import { useEffect, useRef } from "react";

import useBackButtonKeyboardShortcut from "@screenComponent/quotations/create/hooks/quotationSummary/useBackButtonKeyboardShortcut";
import useBillToKeyboardShortcut from "@screenComponent/quotations/create/hooks/quotationSummary/useBillToKeyboardShortcut";
import useDeliveryNotesKeyboardShortcut from "@screenComponent/quotations/create/hooks/quotationSummary/useDeliveryNotesKeyboardShortcut";
import useFinalBillDetailsKeyboardShortcut from "@screenComponent/quotations/create/hooks/quotationSummary/useFinalBillDetailsKeyboardShortcut";
import useGstPercentageKeyboardShortcut from "@screenComponent/quotations/create/hooks/quotationSummary/useGstPercentageKeyboardShortcut";
import usePaymentNotesKeyboardShortcut from "@screenComponent/quotations/create/hooks/quotationSummary/usePaymentNotesKeyboardShortcut";
import useProductsKeyboardShortcut from "@screenComponent/quotations/create/hooks/quotationSummary/useProductsKeyboardShortcut";
import useSubmitButtonKeyboardShortcut from "@screenComponent/quotations/create/hooks/quotationSummary/useSubmitButtonKeyboardShortcut";
import useTaxTreatmentKeyboardShortcut from "@screenComponent/quotations/create/hooks/quotationSummary/useTaxTreatmentKeyboardShortcut";

function useQuotationSummaryKeyboardShortcuts() {
  const taxTreatmentRef = useRef(null);
  const gstPercentageRef = useRef(null);
  const deliveryNotesRef = useRef(null);
  const paymentNotesRef = useRef(null);
  const billToRef = useRef(null);
  const productsRef = useRef(null);
  const finalBillDetailsRef = useRef(null);
  const backButtonRef = useRef(null);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    taxTreatmentRef.current?.focus();
  }, []);

  const handleTaxTreatmentKeyDown = useTaxTreatmentKeyboardShortcut({
    gstPercentageRef,
  });
  const handleGstPercentageKeyDown = useGstPercentageKeyboardShortcut({
    deliveryNotesRef,
    taxTreatmentRef,
  });
  const handleDeliveryNotesKeyDown = useDeliveryNotesKeyboardShortcut({
    gstPercentageRef,
    paymentNotesRef,
  });
  const handlePaymentNotesKeyDown = usePaymentNotesKeyboardShortcut({
    billToRef,
    deliveryNotesRef,
  });
  const handleBillToKeyDown = useBillToKeyboardShortcut({
    paymentNotesRef,
    productsRef,
  });
  const handleProductsKeyDown = useProductsKeyboardShortcut({
    billToRef,
    finalBillDetailsRef,
  });
  const handleFinalBillDetailsKeyDown =
    useFinalBillDetailsKeyboardShortcut({
      backButtonRef,
      productsRef,
    });
  const handleBackButtonKeyDown = useBackButtonKeyboardShortcut({
    finalBillDetailsRef,
    submitButtonRef,
  });
  const handleSubmitButtonKeyDown = useSubmitButtonKeyboardShortcut({
    backButtonRef,
    taxTreatmentRef,
  });

  return {
    refs: {
      taxTreatmentRef,
      gstPercentageRef,
      deliveryNotesRef,
      paymentNotesRef,
      billToRef,
      productsRef,
      finalBillDetailsRef,
      backButtonRef,
      submitButtonRef,
    },
    handleTaxTreatmentKeyDown,
    handleGstPercentageKeyDown,
    handleDeliveryNotesKeyDown,
    handlePaymentNotesKeyDown,
    handleBillToKeyDown,
    handleProductsKeyDown,
    handleFinalBillDetailsKeyDown,
    handleBackButtonKeyDown,
    handleSubmitButtonKeyDown,
  };
}

export default useQuotationSummaryKeyboardShortcuts;
