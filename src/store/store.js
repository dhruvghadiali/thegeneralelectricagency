import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer, { loggedOut } from "@Redux/auth/auth.slice";
import employeeReducer from "@Redux/employee/employee.slice";
import companyReducer from "@Redux/company/company.slice";
import companyContactReducer from "@Redux/companyContact/companyContact.slice";
import stockReducer from "@Redux/stock/stock.slice";
import productReducer from "@Redux/product/product.slice";
import syncPendingProductsReducer from "@Redux/product/syncPending/syncPending.slice";
import purchaseReducer from "@Redux/purchase/purchase.slice";
import purchaseCreditReducer from "@Redux/purchaseCredit/purchaseCredit.slice";
import salesOrderReducer from "@Redux/salesOrder/salesOrder.slice";
import tallyProductsReducer from "@Tally/redux/tallyProducts/tallyProducts.slice";
import systemProductsReducer from "@Tally/redux/systemProducts/systemProducts.slice";
import systemCompaniesReducer from "@Tally/redux/systemCompanies/systemCompanies.slice";
import syncProductsReducer from "@Tally/redux/syncProducts/syncProducts.slice";
import tallyCompanyReducer from "@Tally/redux/tallyCompanies/tallyCompanies.slice";
import tallyCompanySyncLogReducer from "@Tally/redux/companySyncLog/companySyncLog.slice";
import tallyProductSyncLogReducer from "@Tally/redux/productSyncLog/productSyncLog.slice";
import syncCompaniesReducer from "@Tally/redux/syncCompanies/syncCompanies.slice";
import { syncErrorListener } from "@Tally/redux/syncError.listener";

const appReducer = combineReducers({
    auth: authReducer,
    employees: employeeReducer,
    companies: companyReducer,
    companyContacts: companyContactReducer,
    stocks: stockReducer,
    products: productReducer,
    syncPendingProducts: syncPendingProductsReducer,
    purchases: purchaseReducer,
    purchaseCredits: purchaseCreditReducer,
    salesOrders: salesOrderReducer,
    tallyProducts: tallyProductsReducer,
    tallyCompanies: tallyCompanyReducer,
    systemProducts: systemProductsReducer,
    systemCompanies: systemCompaniesReducer,
    syncProducts: syncProductsReducer,
    syncCompanies: syncCompaniesReducer,
    tallyCompanySyncLogs: tallyCompanySyncLogReducer,
    tallyProductSyncLogs: tallyProductSyncLogReducer,
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
