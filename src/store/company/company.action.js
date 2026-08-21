import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, superAdminCompanyApi } from "@Api";
import { extractErrorMessage } from "@Api/client.api";
import { ROLE_PATHS } from "@Enums";
import {
  toCompanyAddressCreatePayload,
  toCompanyAddressUpdatePayload,
  toCompanyContactCreatePayload,
  toCompanyContactUpdatePayload,
  toCompanyCreatePayload,
  toCompanyUpdatePayload,
} from "@Forms/company/companyDetails/companyDetails-api.payload";
import { fromCompanyCreateError } from "@Forms/company/companyDetails/companyDetails-frontend.payload";
import { toCompanyListParams } from "@Tables/company/companyTable.api-payload";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";

const companyListApiByRole = {
  [ROLE_PATHS.EMPLOYEE]: employeeCompanyApi,
  [ROLE_PATHS.SUPER_ADMIN]: superAdminCompanyApi,
};

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async (columns = [], { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, sort, appliedFilters } = state.companies;
    const requested = { page, limit };
    const companyApi = companyListApiByRole[state.auth.role];

    if (!companyApi) {
      return rejectWithValue(
        "You do not have permission to view the company directory.",
      );
    }

    try {
      const response = await companyApi.getCompanies(
        toCompanyListParams({
          columns,
          page,
          limit,
          search: searchQuery,
          sort,
          filters: appliedFilters,
        }),
        { signal },
      );

      return fromCompanyListResponse(response, requested);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
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

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      return await employeeCompanyApi.updateCompany(
        id,
        toCompanyUpdatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(fromCompanyCreateError(error));
    }
  },
);

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

export const createCompanyAddress = createAsyncThunk(
  "companies/createCompanyAddress",
  async ({ companyId, values }, { rejectWithValue }) => {
    try {
      return await employeeCompanyApi.createCompanyAddress(
        toCompanyAddressCreatePayload(companyId, values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const createCompanyContact = createAsyncThunk(
  "companies/createCompanyContact",
  async ({ companyId, addressId, values }, { rejectWithValue }) => {
    try {
      return await employeeCompanyApi.createCompanyContact(
        toCompanyContactCreatePayload(companyId, addressId, values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const deleteCompanyContact = createAsyncThunk(
  "companies/deleteCompanyContact",
  async (id, { rejectWithValue }) => {
    try {
      await employeeCompanyApi.deleteCompanyContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const deleteCompanyAddress = createAsyncThunk(
  "companies/deleteCompanyAddress",
  async (id, { rejectWithValue }) => {
    try {
      await employeeCompanyApi.deleteCompanyAddress(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const updateCompanyAddress = createAsyncThunk(
  "companies/updateCompanyAddress",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      return await employeeCompanyApi.updateCompanyAddress(
        id,
        toCompanyAddressUpdatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const updateCompanyContact = createAsyncThunk(
  "companies/updateCompanyContact",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      return await employeeCompanyApi.updateCompanyContact(
        id,
        toCompanyContactUpdatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
