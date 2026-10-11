import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { toCompanyListParams } from "@Tables/company/companyTable.api-payload";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";

export const fetchQuotationCompanies = createAsyncThunk(
  "productQuotation/fetchCompanies",
  async ({ page, search = "" }, { getState, signal, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(
        "You do not have permission to load quotation companies.",
      );
    }

    const limit = COMPANY_TABLE_DEFAULTS.limit;

    try {
      const response = await employeeCompanyApi.getCompanies(
        {
          ...toCompanyListParams({
            page,
            limit,
            search,
            sort: COMPANY_TABLE_DEFAULTS.sort,
          }),
          is_active: true,
        },
        { signal },
      );

      return fromCompanyListResponse(response, { page, limit });
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
