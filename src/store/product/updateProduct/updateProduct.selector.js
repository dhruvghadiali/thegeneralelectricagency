const selectProductUpdateState = (state) => state.productUpdate;

export const selectProductUpdateFormValues = (state) =>
  selectProductUpdateState(state).formValues;

export const selectProductUpdateSubmitState = (state) => {
  const productUpdate = selectProductUpdateState(state);

  return {
    productId: productUpdate.productId,
    isUpdateProductSubmitting: productUpdate.isUpdateProductSubmitting,
    updateProductError: productUpdate.updateProductError,
  };
};
