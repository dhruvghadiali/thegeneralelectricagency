import { createSlice } from "@reduxjs/toolkit";

import { COMPANY_TABLE_DEFAULTS } from "@Enums";
import { fetchCompanies } from "@Redux/company/company.action";
import {
  createTableState,
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

const initialState = {
  ...createTableState({
    limit: COMPANY_TABLE_DEFAULTS.LIMIT,
    sort: COMPANY_TABLE_DEFAULTS.SORT,
  }),
  selectedCompany: null,
  summary: {
    totalCompanies: 0,
    activeCompanies: 0,
    inactiveCompanies: 0,
  },
};

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    ...TABLE_REDUCERS,
    companyDetailsOpened(state, action) {
      state.selectedCompany = action.payload;
    },
    companyDetailsClosed(state) {
      state.selectedCompany = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, tableFetchCases.pending)
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        tableFetchCases.fulfilled(state, action);
        state.summary = action.payload.summary;
      })
      .addCase(fetchCompanies.rejected, (state, action) =>
        tableFetchCases.rejected(state, action, "Unable to load companies."),
      );
  },
});

export const {
  columnFilterChanged,
  companyDetailsClosed,
  companyDetailsOpened,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
} = companySlice.actions;

export const companyTableActions = {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
};

export default companySlice.reducer;
