import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { MIGRATE_COMPANY_ERROR_MESSAGES } from "@Enums";
import { isEmployeeCanManageCompanies } from "@Redux/company/company.selector";
import { toMigrateCompanyFromTallyPayload } from "@Redux/company/migrateFromTally/migrateFromTally.api-payload";

export const migrateCompanyFromTally = createAsyncThunk(
  "companyMigrateFromTally/migrateCompany",
  async (values, { getState, rejectWithValue }) => {
    const state = getState();

    if (!isEmployeeCanManageCompanies(state)) {
      return rejectWithValue(MIGRATE_COMPANY_ERROR_MESSAGES.permission);
    }

    const { tallyCompanyId } = state.companyMigrateFromTally;
    if (!tallyCompanyId) {
      return rejectWithValue(
        MIGRATE_COMPANY_ERROR_MESSAGES.missingTallyCompanyId,
      );
    }

    try {
      return await employeeCompanyApi.migrateCompanyFromTally(
        toMigrateCompanyFromTallyPayload(tallyCompanyId, values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
