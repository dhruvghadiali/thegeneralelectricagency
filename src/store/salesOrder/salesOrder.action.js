import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, employeeProductApi, extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import {
  toSalesOrderCompanyListParams,
  toSalesOrderProductListParams,
} from "@Forms/salesOrder/salesOrder-api.payload";
import {
  fromSalesOrderCompanyListResponse,
  fromSalesOrderProductListResponse,
} from "@Forms/salesOrder/salesOrder-frontend.payload";

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

export const fetchSalesOrderProducts = createAsyncThunk(
  "salesOrders/fetchProducts",
  async (supplierId, { getState, signal, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue("Only employees can load sales-order products.");
    }

    try {
      const response = await employeeProductApi.getProducts(
        toSalesOrderProductListParams(supplierId),
        { signal },
      );

      return {
        supplierId: String(supplierId),
        items: fromSalesOrderProductListResponse(response, supplierId),
      };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
