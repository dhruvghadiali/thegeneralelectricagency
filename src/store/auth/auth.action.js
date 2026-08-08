import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { extractErrorMessage } from "@/api/client.api";
import { employeeAuthApi, superAdminAuthApi, warehouseManagerAuthApi } from "@/api";

const authApiByRole = {
  [ROLE_PATHS.SUPER_ADMIN]: superAdminAuthApi,
  [ROLE_PATHS.EMPLOYEE]: employeeAuthApi,
  [ROLE_PATHS.WAREHOUSE_MANAGER]: warehouseManagerAuthApi,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload, { rejectWithValue }) => {
    try {
      const { role, ...credentials } = payload;
      const response = await authApiByRole[role].signIn(credentials);
      return { ...response, role };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);
