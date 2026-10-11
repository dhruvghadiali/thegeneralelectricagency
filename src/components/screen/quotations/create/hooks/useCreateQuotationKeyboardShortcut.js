import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import {
  selectQuotationCurrentStep,
  selectQuotationExitDialog,
} from "@Redux/quotation/quotation.selector";
import {
  quotationExitCancelled,
  quotationExitRequested,
  quotationReset,
  quotationStepChanged,
} from "@Redux/quotation/quotation.slice";
import { ROUTES } from "@routes/navigate";

function useCreateQuotationKeyboardShortcut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector(selectQuotationCurrentStep);
  const exitDialog = useSelector(selectQuotationExitDialog);

  const closeExitDialog = useCallback(() => {
    dispatch(quotationExitCancelled());
  }, [dispatch]);

  const saveAndExit = useCallback(() => {
    const destination = exitDialog.pendingRoute ?? ROUTES.QUOTATIONS;

    dispatch(quotationExitCancelled());
    navigate(destination);
  }, [dispatch, exitDialog.pendingRoute, navigate]);

  const removeAndExit = useCallback(() => {
    const destination = exitDialog.pendingRoute ?? ROUTES.QUOTATIONS;

    dispatch(quotationReset());
    navigate(destination);
  }, [dispatch, exitDialog.pendingRoute, navigate]);

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

      dispatch(quotationExitRequested(ROUTES.QUOTATIONS));
    };

    window.addEventListener("keydown", handleCreateQuotationShortcut);
    return () =>
      window.removeEventListener("keydown", handleCreateQuotationShortcut);
  }, [currentStep, dispatch]);

  return {
    closeExitDialog,
    isExitDialogOpen: exitDialog.isOpen,
    removeAndExit,
    saveAndExit,
  };
}

export default useCreateQuotationKeyboardShortcut;
