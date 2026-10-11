import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { extractErrorMessage } from "@Api/client.api";
import { employeeProductApi, superAdminProductApi } from "@Api";
import { toProductListParams } from "@Redux/product/product.api-payload";
import {
  PRODUCT_ERROR_MESSAGES,
  PRODUCT_LIST_DEFAULTS,
} from "@Redux/product/product.defaults";
import { fromProductListResponse } from "@Redux/product/product.api-response";
import {
  toProductCreatePayload,
  toProductUpdatePayload,
} from "@Forms/product/productDetails/productDetails-api.payload";

const productListApiByRole = {
  [ROLE_PATHS.EMPLOYEE]: employeeProductApi,
  [ROLE_PATHS.SUPER_ADMIN]: superAdminProductApi,
};

async function getProductList({ getState, signal, rejectWithValue }) {
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
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  (_, thunkApi) => getProductList(thunkApi),
);

export const fetchQuotationProducts = createAsyncThunk(
  "products/fetchQuotationProducts",
  async ({ page, search = "" }, { getState, signal, rejectWithValue }) => {
    const denied = employeeOnly(getState, rejectWithValue);
    if (denied) return denied;

    const limit = PRODUCT_LIST_DEFAULTS.limit;

    try {
      const response = await employeeProductApi.getProducts(
        toProductListParams({
          page,
          limit,
          search,
          sort: PRODUCT_LIST_DEFAULTS.sort,
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
    return rejectWithValue(PRODUCT_ERROR_MESSAGES.managePermission);
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
