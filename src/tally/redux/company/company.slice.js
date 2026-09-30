import { createSlice } from "@reduxjs/toolkit";

import { syncTallyCompanies } from "@Tally/redux/company/company.action";

const initialState = {
  response: null,
  status: "idle",
  error: null,
  errorTab: null,
  alertVisible: false,
  errorRequestId: null,
};

const tallyCompanySlice = createSlice({
  name: "tallyCompanies",
  initialState,
  reducers: {
    syncErrorAlertDismissed(state, action) {
      if (state.errorRequestId === action.payload) {
        state.alertVisible = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncTallyCompanies.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.errorTab = null;
        state.alertVisible = false;
        state.errorRequestId = null;
      })
      .addCase(syncTallyCompanies.fulfilled, (state, action) => {
        state.response = action.payload;
        state.status = "succeeded";
      })
      .addCase(syncTallyCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || action.error.message || "Unable to sync companies.";
        state.errorTab = action.meta.arg?.errorTab ?? null;
        state.alertVisible = Boolean(state.errorTab);
        state.errorRequestId = action.meta.requestId;
      });
  },
});

export const { syncErrorAlertDismissed } = tallyCompanySlice.actions;

export default tallyCompanySlice.reducer;
