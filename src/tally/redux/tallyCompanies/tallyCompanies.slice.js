import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { TABLE_PAGE_SIZE_OPTIONS } from "@Enums";
import { isFilterActive } from "@/utils/dataTable.util";
import { TALLY_COMPANIES_STATUS } from "@Tally/enum/tallyCompaniesStatus.enum";
import { syncTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompanies.action";
import { fromTallyCompaniesResponse } from "@Tally/redux/tallyCompanies/tallyCompanies.frontend-payload";

const initialState = {
  response: null,
  companies: [],
  selectedCompanyKey: null,
  status: TALLY_COMPANIES_STATUS.IDLE,
  error: null,
  errorTab: null,
  alertVisible: false,
  errorRequestId: null,
  table: {
    page: 1,
    limit: TABLE_PAGE_SIZE_OPTIONS[0],
    search: "",
    sort: [],
    columnFilters: {},
  },
};

const tallyCompanySlice = createSlice({
  name: "tallyCompanies",
  initialState,
  reducers: {
    companyDetailsOpened(state, action) {
      const company = action.payload;
      state.selectedCompanyKey = company.guid || company.masterId || company.name;
    },
    companyDetailsClosed(state) {
      state.selectedCompanyKey = null;
    },
    syncErrorAlertDismissed(state, action) {
      if (state.errorRequestId === action.payload) {
        state.alertVisible = false;
      }
    },
    searchChanged(state, action) {
      state.table.search = action.payload;
      state.table.page = 1;
    },
    sortChanged(state, action) {
      state.table.sort = action.payload;
      state.table.page = 1;
    },
    columnFilterChanged(state, action) {
      const { key, value } = action.payload;
      if (isFilterActive(value)) state.table.columnFilters[key] = value;
      else delete state.table.columnFilters[key];
      state.table.page = 1;
    },
    filtersCleared(state) {
      state.table.search = "";
      state.table.sort = [];
      state.table.columnFilters = {};
      state.table.page = 1;
    },
    pageChanged(state, action) {
      state.table.page = Math.max(1, _.toInteger(action.payload));
    },
    limitChanged(state, action) {
      const limit = _.toInteger(action.payload);
      state.table.limit = TABLE_PAGE_SIZE_OPTIONS.includes(limit)
        ? limit
        : TABLE_PAGE_SIZE_OPTIONS[0];
      state.table.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncTallyCompanies.pending, (state) => {
        state.status = TALLY_COMPANIES_STATUS.LOADING;
        state.error = null;
        state.errorTab = null;
        state.alertVisible = false;
        state.errorRequestId = null;
      })
      .addCase(syncTallyCompanies.fulfilled, (state, action) => {
        state.response = action.payload;
        state.companies = fromTallyCompaniesResponse(action.payload);
        state.selectedCompanyKey = null;
        state.status = TALLY_COMPANIES_STATUS.SUCCEEDED;
        state.table.page = 1;
      })
      .addCase(syncTallyCompanies.rejected, (state, action) => {
        if (action.meta.condition) return;
        state.status = action.meta.aborted
          ? TALLY_COMPANIES_STATUS.IDLE
          : TALLY_COMPANIES_STATUS.FAILED;
        state.error =
          action.meta.aborted
            ? null
            : action.payload || action.error.message || "Unable to sync companies.";
        state.errorTab = action.meta.arg?.errorTab ?? null;
        state.alertVisible = !action.meta.aborted && Boolean(state.errorTab);
        state.errorRequestId = action.meta.requestId;
      });
  },
});

export const {
  companyDetailsOpened,
  companyDetailsClosed,
  syncErrorAlertDismissed,
  searchChanged,
  sortChanged,
  columnFilterChanged,
  filtersCleared,
  pageChanged,
  limitChanged,
} = tallyCompanySlice.actions;

export default tallyCompanySlice.reducer;
