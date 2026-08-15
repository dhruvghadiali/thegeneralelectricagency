import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@/api/client.api";
import { superAdminEmployeeApi } from "@/api";
import { toEmployeeCreatePayload } from "@/forms/employee/employee.payload";

/**
 * Takes the camelCase form values and hands the snake_case contract to the
 * API. Only the super admin can add people today, so the API module is
 * resolved directly - if more roles gain this permission, swap in a
 * role -> api map the way auth.action.js does.
 */
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (values, { rejectWithValue }) => {
    try {
      return await superAdminEmployeeApi.createEmployee(
        toEmployeeCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
