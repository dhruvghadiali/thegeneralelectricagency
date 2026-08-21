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

export const selectCompanyDirectoryView = createSelector(
  selectCompanyState,
  (state) => state.directoryView,
);

export const selectCompanyDeleteState = createSelector(
  selectCompanyState,
  ({ companyToDelete, isDeleting, deleteError }) => ({
    companyToDelete,
    isDeleting,
    deleteError,
  }),
);

export const selectCompanyDetailsFormState = createSelector(
  selectCompanyState,
  (state) => state.companyDetailsForm,
);
