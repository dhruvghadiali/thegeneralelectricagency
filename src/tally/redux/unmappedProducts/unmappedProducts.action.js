import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { unmappedProductsApi } from "@Tally/api";
import { UNMAPPED_PRODUCTS_STATUS } from "@Tally/enum/unmappedProductsStatus.enum";

export const fetchUnmappedProducts = createAsyncThunk(
  "unmappedProducts/fetchUnmappedProducts",
  async (_, { getState, signal, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue(
        "You do not have permission to view un-mapped products.",
      );
    }

    try {
      const response = await unmappedProductsApi.getUnmappedProducts(
        {},
        { signal },
      );

      return {
        products: Array.isArray(response.tally_products)
          ? response.tally_products
          : [],
        stockGroups: Array.isArray(response.stock_groups)
          ? response.stock_groups
          : [],
        sort: Array.isArray(response.sort) ? response.sort : [],
      };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
  {
    condition: (_, { getState }) =>
      getState().unmappedProducts.status !== UNMAPPED_PRODUCTS_STATUS.LOADING,
  },
);
