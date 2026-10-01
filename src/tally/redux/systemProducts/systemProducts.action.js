import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";

import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { systemProductsApi } from "@Tally/api/systemProducts/systemProducts.api";
import { SYSTEM_PRODUCTS_STATUS } from "@Tally/enum/systemProductsStatus.enum";

export const fetchSystemProducts = createAsyncThunk(
  "systemProducts/fetchProducts",
  async (_, { getState, signal, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue("You do not have permission to view Tally products.");
    }

    try {
      const groups = await systemProductsApi.getProducts({ signal });
      return _.flatMap(groups, (group) =>
        _.isArray(group?.tally_products) ? group.tally_products : [],
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
  {
    condition: (_, { getState }) =>
      getState().systemProducts.status !== SYSTEM_PRODUCTS_STATUS.LOADING,
  },
);
