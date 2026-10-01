import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { systemProductsApi } from "@Tally/api/systemProducts/systemProducts.api";
import { SYNC_PRODUCTS_SAVE_STATUS } from "@Tally/enum/syncProductsSaveStatus.enum";
import { selectNewProducts } from "@Tally/redux/syncProducts/syncProducts.selector";
import { toSystemProductCreatePayload } from "@Tally/redux/syncProducts/syncProducts.api-payload";
import { fetchSystemProducts } from "@Tally/redux/systemProducts/systemProducts.action";

export const saveSyncProducts = createAsyncThunk(
  "syncProducts/save",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    if (state.auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue(
        "You do not have permission to save Tally products.",
      );
    }

    const selectedIds = new Set(state.syncProducts.selectedRowKeys);
    const products = selectNewProducts(state).filter((product) =>
      selectedIds.has(product.guid),
    );
    if (products.length === 0) {
      return rejectWithValue("Select at least one new product to save.");
    }

    const savedIds = [];
    const errors = [];
    for (const product of products) {
      const payload = toSystemProductCreatePayload(product);
      try {
        await systemProductsApi.createProduct(payload);
        savedIds.push(product.guid);
      } catch (error) {
        errors.push(
          `${product.name || product.guid}: ${extractErrorMessage(error)}`,
        );
      }
    }

    if (savedIds.length > 0) {
      try {
        await dispatch(fetchSystemProducts()).unwrap();
      } catch (error) {
        const message =
          typeof error === "string" ? error : extractErrorMessage(error);
        errors.push(
          `Products were saved, but the list could not be refreshed: ${message}`,
        );
      }
    }

    return { savedIds, errors };
  },
  {
    condition: (_, { getState }) =>
      getState().syncProducts.saveStatus !== SYNC_PRODUCTS_SAVE_STATUS.LOADING,
  },
);
