import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeePurchaseApi, employeeStockApi } from "@Api";
import { extractErrorMessage } from "@Api/client.api";
import { ROLE_PATHS } from "@Enums";
import {
  toPurchaseCreatePayload,
  toPurchaseListParams,
} from "@Forms/purchaseOrder/purchaseOrder-api.payload";
import { fromPurchaseListResponse } from "@Forms/purchaseOrder/purchaseOrder-frontend.payload";
import { fromStandaloneStockCountResponse } from "@Forms/stock/stock-frontend.payload";

export const fetchPurchaseStandaloneStockCount = createAsyncThunk(
  "purchases/fetchStandaloneStockCount",
  async (productId, { getState, signal, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(
        "Only employees can view standalone stock counts.",
      );
    }

    try {
      const response = await employeeStockApi.getStandaloneStockCount(
        productId,
        { signal },
      );

      return {
        productId: String(productId),
        ...fromStandaloneStockCountResponse(response),
      };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const fetchPurchases = createAsyncThunk(
  "purchases/fetchPurchases",
  async (columns = [], { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, sort, appliedFilters } = state.purchases;

    if (state.auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue("Only employees can view purchases.");
    }

    try {
      const response = await employeePurchaseApi.getPurchases(
        toPurchaseListParams({
          columns,
          page,
          limit,
          search: searchQuery,
          sort,
          filters: appliedFilters,
        }),
        { signal },
      );

      return fromPurchaseListResponse(response, { page, limit });
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const createPurchase = createAsyncThunk(
  "purchases/createPurchase",
  async (values, { getState, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue("Only employees can create purchases.");
    }

    try {
      return await employeePurchaseApi.createPurchase(
        toPurchaseCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
