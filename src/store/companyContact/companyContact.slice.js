import { createSlice } from "@reduxjs/toolkit";

import { SORT_ORDERS, TABLE_DEFAULTS } from "@Enums";
import { fetchCompanyContacts } from "@Redux/companyContact/companyContact.action";
import {
  createTableState,
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

const initialState = {
  ...createTableState({
    limit: TABLE_DEFAULTS.LIMIT,
    sort: [{ field: "contact_person_name", order: SORT_ORDERS.ASC }],
    columnFilters: { is_active: "true" },
  }),
  selectedContact: null,
  summary: {
    totalContacts: 0,
    activeContacts: 0,
    inactiveContacts: 0,
  },
};

const companyContactSlice = createSlice({
  name: "companyContacts",
  initialState,
  reducers: {
    ...TABLE_REDUCERS,
    contactDetailsOpened(state, action) {
      state.selectedContact = action.payload;
    },
    contactDetailsClosed(state) {
      state.selectedContact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyContacts.pending, tableFetchCases.pending)
      .addCase(fetchCompanyContacts.fulfilled, (state, action) => {
        tableFetchCases.fulfilled(state, action);
        state.summary = action.payload.summary;
      })
      .addCase(fetchCompanyContacts.rejected, (state, action) =>
        tableFetchCases.rejected(
          state,
          action,
          "Unable to load company contacts.",
        ),
      );
  },
});

export const {
  columnFilterChanged,
  contactDetailsClosed,
  contactDetailsOpened,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
} = companyContactSlice.actions;

export const companyContactTableActions = {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
};

export default companyContactSlice.reducer;
