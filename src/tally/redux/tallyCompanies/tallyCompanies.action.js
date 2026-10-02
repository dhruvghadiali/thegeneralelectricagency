import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { tallyCompanyApi } from "@Tally/api";
import { TALLY_COMPANIES_STATUS } from "@Tally/enum/tallyCompaniesStatus.enum";
import {
  createTallyCompanySyncLog,
  toTallyCompanySyncLogPayload,
} from "@Tally/redux/companySyncLog/companySyncLog.action";
import { fromTallyCompaniesResponse } from "@Tally/redux/tallyCompanies/tallyCompanies.frontend-payload";

export const syncTallyCompanies = createAsyncThunk(
  "tallyCompanies/syncTallyCompanies",
  async (_, { dispatch, getState, signal, rejectWithValue }) => {
    let tallyResponse = null;
    let afterSyncCount = 0;
    let syncError = null;
    let trackingError = null;
    let actionResult;

    try {
      tallyResponse = await tallyCompanyApi.getCompanyLedgers({ signal });
      afterSyncCount = fromTallyCompaniesResponse(tallyResponse).length;
      actionResult = tallyResponse;
    } catch (error) {
      syncError = error;
      actionResult = rejectWithValue(error.message);
    } finally {
      if (getState().auth.role === ROLE_PATHS.TECH_SUPPORT && !signal.aborted) {
        try {
          await dispatch(
            createTallyCompanySyncLog(
              toTallyCompanySyncLogPayload({
                afterSyncCount,
                tallyResponse,
                syncError,
              }),
            ),
          ).unwrap();
        } catch (error) {
          trackingError =
            error instanceof Error ? error : new Error(String(error));
        }
      }
    }

    // Preserve the original Tally/code failure when both requests fail.
    // If Tally succeeded, surface the tracking failure to the UI.
    if (trackingError && !syncError) throw trackingError;

    return actionResult;
  },
  {
    condition: (_, { getState }) =>
      getState().tallyCompanies.status !== TALLY_COMPANIES_STATUS.LOADING,
  },
);
