import { createSlice } from "@reduxjs/toolkit";

import {
  createMigrateFromTallyFormValues,
  createMigrateFromTallyState,
} from "@Redux/product/migrateFromTally/migrateFromTally.state";

const migrateFromTallySlice = createSlice({
  name: "productMigrateFromTally",
  initialState: createMigrateFromTallyState(),
  reducers: {
    migrateFromTallyFormValuesSet(state, action) {
      state.formValues = {
        ...createMigrateFromTallyFormValues(),
        ...action.payload,
      };
    },
    migrateFromTallyFormValuesCleared(state) {
      state.formValues = createMigrateFromTallyFormValues();
    },
  },
});

export const {
  migrateFromTallyFormValuesCleared,
  migrateFromTallyFormValuesSet,
} = migrateFromTallySlice.actions;

export default migrateFromTallySlice.reducer;
