import { createSlice } from "@reduxjs/toolkit";

import {
  deleteCompany,
  fetchCompanies,
  restoreCompany,
} from "@Redux/company/company.action";
import {
  createTableState,
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";

const COMPANY_DETAILS_FORM_INITIAL_STATE = {
  saveError: null,
  addressEdit: null,
  contactEdit: null,
  deletingAddressId: null,
  deletingContactId: null,
  updatingAddressId: null,
  updatingContactId: null,
  creatingAddressIndex: null,
  creatingContactKey: null,
};

const initialState = {
  ...createTableState({
    limit: COMPANY_TABLE_DEFAULTS.limit,
    sort: COMPANY_TABLE_DEFAULTS.sort,
    columnFilters: COMPANY_TABLE_DEFAULTS.filters,
  }),
  selectedCompany: null,
  companyToDelete: null,
  isDeleting: false,
  deleteError: null,
  companyToRestore: null,
  isRestoring: false,
  restoreError: null,
  directoryView: "companies",
  companyDetailsForm: { ...COMPANY_DETAILS_FORM_INITIAL_STATE },
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
    companyDirectoryViewChanged(state, action) {
      state.directoryView = action.payload;
    },
    companyDeleteOpened(state, action) {
      state.companyToDelete = action.payload;
      state.deleteError = null;
    },
    companyDeleteClosed(state) {
      state.companyToDelete = null;
      state.deleteError = null;
    },
    companyRestoreOpened(state, action) {
      state.companyToRestore = action.payload;
      state.restoreError = null;
    },
    companyRestoreClosed(state) {
      state.companyToRestore = null;
      state.restoreError = null;
    },
    companyDetailsFormChanged(state, action) {
      Object.assign(state.companyDetailsForm, action.payload);
    },
    companyDetailsFormReset(state) {
      state.companyDetailsForm = { ...COMPANY_DETAILS_FORM_INITIAL_STATE };
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
      })
      .addCase(restoreCompany.pending, (state) => {
        state.isRestoring = true;
        state.restoreError = null;
      })
      .addCase(restoreCompany.fulfilled, (state) => {
        state.isRestoring = false;
        state.restoreError = null;
        state.companyToRestore = null;
      })
      .addCase(restoreCompany.rejected, (state, action) => {
        state.isRestoring = false;
        state.restoreError = action.payload ?? "Unable to restore company.";
      });
  },
});

export const {
  columnFilterChanged,
  companyDeleteClosed,
  companyDeleteOpened,
  companyRestoreClosed,
  companyRestoreOpened,
  companyDirectoryViewChanged,
  companyDetailsClosed,
  companyDetailsFormChanged,
  companyDetailsFormReset,
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
