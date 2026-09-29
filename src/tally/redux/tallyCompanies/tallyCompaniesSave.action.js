import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { tallyCompaniesApi } from "@Tally/api/tallyCompanies/tallyCompanies.api";
import { toTallyCompanyCreatePayload } from "@Tally/tables/tallyCompanies/tallyCompaniesCreate.api-payload";
import { fetchTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompanies.action";

export const saveTallyCompanies = createAsyncThunk(
  "tallyCompaniesList/save",
  async (selectedIds, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    if (state.auth.role !== ROLE_PATHS.TECH_SUPPORT) return rejectWithValue("You do not have permission to save Tally companies.");
    const ids = new Set(selectedIds);
    const companies = state.tallyCompaniesList.comparison.newRecords.filter((company) => ids.has(company._id));
    if (!companies.length) return rejectWithValue("Select at least one new record to save. Deleting records is not available yet.");
    let requests;
    try {
      requests = companies.map((company) => ({ id: company._id, payload: toTallyCompanyCreatePayload(company) }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
    const savedIds = [];
    const errors = [];
    for (const { id, payload } of requests) {
      try {
        await tallyCompaniesApi.createTallyCompany(payload);
        savedIds.push(id);
      } catch (error) {
        errors.push(`${payload.company_name}: ${extractErrorMessage(error)}`);
      }
    }
    if (savedIds.length) await dispatch(fetchTallyCompanies());
    return { savedIds, errors };
  },
  { condition: (_, { getState }) => getState().tallyCompaniesList.saveStatus !== "loading" },
);
