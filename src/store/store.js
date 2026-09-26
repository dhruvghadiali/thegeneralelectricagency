import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer, { loggedOut } from "@Redux/auth/auth.slice";
import employeeReducer from "@Redux/employee/employee.slice";
import companyReducer from "@Redux/company/company.slice";
import companyContactReducer from "@Redux/companyContact/companyContact.slice";
import stockReducer from "@Redux/stock/stock.slice";
import productReducer from "@Redux/product/product.slice";
import purchaseReducer from "@Redux/purchase/purchase.slice";
import purchaseCreditReducer from "@Redux/purchaseCredit/purchaseCredit.slice";
import salesOrderReducer from "@Redux/salesOrder/salesOrder.slice";
import tallyReducer from "@Tally/redux/tally.slice";
import tallyCompanyReducer from "@Tally/redux/company/company.slice";
import tallyCompanySyncReducer from "@Tally/redux/companySync/companySync.slice";

const appReducer = combineReducers({
    auth: authReducer,
    employees: employeeReducer,
    companies: companyReducer,
    companyContacts: companyContactReducer,
    stocks: stockReducer,
    products: productReducer,
    purchases: purchaseReducer,
    purchaseCredits: purchaseCreditReducer,
    salesOrders: salesOrderReducer,
    tally: tallyReducer,
    tallyCompanies: tallyCompanyReducer,
    tallyCompanySyncs: tallyCompanySyncReducer,
});

function rootReducer(state, action) {
  // Clear session data from every slice when the user logs out.
  return appReducer(loggedOut.match(action) ? undefined : state, action);
}

export const store = configureStore({
  reducer: rootReducer,
});
