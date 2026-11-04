import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi } from "@Api";
import { extractErrorMessage } from "@Api/client.api";

export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (id, { rejectWithValue }) => {
    try {
      await employeeCompanyApi.deleteCompany(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
