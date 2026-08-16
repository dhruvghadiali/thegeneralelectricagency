import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, superAdminCompanyApi } from "@Api";
import { extractErrorMessage } from "@Api/client.api";
import { ROLE_PATHS } from "@Enums";
import {
  fromCompanyCreateError,
  fromCompanyListResponse,
  toCompanyCreatePayload,
  toCompanyListParams,
} from "@Forms/company/company.payload";

const companyListApiByRole = {
  [ROLE_PATHS.EMPLOYEE]: employeeCompanyApi,
  [ROLE_PATHS.SUPER_ADMIN]: superAdminCompanyApi,
};

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async (columns = [], { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, sort, appliedFilters } = state.companies;
    const requested = { page, limit };
    const companyApi = companyListApiByRole[state.auth.role];

    if (!companyApi) {
      return rejectWithValue(
        "You do not have permission to view the company directory.",
      );
    }

    try {
      const response = await companyApi.getCompanies(
        toCompanyListParams({
          columns,
          page,
          limit,
          search: searchQuery,
          sort,
          filters: appliedFilters,
        }),
        { signal },
      );

      return fromCompanyListResponse(response, requested);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const createCompany = createAsyncThunk(
  "companies/createCompany",
  async (values, { rejectWithValue }) => {
    try {
      return await employeeCompanyApi.createCompany(
        toCompanyCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(fromCompanyCreateError(error));
    }
  },
);
