import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { toSalesOrderCustomerListParams } from "@Forms/salesOrder/salesOrder-api.payload";
import { fromSalesOrderCustomerListResponse } from "@Forms/salesOrder/salesOrder-frontend.payload";

export const fetchSalesOrderCustomers = createAsyncThunk(
  "salesOrders/fetchCustomers",
  async (search = "", { getState, signal, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue("Only employees can load sales-order customers.");
    }

    try {
      const response = await employeeCompanyApi.getCompanies(
        toSalesOrderCustomerListParams(search),
        { signal },
      );

      return fromSalesOrderCustomerListResponse(response);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
