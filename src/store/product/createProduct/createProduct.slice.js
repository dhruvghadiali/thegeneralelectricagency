import { createSlice } from "@reduxjs/toolkit";

import { CREATE_PRODUCT_ERROR_MESSAGES } from "@Enums";
import { createProduct } from "@Redux/product/createProduct/createProduct.action";
import { createProductCreateState } from "@Redux/product/createProduct/createProduct.state";

const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: createProductCreateState(),
  reducers: {
    productCreateStateCleared() {
      return createProductCreateState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isCreateProductSubmitting = true;
        state.createProductError = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isCreateProductSubmitting = false;
        state.createProductError = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isCreateProductSubmitting = false;
        state.createProductError =
          action.payload ?? CREATE_PRODUCT_ERROR_MESSAGES.create;
      });
  },
});

export const { productCreateStateCleared } = productCreateSlice.actions;

export default productCreateSlice.reducer;
