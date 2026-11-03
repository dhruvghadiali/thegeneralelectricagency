import { createSlice } from "@reduxjs/toolkit";

import {
  deleteCompany,
  restoreCompany,
} from "@Redux/company/company.action";

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
  statePickerAddressIndex: null,
  stateSearch: "",
};

const initialState = {
  selectedCompany: null,
  companyToDelete: null,
  isDeleting: false,
  deleteError: null,
  companyToRestore: null,
  isRestoring: false,
  restoreError: null,
  directoryView: "companies",
  companyDetailsForm: { ...COMPANY_DETAILS_FORM_INITIAL_STATE },
};

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
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
  companyDeleteClosed,
  companyDeleteOpened,
  companyRestoreClosed,
  companyRestoreOpened,
  companyDirectoryViewChanged,
  companyDetailsClosed,
  companyDetailsFormChanged,
  companyDetailsFormReset,
  companyDetailsOpened,
} = companySlice.actions;

export default companySlice.reducer;
