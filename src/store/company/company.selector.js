import { createSelector } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { createTableSelectors } from "@Redux/factories/table.factory";

const selectCompanyState = (state) => state.companies;
const selectAuthRole = (state) => state.auth.role;

export const isEmployeeCanManageCompanies = createSelector(
  selectAuthRole,
  (role) => role === ROLE_PATHS.EMPLOYEE,
);

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

export const selectCompanyRestoreState = createSelector(
  selectCompanyState,
  ({ companyToRestore, isRestoring, restoreError }) => ({
    companyToRestore,
    isRestoring,
    restoreError,
  }),
);

export const selectCompanyDetailsFormState = createSelector(
  selectCompanyState,
  (state) => state.companyDetailsForm,
);
