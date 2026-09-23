import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCompanyLedgers, getStockItems } from "@Tally/api";

export const syncTallyCompanies = createAsyncThunk(
  "tally/syncCompanies",
  async (_, { rejectWithValue }) => {
    try {
      return await getCompanyLedgers();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) =>
      getState().tally.companies.status !== "loading",
  },
);

export const syncTallyProducts = createAsyncThunk(
  "tally/syncProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await getStockItems();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) =>
      getState().tally.products.status !== "loading",
  },
);
