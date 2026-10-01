import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { systemProductsApi } from "@Tally/api/systemProducts/systemProducts.api";
import { SYSTEM_PRODUCTS_STATUS } from "@Tally/enum/systemProductsStatus.enum";
import { fromSystemProductsResponse } from "@Tally/redux/systemProducts/systemProducts.frontend-payload";

export const fetchSystemProducts = createAsyncThunk(
  "systemProducts/fetchProducts",
  async (_, { getState, signal, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue("You do not have permission to view Tally products.");
    }

    try {
      const response = await systemProductsApi.getProducts({ signal });
      return fromSystemProductsResponse(response);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
  {
    condition: (_, { getState }) =>
      getState().systemProducts.status !== SYSTEM_PRODUCTS_STATUS.LOADING,
  },
);
