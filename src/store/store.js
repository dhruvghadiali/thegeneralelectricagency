import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@Redux/auth/auth.slice";
import employeeReducer from "@Redux/employee/employee.slice";
import companyReducer from "@Redux/company/company.slice";
import stockReducer from "@Redux/stock/stock.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    companies: companyReducer,
    stocks: stockReducer,
  },
});
