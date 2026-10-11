import { createSlice } from "@reduxjs/toolkit";

import { PURCHASE_CREDIT_TABLE_DEFAULTS } from "@Tables/purchaseCredit/purchaseCreditTable.defaults";
import {
  createPurchaseCredit,
  completePurchaseCreditPaymentPlanning,
  createPurchaseCreditPayment,
  createPurchaseCreditPaymentPlanning,
  fetchPurchaseCredits,
  updatePurchaseCredit,
  updatePurchaseCreditPayment,
  updatePurchaseCreditPaymentPlanning,
} from "@Redux/purchaseCredit/purchaseCredit.action";
import {
  createTableState,
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

const initialState = {
  ...createTableState({
    limit: PURCHASE_CREDIT_TABLE_DEFAULTS.limit,
    sort: PURCHASE_CREDIT_TABLE_DEFAULTS.sort,
    columnFilters: PURCHASE_CREDIT_TABLE_DEFAULTS.filters,
  }),
  isCreating: false,
  createError: null,
  createdPurchaseCredit: null,
  isUpdating: false,
  updateError: null,
  updatedPurchaseCredit: null,
  updatingPaymentId: null,
  paymentUpdateError: null,
  updatedPayment: null,
  creatingPaymentIndex: null,
  paymentCreateError: null,
  createdPayment: null,
  creatingPaymentPlanningIndex: null,
  paymentPlanningCreateError: null,
  createdPaymentPlanning: null,
  updatingPaymentPlanningId: null,
  paymentPlanningUpdateError: null,
  updatedPaymentPlanning: null,
  completingPaymentPlanningId: null,
  paymentPlanningCompletionError: null,
  completedPaymentPlanning: null,
  selectedPurchaseCredit: null,
};

const purchaseCreditSlice = createSlice({
  name: "purchaseCredits",
  initialState,
  reducers: {
    ...TABLE_REDUCERS,
    purchaseCreditCreateCleared(state) {
      state.isCreating = false;
      state.createError = null;
      state.createdPurchaseCredit = null;
    },
    purchaseCreditUpdateCleared(state) {
      state.isUpdating = false;
      state.updateError = null;
      state.updatedPurchaseCredit = null;
    },
    purchaseCreditPaymentUpdateCleared(state) {
      state.updatingPaymentId = null;
      state.paymentUpdateError = null;
      state.updatedPayment = null;
    },
    purchaseCreditPaymentCreateCleared(state) {
      state.creatingPaymentIndex = null;
      state.paymentCreateError = null;
      state.createdPayment = null;
    },
    purchaseCreditPaymentPlanningCreateCleared(state) {
      state.creatingPaymentPlanningIndex = null;
      state.paymentPlanningCreateError = null;
      state.createdPaymentPlanning = null;
    },
    purchaseCreditPaymentPlanningUpdateCleared(state) {
      state.updatingPaymentPlanningId = null;
      state.paymentPlanningUpdateError = null;
      state.updatedPaymentPlanning = null;
    },
    purchaseCreditPaymentPlanningCompletionCleared(state) {
      state.completingPaymentPlanningId = null;
      state.paymentPlanningCompletionError = null;
      state.completedPaymentPlanning = null;
    },
    purchaseCreditDetailsOpened(state, action) {
      state.selectedPurchaseCredit = action.payload;
    },
    purchaseCreditDetailsClosed(state) {
      state.selectedPurchaseCredit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseCredits.pending, tableFetchCases.pending)
      .addCase(fetchPurchaseCredits.fulfilled, tableFetchCases.fulfilled)
      .addCase(fetchPurchaseCredits.rejected, (state, action) =>
        tableFetchCases.rejected(
          state,
          action,
          "Unable to load purchase credits.",
        ),
      )
      .addCase(createPurchaseCredit.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
        state.createdPurchaseCredit = null;
      })
      .addCase(createPurchaseCredit.fulfilled, (state, action) => {
        state.isCreating = false;
        state.createError = null;
        state.createdPurchaseCredit = action.payload;
      })
      .addCase(createPurchaseCredit.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.payload ?? "Unable to add purchase credit.";
        state.createdPurchaseCredit = null;
      })
      .addCase(updatePurchaseCredit.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
        state.updatedPurchaseCredit = null;
      })
      .addCase(updatePurchaseCredit.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.updateError = null;
        state.updatedPurchaseCredit = action.payload;
      })
      .addCase(updatePurchaseCredit.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError =
          action.payload ?? "Unable to update purchase credit.";
        state.updatedPurchaseCredit = null;
      })
      .addCase(updatePurchaseCreditPayment.pending, (state, action) => {
        state.updatingPaymentId = action.meta.arg.paymentId;
        state.paymentUpdateError = null;
        state.updatedPayment = null;
      })
      .addCase(updatePurchaseCreditPayment.fulfilled, (state, action) => {
        state.updatingPaymentId = null;
        state.paymentUpdateError = null;
        state.updatedPayment = action.payload;
      })
      .addCase(updatePurchaseCreditPayment.rejected, (state, action) => {
        state.updatingPaymentId = null;
        state.paymentUpdateError =
          action.payload ?? "Unable to update the payment status.";
        state.updatedPayment = null;
      })
      .addCase(createPurchaseCreditPayment.pending, (state, action) => {
        state.creatingPaymentIndex = action.meta.arg.paymentIndex;
        state.paymentCreateError = null;
        state.createdPayment = null;
      })
      .addCase(createPurchaseCreditPayment.fulfilled, (state, action) => {
        state.creatingPaymentIndex = null;
        state.paymentCreateError = null;
        state.createdPayment = action.payload;
      })
      .addCase(createPurchaseCreditPayment.rejected, (state, action) => {
        state.creatingPaymentIndex = null;
        state.paymentCreateError =
          action.payload ?? "Unable to add the payment.";
        state.createdPayment = null;
      })
      .addCase(
        createPurchaseCreditPaymentPlanning.pending,
        (state, action) => {
          state.creatingPaymentPlanningIndex =
            action.meta.arg.paymentPlanningIndex;
          state.paymentPlanningCreateError = null;
          state.createdPaymentPlanning = null;
        },
      )
      .addCase(
        createPurchaseCreditPaymentPlanning.fulfilled,
        (state, action) => {
          state.creatingPaymentPlanningIndex = null;
          state.paymentPlanningCreateError = null;
          state.createdPaymentPlanning = action.payload;
        },
      )
      .addCase(
        createPurchaseCreditPaymentPlanning.rejected,
        (state, action) => {
          state.creatingPaymentPlanningIndex = null;
          state.paymentPlanningCreateError =
            action.payload ?? "Unable to add the payment plan.";
          state.createdPaymentPlanning = null;
        },
      )
      .addCase(
        updatePurchaseCreditPaymentPlanning.pending,
        (state, action) => {
          state.updatingPaymentPlanningId =
            action.meta.arg.paymentPlanningId;
          state.paymentPlanningUpdateError = null;
          state.updatedPaymentPlanning = null;
        },
      )
      .addCase(
        updatePurchaseCreditPaymentPlanning.fulfilled,
        (state, action) => {
          state.updatingPaymentPlanningId = null;
          state.paymentPlanningUpdateError = null;
          state.updatedPaymentPlanning = action.payload;
        },
      )
      .addCase(
        updatePurchaseCreditPaymentPlanning.rejected,
        (state, action) => {
          state.updatingPaymentPlanningId = null;
          state.paymentPlanningUpdateError =
            action.payload ?? "Unable to update the payment plan.";
          state.updatedPaymentPlanning = null;
        },
      )
      .addCase(
        completePurchaseCreditPaymentPlanning.pending,
        (state, action) => {
          state.completingPaymentPlanningId =
            action.meta.arg.paymentPlanningId;
          state.paymentPlanningCompletionError = null;
          state.completedPaymentPlanning = null;
        },
      )
      .addCase(
        completePurchaseCreditPaymentPlanning.fulfilled,
        (state, action) => {
          state.completingPaymentPlanningId = null;
          state.paymentPlanningCompletionError = null;
          state.completedPaymentPlanning = action.payload;
        },
      )
      .addCase(
        completePurchaseCreditPaymentPlanning.rejected,
        (state, action) => {
          state.completingPaymentPlanningId = null;
          state.paymentPlanningCompletionError =
            action.payload ?? "Unable to complete the payment plan.";
          state.completedPaymentPlanning = null;
        },
      );
  },
});

export const {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  purchaseCreditCreateCleared,
  purchaseCreditPaymentCreateCleared,
  purchaseCreditPaymentPlanningCreateCleared,
  purchaseCreditPaymentPlanningCompletionCleared,
  purchaseCreditPaymentPlanningUpdateCleared,
  purchaseCreditPaymentUpdateCleared,
  purchaseCreditUpdateCleared,
  purchaseCreditDetailsClosed,
  purchaseCreditDetailsOpened,
  searchChanged,
  searchCommitted,
  sortChanged,
} = purchaseCreditSlice.actions;

export const purchaseCreditTableActions = {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
};

export default purchaseCreditSlice.reducer;
