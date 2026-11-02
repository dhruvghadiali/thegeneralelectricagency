import { createSlice } from "@reduxjs/toolkit";

import { updateProductInformation } from "@Redux/product/productInformation/productInformation.action";
import {
  createProductInformationFormValues,
  createProductInformationState,
} from "@Redux/product/productInformation/productInformation.state";

const productInformationSlice = createSlice({
  name: "productInformation",
  initialState: createProductInformationState(),
  reducers: {
    productInformationProductIdSet(state, action) {
      state.productId = action.payload;
    },
    productInformationFormValuesSet(state, action) {
      state.formValues = {
        ...createProductInformationFormValues(),
        ...action.payload,
      };
    },
    productInformationFormValuesCleared() {
      return createProductInformationState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProductInformation.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(updateProductInformation.fulfilled, (state) => {
        state.isSubmitting = false;
        state.error = null;
      })
      .addCase(updateProductInformation.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload ?? "Unable to update the product.";
      });
  },
});

export const {
  productInformationFormValuesCleared,
  productInformationFormValuesSet,
  productInformationProductIdSet,
} = productInformationSlice.actions;

export default productInformationSlice.reducer;
