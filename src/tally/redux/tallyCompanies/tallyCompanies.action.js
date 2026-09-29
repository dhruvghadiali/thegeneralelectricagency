import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { tallyCompaniesApi } from "@Tally/api/tallyCompanies/tallyCompanies.api";
import { fromTallyCompaniesResponse } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.frontend-payload";
import { toTallyCompaniesListParams } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.api-payload";

export const fetchTallyCompanies = createAsyncThunk(
  "tallyCompaniesList/fetch",
  async (_, { getState, signal, rejectWithValue }) => {
    const state = getState();
    if (state.auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue("You do not have permission to view Tally companies.");
    }

    try {
      const response = await tallyCompaniesApi.getTallyCompanies(
        toTallyCompaniesListParams(),
        { signal },
      );
      return fromTallyCompaniesResponse(response);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
