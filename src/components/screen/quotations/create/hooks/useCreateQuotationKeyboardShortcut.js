import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import { selectQuotationCurrentStep } from "@Redux/quotation/quotation.selector";
import { quotationStepChanged } from "@Redux/quotation/quotation.slice";
import { ROUTES } from "@routes/navigate";

function useCreateQuotationKeyboardShortcut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector(selectQuotationCurrentStep);

  useEffect(() => {
    const handleCreateQuotationShortcut = (event) => {
      if (event.key !== "Escape") return;
      if (event.defaultPrevented || event.target?.closest?.('[role="dialog"]')) {
        return;
      }

      event.preventDefault();

      if (currentStep === CREATE_QUOTATION_STEPS.QUOTATION_SUMMARY) {
        dispatch(
          quotationStepChanged(CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION),
        );
        return;
      }

      navigate(ROUTES.QUOTATIONS);
    };

    window.addEventListener("keydown", handleCreateQuotationShortcut);
    return () =>
      window.removeEventListener("keydown", handleCreateQuotationShortcut);
  }, [currentStep, dispatch, navigate]);
}

export default useCreateQuotationKeyboardShortcut;
