import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeProductApi, extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { toProductInformationUpdatePayload } from "@Redux/product/productInformation/productInformation.api-payload";

export const updateProductInformation = createAsyncThunk(
  "productInformation/updateProduct",
  async (values, { getState, rejectWithValue }) => {
    const state = getState();

    if (state.auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(
        "You do not have permission to update products.",
      );
    }

    const { productId } = state.productInformation;
    if (!productId) {
      return rejectWithValue("The product ID is missing.");
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
