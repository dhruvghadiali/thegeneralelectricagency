import { createAsyncThunk } from "@reduxjs/toolkit";

import { tallyProductApi } from "@Tally/api";

export const syncTallyProducts = createAsyncThunk(
  "tally/syncProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await tallyProductApi.getStockItems();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) =>
      getState().tally.products.status !== "loading",
  },
);
