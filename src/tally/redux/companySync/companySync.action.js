import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { tallyCompanySyncApi } from "@Tally/api";
import { toTallyCompanySyncListParams } from "@Tally/component/companySyncs/companySyncs.api-payload";
import { fromTallyCompanySyncListResponse } from "@Tally/component/companySyncs/companySyncs.frontend-payload";

function getFailureStatusCode(error) {
  const statusCode =
    error?.response?.status ?? error?.cause?.response?.status;

  if (Number.isInteger(statusCode)) return statusCode;

  const errorCode = error?.code ?? error?.cause?.code;
  if (errorCode === "ECONNABORTED") return 408;
  if (errorCode === "ERR_NETWORK") return 503;

  return 500;
}

export function toTallyCompanySyncPayload({
  afterSyncCount,
  tallyResponse,
  syncError,
}) {
  if (!syncError) {
    return {
      after_sync_count: afterSyncCount,
      sync_info: [{
        status: "success",
        status_code: 200,
        message: "Company information retrieved from Tally.",
      }],
    };
  }

  const errorCode = syncError?.code ?? syncError?.cause?.code;
  const errorResponse =
    syncError?.response?.data ?? syncError?.cause?.response?.data;

  return {
    after_sync_count: afterSyncCount,
    sync_info: [{
      status: "failure",
      status_code: getFailureStatusCode(syncError),
      message: syncError?.message || "Unable to retrieve companies from Tally.",
      ...(errorCode ? { error_code: errorCode } : {}),
      ...(errorResponse != null ? { error_response: errorResponse } : {}),
      ...(tallyResponse != null ? { response: tallyResponse } : {}),
    }],
  };
}

export const createTallyCompanySyncRecord = createAsyncThunk(
  "tallyCompanySyncs/createTallyCompanySync",
  async (payload, { getState, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue(
        "You do not have permission to create Tally company syncs.",
      );
    }

    try {
      return await tallyCompanySyncApi.createTallyCompanySync(payload);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const fetchTallyCompanySyncs = createAsyncThunk(
  "tallyCompanySyncs/fetchTallyCompanySyncs",
  async (columns = [], { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, appliedFilters } =
      state.tallyCompanySyncs;
    const requested = { page, limit };

    if (state.auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue(
        "You do not have permission to view Tally company syncs.",
      );
    }

    try {
      const response = await tallyCompanySyncApi.getTallyCompanySyncs(
        toTallyCompanySyncListParams({
          columns,
          page,
          limit,
          search: searchQuery,
          filters: appliedFilters,
        }),
        { signal },
      );

      return fromTallyCompanySyncListResponse(response, requested);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
