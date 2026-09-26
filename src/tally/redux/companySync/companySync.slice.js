import { createSlice } from "@reduxjs/toolkit";

import {
  createTableState,
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";
import { TALLY_COMPANY_SYNCS_DEFAULTS } from "@Tally/component/companySyncs/companySyncs.defaults";
import { fetchTallyCompanySyncs } from "@Tally/redux/companySync/companySync.action";

const initialState = createTableState({
  limit: TALLY_COMPANY_SYNCS_DEFAULTS.limit,
});

const tallyCompanySyncSlice = createSlice({
  name: "tallyCompanySyncs",
  initialState,
  reducers: TABLE_REDUCERS,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTallyCompanySyncs.pending, tableFetchCases.pending)
      .addCase(fetchTallyCompanySyncs.fulfilled, tableFetchCases.fulfilled)
      .addCase(fetchTallyCompanySyncs.rejected, (state, action) =>
        tableFetchCases.rejected(
          state,
          action,
          "Unable to load Tally company syncs.",
        ),
      );
  },
});

export const {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
} = tallyCompanySyncSlice.actions;

export const tallyCompanySyncTableActions = {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
};

export default tallyCompanySyncSlice.reducer;
