const selectCompanyCreateState = (state) => state.companyCreate;

export const selectCompanyCreateSubmitState = (state) => {
  const companyCreate = selectCompanyCreateState(state);

  return {
    isCreateCompanySubmitting: companyCreate.isCreateCompanySubmitting,
    createCompanyError: companyCreate.createCompanyError,
  };
};
