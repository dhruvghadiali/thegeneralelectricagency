import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { COMPANY_LIST_DEFAULTS, ROLE_PATHS } from "@Enums";
import { toCompanyListParams } from "@Redux/company/getCompanyList/getCompanyList.api-payload";
import { fromCompanyListResponse } from "@Redux/company/getCompanyList/getCompanyList.api-response";

export const fetchSystemCompanies = createAsyncThunk(
  "companySystemCompanies/fetchCompanies",
  async ({ page, search = "" }, { getState, signal, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(
        "You do not have permission to load system companies.",
      );
    }

    const limit = COMPANY_LIST_DEFAULTS.limit;

    try {
      const response = await employeeCompanyApi.getSystemCompanies(
        toCompanyListParams({
          page,
          limit,
          search,
          sort: COMPANY_LIST_DEFAULTS.sort,
        }),
        { signal },
      );

      return fromCompanyListResponse(response, { page, limit });
    } catch (error) {
      if (signal.aborted) {
        const abortError = new Error(
          "System company request was cancelled.",
        );
        abortError.name = "AbortError";
        throw abortError;
      }

      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
