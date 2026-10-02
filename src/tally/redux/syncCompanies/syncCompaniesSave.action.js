import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { tallyCompaniesApi } from "@Tally/api/tallyCompanies/tallyCompanies.api";
import { SYNC_COMPANIES_SAVE_STATUS } from "@Tally/enum/syncCompaniesSaveStatus.enum";
import { fetchSystemCompanies } from "@Tally/redux/systemCompanies/systemCompanies.action";
import { selectNewCompanies } from "@Tally/redux/syncCompanies/syncCompanies.selector";
import { toSystemCompanyCreatePayload } from "@Tally/redux/syncCompanies/syncCompanies.api-payload";

export const saveSyncCompanies = createAsyncThunk(
  "syncCompanies/save",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    if (state.auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue("You do not have permission to save Tally companies.");
    }
    const selectedIds = new Set(state.syncCompanies.selectedRowKeys);
    const companies = selectNewCompanies(state).filter((company) => selectedIds.has(company._id));
    if (!companies.length) return rejectWithValue("Select at least one new company to save.");

    const savedIds = [];
    const errors = [];
    for (const company of companies) {
      try {
        await tallyCompaniesApi.createTallyCompany(toSystemCompanyCreatePayload(company));
        savedIds.push(company._id);
      } catch (error) {
        errors.push(`${company.company_name || company.company_id}: ${extractErrorMessage(error)}`);
      }
    }
    if (savedIds.length) {
      try {
        await dispatch(fetchSystemCompanies()).unwrap();
      } catch (error) {
        const message = typeof error === "string" ? error : extractErrorMessage(error);
        errors.push(`Companies were saved, but the list could not be refreshed: ${message}`);
      }
    }
    return { savedIds, errors };
  },
  {
    condition: (_, { getState }) =>
      getState().syncCompanies.saveStatus !== SYNC_COMPANIES_SAVE_STATUS.LOADING,
  },
);
