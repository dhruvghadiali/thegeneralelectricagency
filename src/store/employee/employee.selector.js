import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import { createTableSelectors } from "@Redux/factories/table.factory";

const selectEmployeeState = (state) => state.employees;

/**
 * Rows, pagination, query and status all come from the shared table
 * selectors; what is below is specific to this screen.
 */
export const employeeTableSelectors = createTableSelectors(selectEmployeeState);

export const selectEmployeeDialogState = createSelector(
  selectEmployeeState,
  ({
    dialog,
    isCreating,
    createError,
    isUpdating,
    updateError,
    isDeleting,
    deleteError,
  }) => ({
    dialog,
    isCreating,
    createError,
    isUpdating,
    updateError,
    isDeleting,
    deleteError,
  }),
);

/**
 * Per-role counts for the summary cards. These can only describe the rows
 * actually loaded, which is why the cards say so - the authoritative total
 * comes from the backend's `pagination.total`.
 */
export const selectEmployeeRoleCounts = createSelector(
  employeeTableSelectors.selectItems,
  (employees) => _.countBy(employees, "role"),
);

export default employeeTableSelectors;
