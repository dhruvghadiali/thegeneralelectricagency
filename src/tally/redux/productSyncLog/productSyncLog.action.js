import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { tallyProductSyncLogApi } from "@Tally/api";

function getFailureStatusCode(error) {
  const statusCode =
    error?.response?.status ?? error?.cause?.response?.status;

  if (Number.isInteger(statusCode)) return statusCode;

  const errorCode = error?.code ?? error?.cause?.code;
  if (errorCode === "ECONNABORTED") return 408;
  if (errorCode === "ERR_NETWORK") return 503;

  return 500;
}

export function toTallyProductSyncLogPayload({ afterSyncCount, syncError }) {
  return {
    after_sync_count: afterSyncCount,
    sync_info: [
      syncError
        ? {
            status: "failure",
            status_code: getFailureStatusCode(syncError),
            message: syncError.message || "Unable to retrieve products from Tally.",
          }
        : {
            status: "success",
            status_code: 200,
            message: "Product information retrieved from Tally.",
          },
    ],
  };
}

export const createTallyProductSyncLog = createAsyncThunk(
  "tallyProductSyncLogs/createTallyProductSyncLog",
  async (payload, { getState, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue(
        "You do not have permission to create Tally product sync logs.",
      );
    }

    try {
      return await tallyProductSyncLogApi.createTallyProductSyncLog(payload);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

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
