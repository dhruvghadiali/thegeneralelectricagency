import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { extractErrorMessage } from "@Api/client.api";
import { employeeProductApi, superAdminProductApi } from "@Api";
import { PRODUCT_ERROR_MESSAGES } from "@Redux/product/product.defaults";
import { selectCanManageProducts } from "@Redux/product/product.selector";
import { fromProductListResponse } from "@Redux/product/product.api-response";
import {
  toProductCreatePayload,
  toProductListParams,
} from "@Redux/product/product.api-payload";

const productListApiByRole = {
  [ROLE_PATHS.EMPLOYEE]: employeeProductApi,
  [ROLE_PATHS.SUPER_ADMIN]: superAdminProductApi,
};

export const getProductList = createAsyncThunk(
  "products/getProductList",
  async (_, { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, sort, appliedFilters } =
      state.products.productTable;
    const productApi = productListApiByRole[state.auth.role];

    if (!productApi) {
      return rejectWithValue(PRODUCT_ERROR_MESSAGES.viewPermission);
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

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (values, { getState, rejectWithValue }) => {
    if (!selectCanManageProducts(getState())) {
      return rejectWithValue(PRODUCT_ERROR_MESSAGES.managePermission);
    }

    try {
      return await employeeProductApi.createProduct(
        toProductCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
