import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { tallyCompanyApi } from "@Tally/api";
import {
  createTallyCompanySyncRecord,
  toTallyCompanySyncPayload,
} from "@Tally/redux/companySync/companySync.action";
import { getTallyCompanyRows } from "@Tally/redux/company/company.selector";

export const syncTallyCompanies = createAsyncThunk(
  "tallyCompanies/syncTallyCompanies",
  async (_, { dispatch, getState, rejectWithValue }) => {
    let tallyResponse = null;
    let afterSyncCount = 0;
    let syncError = null;
    let trackingError = null;
    let actionResult;

    try {
      tallyResponse = await tallyCompanyApi.getCompanyLedgers();
      afterSyncCount = getTallyCompanyRows(tallyResponse).length;
      actionResult = tallyResponse;
    } catch (error) {
      syncError = error;
      actionResult = rejectWithValue(error.message);
    } finally {
      if (getState().auth.role === ROLE_PATHS.TECH_SUPPORT) {
        try {
          await dispatch(
            createTallyCompanySyncRecord(
              toTallyCompanySyncPayload({
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
      getState().tallyCompanies.status !== "loading",
  },
);
