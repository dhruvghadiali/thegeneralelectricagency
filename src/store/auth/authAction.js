import { createAsyncThunk } from "@reduxjs/toolkit";

import { superAdminAuthApi } from "@/api/superAdmin/auth.api";
import { extractErrorMessage } from "@/api/client";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload, { rejectWithValue }) => {
    try {
      return await superAdminAuthApi.signIn(payload);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);
