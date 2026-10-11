import { createSelector } from "@reduxjs/toolkit";
import { createTableSelectors } from "@Redux/factories/table.factory";

const selectPurchaseCreditState = (state) => state.purchaseCredits;

export const purchaseCreditTableSelectors = createTableSelectors(
  selectPurchaseCreditState,
);

export const selectSelectedPurchaseCredit = createSelector(
  selectPurchaseCreditState,
  (purchaseCredits) => purchaseCredits.selectedPurchaseCredit,
);

export const selectPurchaseCreditCreateState = createSelector(
  selectPurchaseCreditState,
  ({ isCreating, createError, createdPurchaseCredit }) => ({
    isCreating,
    createError,
    createdPurchaseCredit,
  }),
);

export const selectPurchaseCreditUpdateState = createSelector(
  selectPurchaseCreditState,
  ({ isUpdating, updateError, updatedPurchaseCredit }) => ({
    isUpdating,
    updateError,
    updatedPurchaseCredit,
  }),
);

export const selectPurchaseCreditPaymentUpdateState = createSelector(
  selectPurchaseCreditState,
  ({ updatingPaymentId, paymentUpdateError, updatedPayment }) => ({
    updatingPaymentId,
    paymentUpdateError,
    updatedPayment,
  }),
);

export const selectPurchaseCreditPaymentCreateState = createSelector(
  selectPurchaseCreditState,
  ({ creatingPaymentIndex, paymentCreateError, createdPayment }) => ({
    creatingPaymentIndex,
    paymentCreateError,
    createdPayment,
  }),
);

export const selectPurchaseCreditPaymentPlanningCreateState = createSelector(
  selectPurchaseCreditState,
  ({
    creatingPaymentPlanningIndex,
    paymentPlanningCreateError,
    createdPaymentPlanning,
  }) => ({
    creatingPaymentPlanningIndex,
    paymentPlanningCreateError,
    createdPaymentPlanning,
  }),
);

export const selectPurchaseCreditPaymentPlanningUpdateState = createSelector(
  selectPurchaseCreditState,
  ({
    updatingPaymentPlanningId,
    paymentPlanningUpdateError,
    updatedPaymentPlanning,
  }) => ({
    updatingPaymentPlanningId,
    paymentPlanningUpdateError,
    updatedPaymentPlanning,
  }),
);

export const selectPurchaseCreditPaymentPlanningCompletionState =
  createSelector(
    selectPurchaseCreditState,
    ({
      completingPaymentPlanningId,
      paymentPlanningCompletionError,
      completedPaymentPlanning,
    }) => ({
      completingPaymentPlanningId,
      paymentPlanningCompletionError,
      completedPaymentPlanning,
    }),
  );
