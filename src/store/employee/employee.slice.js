import { createSlice } from "@reduxjs/toolkit";

import { EMPLOYEE_TABLE_DEFAULTS } from "@Enums";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "@Redux/employee/employee.action";
import {
  createTableState,
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

/**
 * Everything about paging, searching, sorting and filtering comes from the
 * shared table factory - spreading its reducers in keeps the generated
 * actions namespaced to this slice (`employees/pageChanged`) while the
 * behaviour is defined once for every list in the app.
 *
 * What is left here is what is genuinely about employees: the add/edit/delete
 * dialog and the employee mutation requests.
 */
const initialState = {
  ...createTableState({
    limit: EMPLOYEE_TABLE_DEFAULTS.LIMIT,
    sort: EMPLOYEE_TABLE_DEFAULTS.SORT,
    columnFilters: EMPLOYEE_TABLE_DEFAULTS.FILTERS,
  }),
  dialog: null,
  isCreating: false,
  createError: null,
  isUpdating: false,
  updateError: null,
  isDeleting: false,
  deleteError: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    ...TABLE_REDUCERS,
    employeeDialogOpened(state, action) {
      state.dialog = action.payload;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },
    employeeDialogClosed(state) {
      state.dialog = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, tableFetchCases.pending)
      .addCase(fetchEmployees.fulfilled, tableFetchCases.fulfilled)
      .addCase(fetchEmployees.rejected, (state, action) =>
        tableFetchCases.rejected(state, action, "Unable to load employees."),
      )
      .addCase(createEmployee.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })
      .addCase(createEmployee.fulfilled, (state) => {
        state.isCreating = false;
        state.createError = null;
        state.dialog = null;
        // The list is server-paged, so the new row is picked up by the
        // refetch the screen fires rather than being spliced in locally.
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.payload ?? "Unable to add employee.";
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.isUpdating = false;
        state.updateError = null;
        state.dialog = null;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload ?? "Unable to update employee.";
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })
      .addCase(deleteEmployee.fulfilled, (state) => {
        state.isDeleting = false;
        state.deleteError = null;
        state.dialog = null;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteError = action.payload ?? "Unable to delete employee.";
      });
  },
});

export const {
  columnFilterChanged,
  employeeDialogClosed,
  employeeDialogOpened,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
} = employeeSlice.actions;

/** The table controller takes its actions as one object. */
export const employeeTableActions = {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
};

export default employeeSlice.reducer;
