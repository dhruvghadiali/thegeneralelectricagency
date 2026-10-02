import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { TABLE_PAGE_SIZE_OPTIONS } from "@Enums";
import { isFilterActive } from "@/utils/dataTable.util";
import { SYSTEM_COMPANIES_STATUS } from "@Tally/enum/systemCompaniesStatus.enum";
import { fetchSystemCompanies } from "@Tally/redux/systemCompanies/systemCompanies.action";

const FILTER_FIELDS = ["company_name", "company_id", "company_code", "gst_number"];

const initialState = {
  companies: [],
  selectedCompanyKey: null,
  status: SYSTEM_COMPANIES_STATUS.IDLE,
  error: null,
  search: "",
  columnFilters: {},
  page: 1,
  limit: TABLE_PAGE_SIZE_OPTIONS[0],
};

const systemCompaniesSlice = createSlice({
  name: "systemCompanies",
  initialState,
  reducers: {
    companyDetailsOpened(state, action) {
      const company = action.payload;
      state.selectedCompanyKey = company._id || company.company_id;
    },
    companyDetailsClosed(state) {
      state.selectedCompanyKey = null;
    },
    searchChanged(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    columnFilterChanged(state, action) {
      const { key, value } = action.payload;
      if (!FILTER_FIELDS.includes(key)) return;
      if (isFilterActive(value)) state.columnFilters[key] = value;
      else delete state.columnFilters[key];
      state.page = 1;
    },
    filtersCleared(state) {
      state.search = "";
      state.columnFilters = {};
      state.page = 1;
    },
    pageChanged(state, action) {
      state.page = Math.max(1, _.toInteger(action.payload));
    },
    limitChanged(state, action) {
      const limit = _.toInteger(action.payload);
      state.limit = TABLE_PAGE_SIZE_OPTIONS.includes(limit)
        ? limit
        : TABLE_PAGE_SIZE_OPTIONS[0];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemCompanies.pending, (state) => {
        state.status = SYSTEM_COMPANIES_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchSystemCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.selectedCompanyKey = null;
        state.status = SYSTEM_COMPANIES_STATUS.SUCCEEDED;
        state.page = 1;
      })
      .addCase(fetchSystemCompanies.rejected, (state, action) => {
        if (action.meta.condition) return;
        state.companies = [];
        state.selectedCompanyKey = null;
        state.status = action.meta.aborted
          ? SYSTEM_COMPANIES_STATUS.IDLE
          : SYSTEM_COMPANIES_STATUS.FAILED;
        state.error = action.meta.aborted
          ? null
          : action.payload || action.error.message || "Unable to load system companies.";
      });
  },
});

export const {
  companyDetailsOpened,
  companyDetailsClosed,
  searchChanged,
  columnFilterChanged,
  filtersCleared,
  pageChanged,
  limitChanged,
} = systemCompaniesSlice.actions;

export default systemCompaniesSlice.reducer;
