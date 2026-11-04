const selectCompanyUpdateState = (state) => state.companyUpdate;

export const selectCompanyUpdateFormValues = (state) =>
  selectCompanyUpdateState(state).formValues;

export const selectCompanyUpdateSubmitState = (state) => {
  const companyUpdate = selectCompanyUpdateState(state);

  return {
    companyId: companyUpdate.companyId,
    addressId: companyUpdate.addressId,
    isUpdateCompanySubmitting: companyUpdate.isUpdateCompanySubmitting,
    updateCompanyError: companyUpdate.updateCompanyError,
  };
};
