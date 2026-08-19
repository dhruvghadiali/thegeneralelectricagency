import { createAsyncThunk } from "@reduxjs/toolkit";

import { employeeCompanyApi, superAdminCompanyApi } from "@Api";
import { extractErrorMessage } from "@Api/client.api";
import { ROLE_PATHS } from "@Enums";
import { toCompanyContactListParams } from "@Forms/company/company-contact-api.payload";
import { fromCompanyContactListResponse } from "@Forms/company/company-contact-frontend.payload";

const companyContactApiByRole = {
  [ROLE_PATHS.EMPLOYEE]: employeeCompanyApi,
  [ROLE_PATHS.SUPER_ADMIN]: superAdminCompanyApi,
};

export const fetchCompanyContacts = createAsyncThunk(
  "companyContacts/fetchCompanyContacts",
  async (columns = [], { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, sort, appliedFilters } =
      state.companyContacts;
    const requested = { page, limit };
    const companyContactApi = companyContactApiByRole[state.auth.role];

    if (!companyContactApi) {
      return rejectWithValue(
        "You do not have permission to view the contact person directory.",
      );
    }

    try {
      const response = await companyContactApi.getCompanyContacts(
        toCompanyContactListParams({
          columns,
          page,
          limit,
          search: searchQuery,
          sort,
          filters: appliedFilters,
        }),
        { signal },
      );

      return fromCompanyContactListResponse(response, requested);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
