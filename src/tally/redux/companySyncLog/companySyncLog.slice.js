import { createSlice } from "@reduxjs/toolkit";

import { TALLY_COMPANY_SYNC_LOGS_STATUS } from "@Tally/enum/tallyCompanySyncLogsStatus.enum";
import {
  createTallyCompanySyncLog,
  fetchTallyCompanySyncLogs,
} from "@Tally/redux/companySyncLog/companySyncLog.action";

const initialState = {
  items: [],
  sort: [],
  page: 1,
  limit: 10,
  pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  status: TALLY_COMPANY_SYNC_LOGS_STATUS.IDLE,
  error: null,
  requestId: null,
  createdLog: null,
  createStatus: TALLY_COMPANY_SYNC_LOGS_STATUS.IDLE,
  createError: null,
};

const tallyCompanySyncLogSlice = createSlice({
  name: "tallyCompanySyncLogs",
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
      .addCase(fetchTallyCompanySyncLogs.pending, (state, action) => {
        state.status = TALLY_COMPANY_SYNC_LOGS_STATUS.IN_PROGRESS;
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchTallyCompanySyncLogs.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;

        state.items = action.payload.items;
        state.sort = action.payload.sort;
        state.pagination = action.payload.pagination;
        state.page = action.payload.pagination.page;
        state.limit = action.payload.pagination.limit;
        state.status = TALLY_COMPANY_SYNC_LOGS_STATUS.SUCCEEDED;
        state.requestId = null;
      })
      .addCase(fetchTallyCompanySyncLogs.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;

        state.requestId = null;
        if (action.meta.aborted) {
          state.status = TALLY_COMPANY_SYNC_LOGS_STATUS.IDLE;
          return;
        }

        state.status = TALLY_COMPANY_SYNC_LOGS_STATUS.FAILED;
        state.error =
          action.payload ?? action.error.message ?? "Unable to load Tally company sync logs.";
      })
      .addCase(createTallyCompanySyncLog.pending, (state) => {
        state.createStatus = TALLY_COMPANY_SYNC_LOGS_STATUS.IN_PROGRESS;
        state.createError = null;
      })
      .addCase(createTallyCompanySyncLog.fulfilled, (state, action) => {
        state.createStatus = TALLY_COMPANY_SYNC_LOGS_STATUS.SUCCEEDED;
        state.createdLog = action.payload;
      })
      .addCase(createTallyCompanySyncLog.rejected, (state, action) => {
        state.createStatus = TALLY_COMPANY_SYNC_LOGS_STATUS.FAILED;
        state.createError =
          action.payload ?? action.error.message ?? "Unable to create Tally company sync log.";
      });
  },
});

export const { pageChanged, limitChanged } = tallyCompanySyncLogSlice.actions;

export default tallyCompanySyncLogSlice.reducer;
