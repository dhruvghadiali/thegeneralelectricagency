import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { employeePurchaseCreditApi } from "@Api";
import { extractErrorMessage } from "@Api/client.api";
import {
  toPurchaseCreditCreatePayload,
  toPurchaseCreditPaymentCreatePayload,
  toPurchaseCreditPaymentPlanningCreatePayload,
  toPurchaseCreditPaymentPlanningUpdatePayload,
  toPurchaseCreditPaymentUpdatePayload,
  toPurchaseCreditPlannedPaymentCreatePayload,
  toPurchaseCreditUpdatePayload,
} from "@Forms/purchaseCredit/purchaseCredit-api.payload";
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

export const updatePurchaseCredit = createAsyncThunk(
  "purchaseCredits/updatePurchaseCredit",
  async ({ id, values }, { getState, rejectWithValue }) => {
    const allowedRoles = [ROLE_PATHS.EMPLOYEE, ROLE_PATHS.SUPER_ADMIN];

    if (!allowedRoles.includes(getState().auth.role)) {
      return rejectWithValue(
        "Only employees and super admins can update purchase credits.",
      );
    }

    try {
      return await employeePurchaseCreditApi.updatePurchaseCredit(
        id,
        toPurchaseCreditUpdatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const updatePurchaseCreditPayment = createAsyncThunk(
  "purchaseCredits/updatePurchaseCreditPayment",
  async (
    { purchaseCreditId, paymentId, values },
    { getState, rejectWithValue },
  ) => {
    const allowedRoles = [ROLE_PATHS.EMPLOYEE, ROLE_PATHS.SUPER_ADMIN];

    if (!allowedRoles.includes(getState().auth.role)) {
      return rejectWithValue(
        "Only employees and super admins can update purchase credit payments.",
      );
    }

    try {
      return await employeePurchaseCreditApi.updatePurchaseCreditPayment(
        purchaseCreditId,
        paymentId,
        toPurchaseCreditPaymentUpdatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const createPurchaseCreditPayment = createAsyncThunk(
  "purchaseCredits/createPurchaseCreditPayment",
  async (
    { purchaseCreditId, values },
    { getState, rejectWithValue },
  ) => {
    const allowedRoles = [ROLE_PATHS.EMPLOYEE, ROLE_PATHS.SUPER_ADMIN];

    if (!allowedRoles.includes(getState().auth.role)) {
      return rejectWithValue(
        "Only employees and super admins can add purchase credit payments.",
      );
    }

    try {
      return await employeePurchaseCreditApi.createPurchaseCreditPayment(
        purchaseCreditId,
        toPurchaseCreditPaymentCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const createPurchaseCreditPaymentPlanning = createAsyncThunk(
  "purchaseCredits/createPurchaseCreditPaymentPlanning",
  async (
    { purchaseCreditId, values },
    { getState, rejectWithValue },
  ) => {
    const allowedRoles = [ROLE_PATHS.EMPLOYEE, ROLE_PATHS.SUPER_ADMIN];

    if (!allowedRoles.includes(getState().auth.role)) {
      return rejectWithValue(
        "Only employees and super admins can add purchase credit payment plans.",
      );
    }

    try {
      return await employeePurchaseCreditApi.createPurchaseCreditPaymentPlanning(
        purchaseCreditId,
        toPurchaseCreditPaymentPlanningCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const updatePurchaseCreditPaymentPlanning = createAsyncThunk(
  "purchaseCredits/updatePurchaseCreditPaymentPlanning",
  async (
    { purchaseCreditId, paymentPlanningId, values },
    { getState, rejectWithValue },
  ) => {
    const allowedRoles = [ROLE_PATHS.EMPLOYEE, ROLE_PATHS.SUPER_ADMIN];

    if (!allowedRoles.includes(getState().auth.role)) {
      return rejectWithValue(
        "Only employees and super admins can update purchase credit payment plans.",
      );
    }

    try {
      return await employeePurchaseCreditApi.updatePurchaseCreditPaymentPlanning(
        purchaseCreditId,
        paymentPlanningId,
        toPurchaseCreditPaymentPlanningUpdatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const completePurchaseCreditPaymentPlanning = createAsyncThunk(
  "purchaseCredits/completePurchaseCreditPaymentPlanning",
  async (
    {
      purchaseCreditId,
      paymentPlanningId,
      paymentValues,
      paymentPlanningValues,
    },
    { getState, rejectWithValue },
  ) => {
    const allowedRoles = [ROLE_PATHS.EMPLOYEE, ROLE_PATHS.SUPER_ADMIN];

    if (!allowedRoles.includes(getState().auth.role)) {
      return rejectWithValue(
        "Only employees and super admins can complete purchase credit payment plans.",
      );
    }

    try {
      const [payment, paymentPlanning] = await Promise.all([
        employeePurchaseCreditApi.createPurchaseCreditPayment(
          purchaseCreditId,
          toPurchaseCreditPlannedPaymentCreatePayload(paymentValues),
        ),
        employeePurchaseCreditApi.updatePurchaseCreditPaymentPlanning(
          purchaseCreditId,
          paymentPlanningId,
          toPurchaseCreditPaymentPlanningUpdatePayload({
            ...paymentPlanningValues,
            isPaymentCompleted: true,
          }),
        ),
      ]);

      return { payment, paymentPlanning };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
