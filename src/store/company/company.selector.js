import { createSelector } from "@reduxjs/toolkit";

import { createTableSelectors } from "@Redux/factories/table.factory";

const selectCompanyState = (state) => state.companies;

export const companyTableSelectors = createTableSelectors(selectCompanyState);

export const selectSelectedCompany = createSelector(
  selectCompanyState,
  (state) => state.selectedCompany,
);

export const selectCompanySummary = createSelector(
  selectCompanyState,
  (companies) => companies.summary,
);
