import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeePurchaseCreditApi } from "@Api";
import { extractErrorMessage } from "@Api/client.api";
import { ROLE_PATHS } from "@Enums";
import { toPurchaseCreditCreatePayload } from "@Forms/purchaseCredit/purchaseCredit-api.payload";

export const createPurchaseCredit = createAsyncThunk(
  "purchaseCredits/createPurchaseCredit",
  async (values, { getState, rejectWithValue }) => {
    if (getState().auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue("Only employees can add purchase credits.");
    }

    try {
      return await employeePurchaseCreditApi.createPurchaseCredit(
        toPurchaseCreditCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
