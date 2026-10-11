import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBlocker, useNavigate } from "react-router-dom";

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
  const isExitDialogOpen = useSelector(selectQuotationExitDialog);
  const shouldBlockNavigation = useCallback(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname ||
      currentLocation.search !== nextLocation.search ||
      currentLocation.hash !== nextLocation.hash,
    [],
  );
  const blocker = useBlocker(shouldBlockNavigation);

  useEffect(() => {
    if (blocker.state === "blocked") {
      dispatch(quotationExitRequested());
    }
  }, [blocker.state, dispatch]);

  const closeExitDialog = useCallback(() => {
    dispatch(quotationExitCancelled());
    if (blocker.state === "blocked") blocker.reset();
  }, [blocker, dispatch]);

  const saveAndExit = useCallback(() => {
    dispatch(quotationExitCancelled());
    if (blocker.state === "blocked") blocker.proceed();
  }, [blocker, dispatch]);

  const removeAndExit = useCallback(() => {
    dispatch(quotationReset());
    if (blocker.state === "blocked") blocker.proceed();
  }, [blocker, dispatch]);

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

  return {
    closeExitDialog,
    isExitDialogOpen,
    removeAndExit,
    saveAndExit,
  };
}

export default useCreateQuotationKeyboardShortcut;
