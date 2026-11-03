import { createSlice } from "@reduxjs/toolkit";

import { GET_COMPANY_LIST_ERROR_MESSAGES } from "@Enums";
import { getCompanyList } from "@Redux/company/getCompanyList/getCompanyList.action";
import { createGetCompanyListState } from "@Redux/company/getCompanyList/getCompanyList.state";
import {
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

const reduceCompanyTable = (reducer) => (state, action) =>
  reducer(state.companyTable, action);

const companyListSlice = createSlice({
  name: "companyList",
  initialState: createGetCompanyListState(),
  reducers: {
    companyColumnFilterChanged: reduceCompanyTable(
      TABLE_REDUCERS.columnFilterChanged,
    ),
    companyFiltersApplied: reduceCompanyTable(TABLE_REDUCERS.filtersApplied),
    companyFiltersCleared: reduceCompanyTable(TABLE_REDUCERS.filtersCleared),
    companyLimitChanged: reduceCompanyTable(TABLE_REDUCERS.limitChanged),
    companyPageChanged: reduceCompanyTable(TABLE_REDUCERS.pageChanged),
    companySearchChanged: reduceCompanyTable(TABLE_REDUCERS.searchChanged),
    companySearchCommitted: reduceCompanyTable(TABLE_REDUCERS.searchCommitted),
    companySortChanged: reduceCompanyTable(TABLE_REDUCERS.sortChanged),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyList.pending, (state) =>
        tableFetchCases.pending(state.companyTable),
      )
      .addCase(getCompanyList.fulfilled, (state, action) => {
        tableFetchCases.fulfilled(state.companyTable, action);
        state.summary = action.payload.summary;
      })
      .addCase(getCompanyList.rejected, (state, action) =>
        tableFetchCases.rejected(
          state.companyTable,
          action,
          GET_COMPANY_LIST_ERROR_MESSAGES.list,
        ),
      );
  },
});

export const {
  companyColumnFilterChanged,
  companyFiltersApplied,
  companyFiltersCleared,
  companyLimitChanged,
  companyPageChanged,
  companySearchChanged,
  companySearchCommitted,
  companySortChanged,
} = companyListSlice.actions;

export const companyTableActions = {
  columnFilterChanged: companyColumnFilterChanged,
  filtersApplied: companyFiltersApplied,
  filtersCleared: companyFiltersCleared,
  limitChanged: companyLimitChanged,
  pageChanged: companyPageChanged,
  searchChanged: companySearchChanged,
  searchCommitted: companySearchCommitted,
  sortChanged: companySortChanged,
};

export default companyListSlice.reducer;
