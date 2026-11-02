import { createSlice } from "@reduxjs/toolkit";

import { migrateProductFromTally } from "@Redux/product/migrateFromTally/migrateFromTally.action";
import {
  createMigrateFromTallyFormValues,
  createMigrateFromTallyState,
} from "@Redux/product/migrateFromTally/migrateFromTally.state";

const migrateFromTallySlice = createSlice({
  name: "productMigrateFromTally",
  initialState: createMigrateFromTallyState(),
  reducers: {
    migrateFromTallyProductIdSet(state, action) {
      state.tallyProductId = action.payload;
    },
    migrateFromTallyFormValuesSet(state, action) {
      state.formValues = {
        ...createMigrateFromTallyFormValues(),
        ...action.payload,
      };
    },
    migrateFromTallyFormValuesCleared() {
      return createMigrateFromTallyState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(migrateProductFromTally.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(migrateProductFromTally.fulfilled, (state) => {
        state.isSubmitting = false;
        state.error = null;
      })
      .addCase(migrateProductFromTally.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload ?? "Unable to migrate the Tally product.";
      });
  },
});

export const {
  migrateFromTallyFormValuesCleared,
  migrateFromTallyFormValuesSet,
  migrateFromTallyProductIdSet,
} = migrateFromTallySlice.actions;

export default migrateFromTallySlice.reducer;
