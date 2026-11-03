import { createSlice } from "@reduxjs/toolkit";

import { UPDATE_PRODUCT_ERROR_MESSAGES } from "@Enums";
import { updateProduct } from "@Redux/product/updateProduct/updateProduct.action";
import {
  createProductUpdateFormValues,
  createProductUpdateState,
} from "@Redux/product/updateProduct/updateProduct.state";

const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: createProductUpdateState(),
  reducers: {
    productUpdateProductIdSet(state, action) {
      state.productId = action.payload;
    },
    productUpdateFormValuesSet(state, action) {
      state.formValues = {
        ...createProductUpdateFormValues(),
        ...action.payload,
      };
    },
    productUpdateStateCleared() {
      return createProductUpdateState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.isUpdateProductSubmitting = true;
        state.updateProductError = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isUpdateProductSubmitting = false;
        state.updateProductError = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isUpdateProductSubmitting = false;
        state.updateProductError =
          action.payload ?? UPDATE_PRODUCT_ERROR_MESSAGES.update;
      });
  },
});

export const {
  productUpdateFormValuesSet,
  productUpdateProductIdSet,
  productUpdateStateCleared,
} = productUpdateSlice.actions;

export default productUpdateSlice.reducer;
