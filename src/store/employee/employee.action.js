import { createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage } from "@/api/client.api";
import { superAdminEmployeeApi } from "@/api";
import {
  fromEmployeeListResponse,
  toEmployeeCreatePayload,
  toEmployeeListParams,
} from "@/forms/employee/employee.payload";

/**
 * Reads its query straight from the store rather than taking arguments, so
 * every caller - the table effect, a manual refresh, the refetch after a
 * create - always sends the filters that are currently applied and can never
 * fire with a stale closure.
 *
 * The column definitions come in as the argument instead: they say which
 * filter is a date and which is a number, and that belongs to the screen. It
 * keeps the store from importing a component module to find out.
 *
 * The `signal` is handed to axios: when the table aborts a request that a
 * newer keystroke, sort or page change has already replaced, the in-flight
 * call is cancelled instead of landing late and overwriting fresher rows.
 */
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (columns = [], { getState, signal, rejectWithValue }) => {
    const { page, limit, searchQuery, sort, appliedFilters } = getState().employees;
    const requested = { page, limit };

    try {
      const response = await superAdminEmployeeApi.getEmployees(
        toEmployeeListParams({
          columns,
          page,
          limit,
          search: searchQuery,
          sort,
          filters: appliedFilters,
        }),
        { signal },
      );

      return fromEmployeeListResponse(response, requested);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

/**
 * Takes the camelCase form values and hands the snake_case contract to the
 * API. Only the super admin can add people today, so the API module is
 * resolved directly - if more roles gain this permission, swap in a
 * role -> api map the way auth.action.js does.
 */
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (values, { rejectWithValue }) => {
    try {
      return await superAdminEmployeeApi.createEmployee(
        toEmployeeCreatePayload(values),
      );
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
