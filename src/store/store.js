import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@Redux/auth/auth.slice";
import employeeReducer from "@Redux/employee/employee.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
  },
});
