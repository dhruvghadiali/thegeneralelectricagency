import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@Api";
import { ROLE_PATHS } from "@Enums";
import { getTallyCompanySyncs } from "@Tally/api";
import { toTallyCompanySyncListParams } from "@Tally/component/companySyncs/companySyncs.api-payload";
import { fromTallyCompanySyncListResponse } from "@Tally/component/companySyncs/companySyncs.frontend-payload";

export const fetchTallyCompanySyncs = createAsyncThunk(
  "tallyCompanySyncs/fetchTallyCompanySyncs",
  async (columns = [], { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, appliedFilters } =
      state.tallyCompanySyncs;
    const requested = { page, limit };

    if (state.auth.role !== ROLE_PATHS.TECH_SUPPORT) {
      return rejectWithValue(
        "You do not have permission to view Tally company syncs.",
      );
    }

    try {
      const response = await getTallyCompanySyncs(
        toTallyCompanySyncListParams({
          columns,
          page,
          limit,
          search: searchQuery,
          filters: appliedFilters,
        }),
        { signal },
      );

      return fromTallyCompanySyncListResponse(response, requested);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
