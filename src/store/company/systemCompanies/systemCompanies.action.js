import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { toCompanyListParams } from "@Tables/company/companyTable.api-payload";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";

export const fetchSystemCompanies = createAsyncThunk(
  "companySystemCompanies/fetchCompanies",
  async ({ page, search = "" }, { getState, signal, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(
        "You do not have permission to load system companies.",
      );
    }

    const limit = COMPANY_TABLE_DEFAULTS.limit;

    try {
      const response = await employeeCompanyApi.getSystemCompanies(
        toCompanyListParams({
          page,
          limit,
          search,
          sort: COMPANY_TABLE_DEFAULTS.sort,
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
