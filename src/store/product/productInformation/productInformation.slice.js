import { createSlice } from "@reduxjs/toolkit";

import {
  createProductInformationFormValues,
  createProductInformationState,
} from "@Redux/product/productInformation/productInformation.state";

const productInformationSlice = createSlice({
  name: "productInformation",
  initialState: createProductInformationState(),
  reducers: {
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
});

export const {
  productInformationFormValuesCleared,
  productInformationFormValuesSet,
} = productInformationSlice.actions;

export default productInformationSlice.reducer;
