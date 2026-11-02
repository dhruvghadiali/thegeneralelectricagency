import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeProductApi, extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { toMigrateFromTallyPayload } from "@Redux/product/migrateFromTally/migrateFromTally.api-payload";

export const migrateProductFromTally = createAsyncThunk(
  "productMigrateFromTally/migrateProduct",
  async (values, { getState, rejectWithValue }) => {
    const state = getState();

    if (state.auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(
        "You do not have permission to migrate Tally products.",
      );
    }

    const { tallyProductId } = state.productMigrateFromTally;
    if (!tallyProductId) {
      return rejectWithValue("The Tally product ID is missing.");
    }

    try {
      return await employeeProductApi.migrateProductFromTally(
        toMigrateFromTallyPayload(tallyProductId, values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
