import { createAsyncThunk } from "@reduxjs/toolkit";

import { CREATE_PRODUCT_ERROR_MESSAGES } from "@Enums";
import { employeeProductApi, extractErrorMessage } from "@Api";
import { isEmployeeCanManageProducts } from "@Redux/product/product.selector";
import { toProductInformationCreatePayload } from "@Redux/product/createProduct/createProduct.api-payload";

export const createProduct = createAsyncThunk(
  "productCreate/createProduct",
  async (values, { getState, rejectWithValue }) => {
    if (!isEmployeeCanManageProducts(getState())) {
      return rejectWithValue(CREATE_PRODUCT_ERROR_MESSAGES.permission);
    }

    try {
      return await employeeProductApi.createProduct(
        toProductInformationCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
