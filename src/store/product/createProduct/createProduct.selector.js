const selectProductCreateState = (state) => state.productCreate;

export const selectProductCreateSubmitState = (state) => {
  const productCreate = selectProductCreateState(state);

  return {
    isCreateProductSubmitting: productCreate.isCreateProductSubmitting,
    createProductError: productCreate.createProductError,
  };
};
