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
import tallyProductsReducer from "@Tally/redux/tallyProducts/tallyProducts.slice";
import systemProductsReducer from "@Tally/redux/systemProducts/systemProducts.slice";
import tallyCompanyReducer from "@Tally/redux/company/company.slice";
import tallyCompanySyncReducer from "@Tally/redux/companySync/companySync.slice";
import tallyProductSyncLogReducer from "@Tally/redux/productSyncLog/productSyncLog.slice";
import tallyCompaniesListReducer from "@Tally/redux/tallyCompanies/tallyCompanies.slice";
import { syncErrorListener } from "@Tally/redux/syncError.listener";

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
    tallyProducts: tallyProductsReducer,
    systemProducts: systemProductsReducer,
    tallyCompanies: tallyCompanyReducer,
    tallyCompanySyncs: tallyCompanySyncReducer,
    tallyProductSyncLogs: tallyProductSyncLogReducer,
    tallyCompaniesList: tallyCompaniesListReducer,
});

function rootReducer(state, action) {
  // Clear session data from every slice when the user logs out.
  return appReducer(loggedOut.match(action) ? undefined : state, action);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(syncErrorListener.middleware),
});
