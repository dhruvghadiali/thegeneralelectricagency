import { createSlice } from "@reduxjs/toolkit";

import { CREATE_COMPANY_ERROR_MESSAGES } from "@Enums";
import { createCompany } from "@Redux/company/createCompany/createCompany.action";
import { createCompanyCreateState } from "@Redux/company/createCompany/createCompany.state";

const companyCreateSlice = createSlice({
  name: "companyCreate",
  initialState: createCompanyCreateState(),
  reducers: {
    companyCreateStateCleared() {
      return createCompanyCreateState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.isCreateCompanySubmitting = true;
        state.createCompanyError = null;
      })
      .addCase(createCompany.fulfilled, (state) => {
        state.isCreateCompanySubmitting = false;
        state.createCompanyError = null;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.isCreateCompanySubmitting = false;
        state.createCompanyError =
          action.payload ?? CREATE_COMPANY_ERROR_MESSAGES.create;
      });
  },
});

export const { companyCreateStateCleared } = companyCreateSlice.actions;

export default companyCreateSlice.reducer;
