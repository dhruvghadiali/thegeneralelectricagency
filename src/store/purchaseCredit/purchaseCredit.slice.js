import { createSlice } from "@reduxjs/toolkit";

import { PURCHASE_CREDIT_TABLE_DEFAULTS } from "@Tables/purchaseCredit/purchaseCreditTable.defaults";
import {
  createPurchaseCredit,
  fetchPurchaseCredits,
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
      });
  },
});

export const {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  purchaseCreditCreateCleared,
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
