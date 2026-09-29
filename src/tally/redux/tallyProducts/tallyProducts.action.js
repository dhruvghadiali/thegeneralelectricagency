import { createAsyncThunk } from "@reduxjs/toolkit";

import { tallyProductApi } from "@Tally/api";
import { TALLY_PRODUCTS_STATUS } from "@Tally/enum/tallyProductsStatus.enum";

export const syncTallyProducts = createAsyncThunk(
  "tallyProducts/syncProducts",
  async (_, { signal, rejectWithValue }) => {
    try {
      return await tallyProductApi.getStockItems({ signal });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) =>
      getState().tallyProducts.status !== TALLY_PRODUCTS_STATUS.LOADING,
  },
);
