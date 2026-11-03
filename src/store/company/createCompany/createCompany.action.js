import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { CREATE_COMPANY_ERROR_MESSAGES } from "@Enums";
import { isEmployeeCanManageCompanies } from "@Redux/company/company.selector";
import { toCompanyInformationCreatePayload } from "@Redux/company/createCompany/createCompany.api-payload";

export const createCompany = createAsyncThunk(
  "companyCreate/createCompany",
  async (values, { getState, rejectWithValue }) => {
    if (!isEmployeeCanManageCompanies(getState())) {
      return rejectWithValue(CREATE_COMPANY_ERROR_MESSAGES.permission);
    }

    try {
      return await employeeCompanyApi.createCompany(
        toCompanyInformationCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
