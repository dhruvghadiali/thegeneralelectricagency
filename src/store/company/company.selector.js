import { createSelector } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";

const selectCompanyState = (state) => state.companies;
const selectAuthRole = (state) => state.auth.role;

export const isEmployeeCanManageCompanies = createSelector(
  selectAuthRole,
  (role) => role === ROLE_PATHS.EMPLOYEE,
);

export const selectSelectedCompany = createSelector(
  selectCompanyState,
  (state) => state.selectedCompany,
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
