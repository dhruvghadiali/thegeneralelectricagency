import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { tallyCompaniesApi } from "@Tally/api/tallyCompanies/tallyCompanies.api";
import { toSystemCompaniesListParams } from "@Tally/redux/systemCompanies/systemCompanies.api-payload";
import { SYSTEM_COMPANIES_STATUS } from "@Tally/enum/systemCompaniesStatus.enum";
import { fromSystemCompaniesResponse } from "@Tally/redux/systemCompanies/systemCompanies.frontend-payload";

export const fetchSystemCompanies = createAsyncThunk(
  "systemCompanies/fetchCompanies",
  async (_, { getState, signal, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue("You do not have permission to view system companies.");
    }

    try {
      const response = await tallyCompaniesApi.getTallyCompanies(
        toSystemCompaniesListParams(),
        { signal },
      );
      return fromSystemCompaniesResponse(response);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
  {
    condition: (_, { getState }) =>
      getState().systemCompanies.status !== SYSTEM_COMPANIES_STATUS.LOADING,
  },
);

