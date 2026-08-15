import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { extractErrorMessage } from "@/api/client.api";
import { employeeAuthApi, superAdminAuthApi, warehouseManagerAuthApi } from "@/api";
import { fromSignInResponse, toSignInPayload } from "@/forms/signin/signin.payload";

const authApiByRole = {
  [ROLE_PATHS.SUPER_ADMIN]: superAdminAuthApi,
  [ROLE_PATHS.EMPLOYEE]: employeeAuthApi,
  [ROLE_PATHS.WAREHOUSE_MANAGER]: warehouseManagerAuthApi,
};

/**
 * The role selects which endpoint to call and is carried through to the
 * result: it is already implied by the endpoint, and taking it from the
 * request keeps it a ROLE_PATHS value, which the sidebar and role label
 * lookups rely on.
 */
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (values, { rejectWithValue }) => {
    try {
      const { role, ...credentials } = values;
      const response = await authApiByRole[role].signIn(
        toSignInPayload(credentials),
      );
      return { ...fromSignInResponse(response), role };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);
