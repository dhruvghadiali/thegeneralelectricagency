import { createSelector } from "@reduxjs/toolkit";

const selectSystemCompaniesState = (state) =>
  state.companiesReducer;

export const selectSystemCompanyOptions = createSelector(
  selectSystemCompaniesState,
  (systemCompanies) => ({
    companies: systemCompanies.items,
    isLoading: systemCompanies.isLoading,
    loadError: systemCompanies.error,
    page: systemCompanies.page,
    search: systemCompanies.search,
    totalPages: systemCompanies.pagination.totalPages,
  }),
);
