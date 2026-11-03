import { createAsyncThunk } from "@reduxjs/toolkit";

import { UPDATE_PRODUCT_ERROR_MESSAGES } from "@Enums";
import { employeeProductApi, extractErrorMessage } from "@Api";
import { isEmployeeCanManageProducts } from "@Redux/product/product.selector";
import { toProductInformationUpdatePayload } from "@Redux/product/updateProduct/updateProduct.api-payload";

export const updateProduct = createAsyncThunk(
  "productUpdate/updateProduct",
  async (values, { getState, rejectWithValue }) => {
    const state = getState();

    if (!isEmployeeCanManageProducts(state)) {
      return rejectWithValue(UPDATE_PRODUCT_ERROR_MESSAGES.permission);
    }

    const { productId } = state.productUpdate;
    if (!productId) {
      return rejectWithValue(UPDATE_PRODUCT_ERROR_MESSAGES.missingProductId);
    }

    try {
      return await employeeProductApi.updateProduct(
        productId,
        toProductInformationUpdatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
