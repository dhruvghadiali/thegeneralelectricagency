import { createSlice } from "@reduxjs/toolkit";

import { STOCK_TABLE_DEFAULTS } from "@Enums";
import { fetchStocks } from "@Redux/stock/stock.action";
import {
  createTableState,
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

const initialState = {
  ...createTableState({
    limit: STOCK_TABLE_DEFAULTS.LIMIT,
    sort: STOCK_TABLE_DEFAULTS.SORT,
  }),
  selectedStock: null,
};

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    ...TABLE_REDUCERS,
    stockDetailsOpened(state, action) {
      state.selectedStock = action.payload;
    },
    stockDetailsClosed(state) {
      state.selectedStock = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, tableFetchCases.pending)
      .addCase(fetchStocks.fulfilled, tableFetchCases.fulfilled)
      .addCase(fetchStocks.rejected, (state, action) =>
        tableFetchCases.rejected(state, action, "Unable to load stock."),
      );
  },
});

export const {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
  stockDetailsClosed,
  stockDetailsOpened,
} = stockSlice.actions;

export const stockTableActions = {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
};

export default stockSlice.reducer;
