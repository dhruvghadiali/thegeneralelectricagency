import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, superAdminCompanyApi } from "@Api";
import { extractErrorMessage } from "@Api/client.api";
import { GET_COMPANY_LIST_ERROR_MESSAGES, ROLE_PATHS } from "@Enums";
import { toCompanyListParams } from "@Redux/company/getCompanyList/getCompanyList.api-payload";
import { fromCompanyListResponse } from "@Redux/company/getCompanyList/getCompanyList.api-response";

const companyListApiByRole = {
  [ROLE_PATHS.EMPLOYEE]: employeeCompanyApi,
  [ROLE_PATHS.SUPER_ADMIN]: superAdminCompanyApi,
};

export const getCompanyList = createAsyncThunk(
  "companyList/getCompanyList",
  async (_, { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, sort, appliedFilters } =
      state.companyList.companyTable;
    const companyApi = companyListApiByRole[state.auth.role];

    if (!companyApi) {
      return rejectWithValue(GET_COMPANY_LIST_ERROR_MESSAGES.permission);
    }

    try {
      const response = await companyApi.getCompanies(
        toCompanyListParams({
          page,
          limit,
          search: searchQuery,
          sort,
          filters: appliedFilters,
        }),
        { signal },
      );

      return fromCompanyListResponse(response, { page, limit });
    } catch (error) {
      if (signal.aborted) {
        const abortError = new Error("Company list request was cancelled.");
        abortError.name = "AbortError";
        throw abortError;
      }

      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
