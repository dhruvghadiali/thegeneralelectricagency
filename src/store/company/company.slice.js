import { createSlice } from "@reduxjs/toolkit";

import { deleteCompany } from "@Redux/company/company.action";

const initialState = {
  selectedCompany: null,
  companyToDelete: null,
  isDeleting: false,
  deleteError: null,
  directoryView: "companies",
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
      });
  },
});

export const {
  companyDeleteClosed,
  companyDeleteOpened,
  companyDirectoryViewChanged,
  companyDetailsClosed,
  companyDetailsOpened,
} = companySlice.actions;

export default companySlice.reducer;
