import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@Api/client.api";
import { employeeProductApi, superAdminProductApi } from "@Api";
import { GET_PRODUCT_LIST_ERROR_MESSAGES, ROLE_PATHS } from "@Enums";
import { toProductListParams } from "@Redux/product/getProductList/getProductList.api-payload";
import { fromProductListResponse } from "@Redux/product/getProductList/getProductList.api-response";

const productListApiByRole = {
  [ROLE_PATHS.EMPLOYEE]: employeeProductApi,
  [ROLE_PATHS.SUPER_ADMIN]: superAdminProductApi,
};

export const getProductList = createAsyncThunk(
  "productList/getProductList",
  async (_, { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, sort, appliedFilters } =
      state.productList.productTable;
    const productApi = productListApiByRole[state.auth.role];

    if (!productApi) {
      return rejectWithValue(GET_PRODUCT_LIST_ERROR_MESSAGES.permission);
    }

    try {
      const response = await productApi.getProducts(
        toProductListParams({
          page,
          limit,
          search: searchQuery,
          sort,
          filters: appliedFilters,
        }),
        { signal },
      );

      return fromProductListResponse(response, { page, limit });
    } catch (error) {
      if (signal.aborted) {
        const abortError = new Error("Product list request was cancelled.");
        abortError.name = "AbortError";
        throw abortError;
      }

      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
