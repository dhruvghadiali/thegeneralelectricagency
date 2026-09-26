import { createSlice } from "@reduxjs/toolkit";

import { syncTallyCompanies } from "@Tally/redux/company/company.action";

const initialState = {
  response: null,
  status: "idle",
  error: null,
};

const tallyCompanySlice = createSlice({
  name: "tallyCompanies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncTallyCompanies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(syncTallyCompanies.fulfilled, (state, action) => {
        state.response = action.payload;
        state.status = "succeeded";
      })
      .addCase(syncTallyCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || action.error.message || "Unable to sync companies.";
      });
  },
});

export default tallyCompanySlice.reducer;
