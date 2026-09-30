import { createSlice } from "@reduxjs/toolkit";

import { TALLY_PRODUCT_SYNC_LOGS_STATUS } from "@Tally/enum/tallyProductSyncLogsStatus.enum";
import { fetchTallyProductSyncLogs } from "@Tally/redux/productSyncLog/productSyncLog.action";

const initialState = {
  items: [],
  sort: [],
  page: 1,
  limit: 10,
  pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  status: TALLY_PRODUCT_SYNC_LOGS_STATUS.IDLE,
  error: null,
  requestId: null,
};

const tallyProductSyncLogSlice = createSlice({
  name: "tallyProductSyncLogs",
  initialState,
  reducers: {
    pageChanged(state, action) {
      state.page = Math.max(1, Number(action.payload) || 1);
    },
    limitChanged(state, action) {
      state.limit = Math.max(1, Number(action.payload) || 10);
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTallyProductSyncLogs.pending, (state, action) => {
        state.status = TALLY_PRODUCT_SYNC_LOGS_STATUS.IN_PROGRESS;
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchTallyProductSyncLogs.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;

        state.items = action.payload.items;
        state.sort = action.payload.sort;
        state.pagination = action.payload.pagination;
        state.page = action.payload.pagination.page;
        state.limit = action.payload.pagination.limit;
        state.status = TALLY_PRODUCT_SYNC_LOGS_STATUS.SUCCEEDED;
        state.requestId = null;
      })
      .addCase(fetchTallyProductSyncLogs.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;

        state.requestId = null;
        if (action.meta.aborted) {
          state.status = TALLY_PRODUCT_SYNC_LOGS_STATUS.IDLE;
          return;
        }

        state.status = TALLY_PRODUCT_SYNC_LOGS_STATUS.FAILED;
        state.error =
          action.payload ?? action.error.message ?? "Unable to load Tally product sync logs.";
      });
  },
});

export const { pageChanged, limitChanged } = tallyProductSyncLogSlice.actions;

export default tallyProductSyncLogSlice.reducer;
