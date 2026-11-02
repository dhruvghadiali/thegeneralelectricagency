import { createSlice } from "@reduxjs/toolkit";

import { TABLE_DEFAULTS } from "@Enums";
import { fetchSystemCompanies } from "@Redux/company/systemCompanies/systemCompanies.action";
import { createSystemCompaniesState } from "@Redux/company/systemCompanies/systemCompanies.state";

const systemCompaniesSlice = createSlice({
  name: "systemCompanies",
  initialState: createSystemCompaniesState(),
  reducers: {
    systemCompanySelected(state, action) {
      state.selectedCompany = action.payload;
    },
    systemCompanyPageChanged(state, action) {
      state.page = action.payload;
    },
    systemCompanySearchChanged(state, action) {
      state.search = action.payload;
      state.page = TABLE_DEFAULTS.PAGE;
    },
    systemCompaniesReset() {
      return createSystemCompaniesState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemCompanies.pending, (state, action) => {
        state.requestId = action.meta.requestId;
        state.isLoading = true;
        state.error = null;

        if (action.meta.arg.page === TABLE_DEFAULTS.PAGE) {
          state.items = [];
        }
      })
      .addCase(fetchSystemCompanies.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;

        if (action.payload.pagination.page === TABLE_DEFAULTS.PAGE) {
          state.items = action.payload.items;
        } else {
          const uniqueCompanies = new Map(
            [...state.items, ...action.payload.items].map((company) => [
              company.id,
              company,
            ]),
          );
          state.items = [...uniqueCompanies.values()];
        }

        state.pagination = action.payload.pagination;
        state.isLoading = false;
        state.error = null;
        state.requestId = null;
      })
      .addCase(fetchSystemCompanies.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;

        state.isLoading = false;
        state.error = action.meta.aborted
          ? null
          : (action.payload ?? "Unable to load system companies. Try again.");
        state.requestId = null;
      });
  },
});

export const {
  systemCompaniesReset,
  systemCompanyPageChanged,
  systemCompanySearchChanged,
  systemCompanySelected,
} = systemCompaniesSlice.actions;

export default systemCompaniesSlice.reducer;
