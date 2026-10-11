import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { tallyProductApi } from "@Tally/api";
import { TALLY_PRODUCTS_STATUS } from "@Tally/enum/tallyProductsStatus.enum";
import { fromTallyProductsResponse } from "@Tally/redux/tallyProducts/tallyProducts.frontend-payload";
import {
  createTallyProductSyncLog,
  toTallyProductSyncLogPayload,
} from "@Tally/redux/productSyncLog/productSyncLog.action";

export const syncTallyProducts = createAsyncThunk(
  "tallyProducts/syncProducts",
  async (_, { dispatch, getState, signal, rejectWithValue }) => {
    let tallyResponse = null;
    let afterSyncCount = 0;
    let syncError = null;
    let trackingError = null;
    let actionResult;

    try {
      tallyResponse = await tallyProductApi.getStockItems({ signal });
      afterSyncCount = fromTallyProductsResponse(tallyResponse).length;
      actionResult = tallyResponse;
    } catch (error) {
      syncError = error;
      actionResult = rejectWithValue(error.message);
    } finally {
      if (getState().auth.role === ROLE_PATHS.TECH_SUPPORT && !signal.aborted) {
        try {
          await dispatch(
            createTallyProductSyncLog(
              toTallyProductSyncLogPayload({ afterSyncCount, syncError }),
            ),
          ).unwrap();
        } catch (error) {
          trackingError =
            error instanceof Error ? error : new Error(String(error));
        }
      }
    }

    if (trackingError && !syncError) throw trackingError;

    return actionResult;
  },
  {
    condition: (_, { getState }) =>
      getState().tallyProducts.status !== TALLY_PRODUCTS_STATUS.LOADING,
  },
);
