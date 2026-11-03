import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi } from "@Api";
import { extractErrorMessage } from "@Api/client.api";
import {
  toCompanyAddressCreatePayload,
  toCompanyAddressUpdatePayload,
  toCompanyContactCreatePayload,
  toCompanyContactUpdatePayload,
  toCompanyCreatePayload,
  toCompanyUpdatePayload,
} from "@Forms/company/companyDetails/companyDetails-api.payload";
import { fromCompanyCreateError } from "@Forms/company/companyDetails/companyDetails-frontend.payload";
import { toCompanyRestorePayload } from "@Forms/company/restoreCompany/restoreCompany-api.payload";

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

export const restoreCompany = createAsyncThunk(
  "companies/restoreCompany",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      await employeeCompanyApi.restoreCompany(
        id,
        toCompanyRestorePayload(values),
      );
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
