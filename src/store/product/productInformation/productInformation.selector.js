const selectProductInformationState = (state) => state.productInformation;

export const selectProductInformationFormValues = (state) =>
  selectProductInformationState(state).formValues;

export const selectProductInformationSubmitState = (state) => {
  const productInformation = selectProductInformationState(state);

  return {
    productId: productInformation.productId,
    isSubmitting: productInformation.isSubmitting,
    error: productInformation.error,
  };
};
