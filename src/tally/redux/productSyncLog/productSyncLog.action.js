import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { tallyProductSyncLogApi } from "@Tally/api";

export const fetchTallyProductSyncLogs = createAsyncThunk(
  "tallyProductSyncLogs/fetchTallyProductSyncLogs",
  async (_, { getState, signal, rejectWithValue }) => {
    const state = getState();

    if (state.auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue(
        "You do not have permission to view Tally product sync logs.",
      );
    }

    const { page, limit } = state.tallyProductSyncLogs;

    try {
      const response = await tallyProductSyncLogApi.getTallyProductSyncLogs(
        { page, limit },
        { signal },
      );
      const pagination = response.pagination ?? {};

      return {
        items: Array.isArray(response.tally_product_syncs)
          ? response.tally_product_syncs
          : [],
        sort: Array.isArray(response.sort) ? response.sort : [],
        pagination: {
          page: Number(pagination.page) || page,
          limit: Number(pagination.limit) || limit,
          total: Number(pagination.total) || 0,
          totalPages: Number(pagination.total_pages) || 0,
        },
      };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
