import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { tallyCompaniesApi } from "@Tally/api/tallyCompanies/tallyCompanies.api";
import { selectTallyCompanyRows } from "@Tally/redux/company/company.selector";
import { toTallyCompaniesListParams } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.api-payload";
import { compareTallyCompanies } from "@Tally/tables/tallyCompanies/tallyCompaniesComparison.utils";

export const fetchTallyCompaniesComparison = createAsyncThunk(
  "tallyCompaniesList/compare",
  async (_, { getState, signal, rejectWithValue }) => {
    const state = getState();
    if (state.auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue("You do not have permission to compare Tally companies.");
    }
    const tallyCompanies = selectTallyCompanyRows(state);
    if (state.tallyCompanies.status !== "succeeded" || !tallyCompanies.length) {
      return rejectWithValue("Fetch companies from Tally before comparing.");
    }
    try {
      const response = await tallyCompaniesApi.getTallyCompanies(
        toTallyCompaniesListParams(),
        { signal },
      );
      const companies = response.tally_companies;
      if (!Array.isArray(companies)) {
        throw new Error("Unable to load system companies. Please retry the comparison.");
      }
      return compareTallyCompanies(companies, tallyCompanies);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

