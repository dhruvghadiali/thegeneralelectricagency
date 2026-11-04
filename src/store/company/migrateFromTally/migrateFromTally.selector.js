const selectCompanyMigrateState = (state) => state.companyMigrateFromTally;

export const selectCompanyMigrateFormValues = (state) =>
  selectCompanyMigrateState(state).formValues;

export const selectCompanyMigrateSubmitState = (state) => {
  const companyMigrate = selectCompanyMigrateState(state);

  return {
    tallyCompanyId: companyMigrate.tallyCompanyId,
    isSubmitting: companyMigrate.isSubmitting,
    error: companyMigrate.error,
  };
};
