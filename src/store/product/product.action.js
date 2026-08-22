import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { extractErrorMessage } from "@Api/client.api";
import { employeeProductApi, superAdminProductApi } from "@Api";
import { toProductListParams } from "@Tables/product/productTable.api-payload";
import { fromProductListResponse } from "@Tables/product/productTable.frontend-payload";
import {
  toProductCreatePayload,
  toProductUpdatePayload,
} from "@Forms/product/productDetails/productDetails-api.payload";

const productListApiByRole = {
  [ROLE_PATHS.EMPLOYEE]: employeeProductApi,
  [ROLE_PATHS.SUPER_ADMIN]: superAdminProductApi,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (columns = [], { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, sort, appliedFilters } = state.products;
    const productApi = productListApiByRole[state.auth.role];

    if (!productApi) {
      return rejectWithValue("You do not have permission to view products.");
    }

    try {
      const response = await productApi.getProducts(
        toProductListParams({
          columns,
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
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

function employeeOnly(getState, rejectWithValue) {
  if (getState().auth.role !== ROLE_PATHS.EMPLOYEE) {
    return rejectWithValue("Only employees can manage products.");
  }

  return null;
}

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (values, { getState, rejectWithValue }) => {
    const denied = employeeOnly(getState, rejectWithValue);
    if (denied) return denied;

    try {
      return await employeeProductApi.createProduct(
        toProductCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, values }, { getState, rejectWithValue }) => {
    const denied = employeeOnly(getState, rejectWithValue);
    if (denied) return denied;

    try {
      return await employeeProductApi.updateProduct(
        id,
        toProductUpdatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { getState, rejectWithValue }) => {
    const denied = employeeOnly(getState, rejectWithValue);
    if (denied) return denied;

    try {
      await employeeProductApi.deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
