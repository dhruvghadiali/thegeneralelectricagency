import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { UPDATE_COMPANY_ERROR_MESSAGES } from "@Enums";
import { isEmployeeCanManageCompanies } from "@Redux/company/company.selector";
import {
  toCompanyAddressUpdatePayload,
  toCompanyProfileUpdatePayload,
} from "@Redux/company/updateCompany/updateCompany.api-payload";

export const updateCompanyInformation = createAsyncThunk(
  "companyUpdate/updateCompanyInformation",
  async (values, { getState, rejectWithValue }) => {
    const state = getState();

    if (!isEmployeeCanManageCompanies(state)) {
      return rejectWithValue(UPDATE_COMPANY_ERROR_MESSAGES.permission);
    }

    const { companyId, addressId } = state.companyUpdate;
    if (!companyId) {
      return rejectWithValue(UPDATE_COMPANY_ERROR_MESSAGES.missingCompanyId);
    }
    if (!addressId) {
      return rejectWithValue(UPDATE_COMPANY_ERROR_MESSAGES.missingAddressId);
    }

    try {
      const [company, address] = await Promise.all([
        employeeCompanyApi.updateCompany(
          companyId,
          toCompanyProfileUpdatePayload(values),
        ),
        employeeCompanyApi.updateCompanyAddress(
          addressId,
          toCompanyAddressUpdatePayload(values),
        ),
      ]);

      return { company, address };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
