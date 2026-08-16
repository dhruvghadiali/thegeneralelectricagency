import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi } from "@Api";
import { getDummyCompanyList } from "@screenComponent/companies/company.data";
import {
  fromCompanyCreateError,
  fromCompanyListResponse,
  toCompanyCreatePayload,
} from "@Forms/company/company.payload";

/**
 * Temporary list source with the same thunk boundary as the future GET API.
 * When the endpoint lands, replace getDummyCompanyList with the company API
 * call and keep the screen, slice and table controller unchanged.
 */
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async (_, { getState }) => {
    const { page, limit, searchQuery } = getState().companies;
    const requested = { page, limit };
    const response = getDummyCompanyList({
      page,
      limit,
      search: searchQuery,
    });

    return fromCompanyListResponse(response, requested);
  },
);

export const createCompany = createAsyncThunk(
  "companies/createCompany",
  async (values, { rejectWithValue }) => {
    try {
      return await employeeCompanyApi.createCompany(
        toCompanyCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(fromCompanyCreateError(error));
    }
  },
);
