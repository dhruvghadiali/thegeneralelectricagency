import { createAsyncThunk } from "@reduxjs/toolkit";

import { getDummyStockList } from "@/components/screen/stocks/stock.data";
import { fromStockListResponse } from "@Forms/stock/stock.payload";

/** Replace only the dummy source with the GET API when it becomes available. */
export const fetchStocks = createAsyncThunk(
  "stocks/fetchStocks",
  async (_, { getState }) => {
    const { page, limit, searchQuery } = getState().stocks;
    const requested = { page, limit };
    const response = getDummyStockList({ page, limit, search: searchQuery });

    return fromStockListResponse(response, requested);
  },
);
