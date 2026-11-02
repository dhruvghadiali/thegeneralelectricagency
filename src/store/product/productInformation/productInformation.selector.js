const selectProductInformationState = (state) => state.productInformation;

export const selectProductInformationFormValues = (state) =>
  selectProductInformationState(state).formValues;
