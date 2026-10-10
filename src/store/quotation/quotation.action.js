import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import {
  QUOTATION_COMPANY_LIMIT,
  QUOTATION_COMPANY_PAGE,
} from "@Redux/quotation/quotation.state";
import { toCompanyListParams } from "@Tables/company/companyTable.api-payload";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";

export const fetchQuotationCompanies = createAsyncThunk(
  "quotation/fetchCompanies",
  async (_, { getState, signal, rejectWithValue }) => {
    const state = getState();

    if (state.auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(
        "You do not have permission to load quotation companies.",
      );
    }

    const requestedPagination = {
      page: QUOTATION_COMPANY_PAGE,
      limit: QUOTATION_COMPANY_LIMIT,
    };

    try {
      const response = await employeeCompanyApi.getCompanies(
        {
          ...toCompanyListParams({
            ...requestedPagination,
            search: state.quotation.companySearch,
            sort: COMPANY_TABLE_DEFAULTS.sort,
          }),
          is_active: true,
        },
        { signal },
      );

      return fromCompanyListResponse(response, requestedPagination);
    } catch (error) {
      if (signal.aborted) {
        const abortError = new Error(
          "Quotation company request was cancelled.",
        );
        abortError.name = "AbortError";
        throw abortError;
      }

      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
