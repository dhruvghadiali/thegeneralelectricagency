import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { employeeProductApi } from "@Api";
import { extractErrorMessage } from "@Api/client.api";
import { PRODUCT_ERROR_MESSAGES } from "@Redux/product/product.defaults";
import { toSyncPendingProductListParams } from "@Redux/product/syncPending/syncPending.api-payload";
import { fromSyncPendingProductListResponse } from "@Redux/product/syncPending/syncPending.api-response";

export const fetchSyncPendingProducts = createAsyncThunk(
  "syncPendingProducts/fetchProducts",
  async (_, { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, sort, appliedFilters } =
      state.syncPendingProducts;

    if (state.auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(PRODUCT_ERROR_MESSAGES.managePermission);
    }

    try {
      const response = await employeeProductApi.getProducts(
        toSyncPendingProductListParams({
          page,
          limit,
          search: searchQuery,
          sort,
          filters: appliedFilters,
        }),
        { signal },
      );
      return fromSyncPendingProductListResponse(response, { page, limit });
    } catch (error) {
      if (signal.aborted) {
        const abortError = new Error("Sync-pending request was cancelled.");
        abortError.name = "AbortError";
        throw abortError;
      }

      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
