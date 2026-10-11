import { createSelector } from "@reduxjs/toolkit";

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
    isRestoring,
    restoreError,
    isDeleting,
    deleteError,
  }) => ({
    dialog,
    isCreating,
    createError,
    isUpdating,
    updateError,
    isRestoring,
    restoreError,
    isDeleting,
    deleteError,
  }),
);

/** Directory-wide counts returned by the list endpoint's summary object. */
export const selectEmployeeSummary = createSelector(
  selectEmployeeState,
  (employees) => employees.summary,
);

export default employeeTableSelectors;
