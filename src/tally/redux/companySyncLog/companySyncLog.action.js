import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { tallyCompanySyncApi } from "@Tally/api";

function getFailureStatusCode(error) {
  const statusCode =
    error?.response?.status ?? error?.cause?.response?.status;

  if (Number.isInteger(statusCode)) return statusCode;

  const errorCode = error?.code ?? error?.cause?.code;
  if (errorCode === "ECONNABORTED") return 408;
  if (errorCode === "ERR_NETWORK") return 503;

  return 500;
}

export function toTallyCompanySyncLogPayload({ afterSyncCount, tallyResponse, syncError }) {
  const errorCode = syncError?.code ?? syncError?.cause?.code;
  const errorResponse =
    syncError?.response?.data ?? syncError?.cause?.response?.data;
  return {
    after_sync_count: afterSyncCount,
    sync_info: [
      syncError
        ? {
            status: "failure",
            status_code: getFailureStatusCode(syncError),
            message: syncError.message || "Unable to retrieve companies from Tally.",
            ...(errorCode ? { error_code: errorCode } : {}),
            ...(errorResponse != null ? { error_response: errorResponse } : {}),
            ...(tallyResponse != null ? { response: tallyResponse } : {}),
          }
        : {
            status: "success",
            status_code: 200,
            message: "Company information retrieved from Tally.",
          },
    ],
  };
}

export const createTallyCompanySyncLog = createAsyncThunk(
  "tallyCompanySyncLogs/createTallyCompanySyncLog",
  async (payload, { getState, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue(
        "You do not have permission to create Tally company sync logs.",
      );
    }

    try {
      return await tallyCompanySyncApi.createTallyCompanySync(payload);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const fetchTallyCompanySyncLogs = createAsyncThunk(
  "tallyCompanySyncLogs/fetchTallyCompanySyncLogs",
  async (_, { getState, signal, rejectWithValue }) => {
    const state = getState();

    if (state.auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue(
        "You do not have permission to view Tally company sync logs.",
      );
    }

    const { page, limit } = state.tallyCompanySyncLogs;

    try {
      const response = await tallyCompanySyncApi.getTallyCompanySyncs(
        { page, limit },
        { signal },
      );
      const pagination = response.pagination ?? {};
      const syncLogs = response.tally_company_syncs ?? response.tallyCompanySyncs;

      return {
        items: Array.isArray(syncLogs) ? syncLogs : [],
        sort: Array.isArray(response.sort) ? response.sort : [],
        pagination: {
          page: Number(pagination.page) || page,
          limit: Number(pagination.limit) || limit,
          total: Number(pagination.total) || 0,
          totalPages: Number(pagination.total_pages ?? pagination.totalPages) || 0,
        },
      };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
