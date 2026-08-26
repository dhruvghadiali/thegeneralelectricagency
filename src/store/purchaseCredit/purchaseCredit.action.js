import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { employeePurchaseCreditApi } from "@Api";
import { extractErrorMessage } from "@Api/client.api";
import { toPurchaseCreditCreatePayload } from "@Forms/purchaseCredit/purchaseCredit-api.payload";
import { toPurchaseCreditListParams } from "@Tables/purchaseCredit/purchaseCreditTable.api-payload";
import { fromPurchaseCreditListResponse } from "@Tables/purchaseCredit/purchaseCreditTable.frontend-payload";

export const fetchPurchaseCredits = createAsyncThunk(
  "purchaseCredits/fetchPurchaseCredits",
  async (columns = [], { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, sort, appliedFilters } =
      state.purchaseCredits;

    const allowedRoles = [ROLE_PATHS.EMPLOYEE, ROLE_PATHS.SUPER_ADMIN];

    if (!allowedRoles.includes(state.auth.role)) {
      return rejectWithValue(
        "Only employees and super admins can view purchase credits.",
      );
    }

    try {
      const response = await employeePurchaseCreditApi.getPurchaseCredits(
        toPurchaseCreditListParams({
          columns,
          page,
          limit,
          search: searchQuery,
          sort,
          filters: appliedFilters,
        }),
        { signal },
      );

      return fromPurchaseCreditListResponse(response, { page, limit });
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const createPurchaseCredit = createAsyncThunk(
  "purchaseCredits/createPurchaseCredit",
  async (values, { getState, rejectWithValue }) => {
    const allowedRoles = [ROLE_PATHS.EMPLOYEE, ROLE_PATHS.SUPER_ADMIN];

    if (!allowedRoles.includes(getState().auth.role)) {
      return rejectWithValue(
        "Only employees and super admins can add purchase credits.",
      );
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
