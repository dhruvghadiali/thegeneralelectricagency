const selectMigrateFromTallyState = (state) => state.productMigrateFromTally;

export const selectMigrateFromTallyFormValues = (state) =>
  selectMigrateFromTallyState(state).formValues;

export const selectMigrateFromTallySubmitState = (state) => {
  const migrateFromTally = selectMigrateFromTallyState(state);

  return {
    tallyProductId: migrateFromTally.tallyProductId,
    isSubmitting: migrateFromTally.isSubmitting,
    error: migrateFromTally.error,
  };
};
