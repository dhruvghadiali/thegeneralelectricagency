import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { toSalesOrderCompanyListParams } from "@Forms/salesOrder/salesOrder-api.payload";
import { fromSalesOrderCompanyListResponse } from "@Forms/salesOrder/salesOrder-frontend.payload";

export const fetchSalesOrderCompanies = createAsyncThunk(
  "salesOrders/fetchCompanies",
  async (_, { getState, signal, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue("Only employees can load sales-order customers.");
    }

    try {
      const response = await employeeCompanyApi.getCompanies(
        toSalesOrderCompanyListParams(),
        { signal },
      );

      return fromSalesOrderCompanyListResponse(response);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
