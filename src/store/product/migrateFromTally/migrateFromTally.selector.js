const selectMigrateFromTallyState = (state) => state.productMigrateFromTally;

export const selectMigrateFromTallyFormValues = (state) =>
  selectMigrateFromTallyState(state).formValues;
