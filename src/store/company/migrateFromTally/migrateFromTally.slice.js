import { createSlice } from "@reduxjs/toolkit";

import { MIGRATE_COMPANY_ERROR_MESSAGES } from "@Enums";
import { migrateCompanyFromTally } from "@Redux/company/migrateFromTally/migrateFromTally.action";
import {
  createCompanyMigrateFormValues,
  createCompanyMigrateState,
} from "@Redux/company/migrateFromTally/migrateFromTally.state";

const companyMigrateFromTallySlice = createSlice({
  name: "companyMigrateFromTally",
  initialState: createCompanyMigrateState(),
  reducers: {
    companyMigrateFromTallyIdSet(state, action) {
      state.tallyCompanyId = action.payload;
    },
    companyMigrateFromTallyFormValuesSet(state, action) {
      state.formValues = {
        ...createCompanyMigrateFormValues(),
        ...action.payload,
      };
    },
    companyMigrateFromTallyStateCleared() {
      return createCompanyMigrateState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(migrateCompanyFromTally.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(migrateCompanyFromTally.fulfilled, (state) => {
        state.isSubmitting = false;
        state.error = null;
      })
      .addCase(migrateCompanyFromTally.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error =
          action.payload ?? MIGRATE_COMPANY_ERROR_MESSAGES.migrate;
      });
  },
});

export const {
  companyMigrateFromTallyFormValuesSet,
  companyMigrateFromTallyIdSet,
  companyMigrateFromTallyStateCleared,
} = companyMigrateFromTallySlice.actions;

export default companyMigrateFromTallySlice.reducer;
