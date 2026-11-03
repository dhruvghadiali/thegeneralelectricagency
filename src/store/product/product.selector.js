import { createSelector } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";

const selectAuthRole = (state) => state.auth.role;

export const isEmployeeCanManageProducts = createSelector(
  selectAuthRole,
  (role) => role === ROLE_PATHS.EMPLOYEE,
);
