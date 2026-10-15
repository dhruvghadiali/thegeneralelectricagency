import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBlocker, useNavigate } from "react-router-dom";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import {
  selectQuotationCurrentStep,
  selectQuotationExitDialog,
  selectQuotationSubmission,
} from "@Redux/quotation/quotation.selector";
import {
  quotationExitCancelled,
  quotationExitRequested,
  quotationReset,
  quotationStepChanged,
} from "@Redux/quotation/quotation.slice";
import { ROUTES } from "@routes/navigate";
import { addQuotationKeyboardListener } from "@screenComponent/quotations/keyboardShortcuts/shared/quotationKeyboardListener";

function useQuotationPageKeyboardShortcut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector(selectQuotationCurrentStep);
  const isExitDialogOpen = useSelector(selectQuotationExitDialog);
  const { isSuccessful } = useSelector(selectQuotationSubmission);
  const completedQuotationRef = useRef(false);
  const shouldBlockNavigation = useCallback(
    ({ currentLocation, nextLocation }) =>
      !isSuccessful &&
      (currentLocation.pathname !== nextLocation.pathname ||
        currentLocation.search !== nextLocation.search ||
        currentLocation.hash !== nextLocation.hash),
    [isSuccessful],
  );
  const blocker = useBlocker(shouldBlockNavigation);

  useEffect(() => {
    if (!isSuccessful) return;

    completedQuotationRef.current = true;
    navigate(ROUTES.QUOTATIONS, { replace: true });
  }, [isSuccessful, navigate]);

  useEffect(
    () => () => {
      if (completedQuotationRef.current) {
        dispatch(quotationReset());
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      dispatch(quotationExitRequested());
    }
  }, [blocker.state, dispatch]);

  const closeExitDialog = useCallback(() => {
    dispatch(quotationExitCancelled());
    if (blocker.state === "blocked") blocker.reset();
  }, [blocker, dispatch]);

  const keepAndExit = useCallback(() => {
    dispatch(quotationExitCancelled());
    if (blocker.state === "blocked") blocker.proceed();
  }, [blocker, dispatch]);

  const discardAndExit = useCallback(() => {
    dispatch(quotationReset());
    if (blocker.state === "blocked") blocker.proceed();
  }, [blocker, dispatch]);

  useEffect(() => {
    const handleQuotationShortcut = (event) => {
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

    return addQuotationKeyboardListener(handleQuotationShortcut);
  }, [currentStep, dispatch, navigate]);

  return {
    closeExitDialog,
    discardAndExit,
    isExitDialogOpen,
    keepAndExit,
  };
}

export default useQuotationPageKeyboardShortcut;
