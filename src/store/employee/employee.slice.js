import { createSlice } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";

const initialState = {
  items: [
    { id: 1, firstName: "Aarav", lastName: "Mehta", username: "aarav.mehta", email: "aarav.mehta@tges.in", phone: "+91 98765 41021", role: ROLE_PATHS.EMPLOYEE, joined: "12 Jan 2024" },
    { id: 2, firstName: "Priya", lastName: "Shah", username: "priya.shah", email: "priya.shah@tges.in", phone: "+91 98204 77319", role: ROLE_PATHS.EMPLOYEE, joined: "04 Sep 2022" },
    { id: 3, firstName: "Rohan", lastName: "Patel", username: "rohan.patel", email: "rohan.patel@tges.in", phone: "+91 99871 23406", role: ROLE_PATHS.WAREHOUSE_MANAGER, joined: "21 Mar 2025" },
    { id: 4, firstName: "Neha", lastName: "Iyer", username: "neha.iyer", email: "neha.iyer@tges.in", phone: "+91 97690 85214", role: ROLE_PATHS.EMPLOYEE, joined: "17 Jul 2023" },
    { id: 5, firstName: "Kabir", lastName: "Joshi", username: "kabir.joshi", email: "kabir.joshi@tges.in", phone: "+91 98193 64528", role: ROLE_PATHS.EMPLOYEE, joined: "08 Nov 2021" },
    { id: 6, firstName: "Ananya", lastName: "Rao", username: "ananya.rao", email: "ananya.rao@tges.in", phone: "+91 99201 30847", role: ROLE_PATHS.WAREHOUSE_MANAGER, joined: "29 May 2024" },
  ],
  search: "",
  roleFilter: "all",
  dialog: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    employeeAdded: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(employee) {
        const joined = new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date());

        return { payload: { ...employee, id: Date.now(), joined } };
      },
    },
    employeeUpdated(state, action) {
      const index = state.items.findIndex(
        (employee) => employee.id === action.payload.id,
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    employeeDeleted(state, action) {
      state.items = state.items.filter(
        (employee) => employee.id !== action.payload,
      );
    },
    employeeSearchChanged(state, action) {
      state.search = action.payload;
    },
    employeeRoleFilterChanged(state, action) {
      state.roleFilter = action.payload;
    },
    employeeDialogOpened(state, action) {
      state.dialog = action.payload;
    },
    employeeDialogClosed(state) {
      state.dialog = null;
    },
  },
});

export const {
  employeeAdded,
  employeeDeleted,
  employeeDialogClosed,
  employeeDialogOpened,
  employeeRoleFilterChanged,
  employeeSearchChanged,
  employeeUpdated,
} = employeeSlice.actions;

export default employeeSlice.reducer;
