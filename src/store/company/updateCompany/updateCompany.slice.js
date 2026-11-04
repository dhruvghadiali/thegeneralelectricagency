import { createSlice } from "@reduxjs/toolkit";

import { UPDATE_COMPANY_ERROR_MESSAGES } from "@Enums";
import { updateCompanyInformation } from "@Redux/company/updateCompany/updateCompany.action";
import {
  createCompanyUpdateFormValues,
  createCompanyUpdateState,
} from "@Redux/company/updateCompany/updateCompany.state";

const companyUpdateSlice = createSlice({
  name: "companyUpdate",
  initialState: createCompanyUpdateState(),
  reducers: {
    companyUpdateCompanyIdSet(state, action) {
      state.companyId = action.payload;
    },
    companyUpdateAddressIdSet(state, action) {
      state.addressId = action.payload;
    },
    companyUpdateFormValuesSet(state, action) {
      state.formValues = {
        ...createCompanyUpdateFormValues(),
        ...action.payload,
      };
    },
    companyUpdateStateCleared() {
      return createCompanyUpdateState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCompanyInformation.pending, (state) => {
        state.isUpdateCompanySubmitting = true;
        state.updateCompanyError = null;
      })
      .addCase(updateCompanyInformation.fulfilled, (state) => {
        state.isUpdateCompanySubmitting = false;
        state.updateCompanyError = null;
      })
      .addCase(updateCompanyInformation.rejected, (state, action) => {
        state.isUpdateCompanySubmitting = false;
        state.updateCompanyError =
          action.payload ?? UPDATE_COMPANY_ERROR_MESSAGES.update;
      });
  },
});

export const {
  companyUpdateAddressIdSet,
  companyUpdateCompanyIdSet,
  companyUpdateFormValuesSet,
  companyUpdateStateCleared,
} = companyUpdateSlice.actions;

export default companyUpdateSlice.reducer;
