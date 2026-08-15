import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { EMPLOYEE_TABLE_DEFAULTS } from "@Enums";
import { createEmployee, fetchEmployees } from "@Redux/employee/employee.action";
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
 * dialog and the create request.
 */
const initialState = {
  ...createTableState({
    limit: EMPLOYEE_TABLE_DEFAULTS.LIMIT,
    sort: EMPLOYEE_TABLE_DEFAULTS.SORT,
  }),
  dialog: null,
  isCreating: false,
  createError: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    ...TABLE_REDUCERS,
    employeeUpdated(state, action) {
      const index = _.findIndex(state.items, { id: action.payload.id });

      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    employeeDeleted(state, action) {
      state.items = _.reject(state.items, { id: action.payload });
    },
    employeeDialogOpened(state, action) {
      state.dialog = action.payload;
      state.createError = null;
    },
    employeeDialogClosed(state) {
      state.dialog = null;
      state.createError = null;
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
      });
  },
});

export const {
  columnFilterChanged,
  employeeDeleted,
  employeeDialogClosed,
  employeeDialogOpened,
  employeeUpdated,
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
