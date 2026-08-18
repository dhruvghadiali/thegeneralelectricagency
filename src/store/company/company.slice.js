import { createSlice } from "@reduxjs/toolkit";

import { COMPANY_TABLE_DEFAULTS } from "@Enums";
import {
  deleteCompany,
  fetchCompanies,
} from "@Redux/company/company.action";
import {
  createTableState,
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

const initialState = {
  ...createTableState({
    limit: COMPANY_TABLE_DEFAULTS.LIMIT,
    sort: COMPANY_TABLE_DEFAULTS.SORT,
    columnFilters: COMPANY_TABLE_DEFAULTS.FILTERS,
  }),
  selectedCompany: null,
  companyToDelete: null,
  isDeleting: false,
  deleteError: null,
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
    companyDeleteOpened(state, action) {
      state.companyToDelete = action.payload;
      state.deleteError = null;
    },
    companyDeleteClosed(state) {
      state.companyToDelete = null;
      state.deleteError = null;
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
      )
      .addCase(deleteCompany.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })
      .addCase(deleteCompany.fulfilled, (state) => {
        state.isDeleting = false;
        state.deleteError = null;
        state.companyToDelete = null;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteError = action.payload ?? "Unable to delete company.";
      });
  },
});

export const {
  columnFilterChanged,
  companyDeleteClosed,
  companyDeleteOpened,
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
