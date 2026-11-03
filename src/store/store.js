import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer, { loggedOut } from "@Redux/auth/auth.slice";
import employeeReducer from "@Redux/employee/employee.slice";
import companyReducer from "@Redux/company/company.slice";
import companyCreateReducer from "@Redux/company/createCompany/createCompany.slice";
import companyListReducer from "@Redux/company/getCompanyList/getCompanyList.slice";
import companyContactReducer from "@Redux/companyContact/companyContact.slice";
import stockReducer from "@Redux/stock/stock.slice";
import productListReducer from "@Redux/product/getProductList/getProductList.slice";
import productCreateReducer from "@Redux/product/createProduct/createProduct.slice";
import productMigrateFromTallyReducer from "@Redux/product/migrateFromTally/migrateFromTally.slice";
import productUpdateReducer from "@Redux/product/updateProduct/updateProduct.slice";
import companiesReducer from "@Redux/company/systemCompanies/systemCompanies.slice";
import quotationReducer from "@Redux/quotation/quotation.slice";
import purchaseReducer from "@Redux/purchase/purchase.slice";
import purchaseCreditReducer from "@Redux/purchaseCredit/purchaseCredit.slice";
import salesOrderReducer from "@Redux/salesOrder/salesOrder.slice";
import keyboardNavigationReducer from "@Redux/keyboardNavigation/keyboardNavigation.slice";
import tallyProductsReducer from "@Tally/redux/tallyProducts/tallyProducts.slice";
import systemProductsReducer from "@Tally/redux/systemProducts/systemProducts.slice";
import systemCompaniesReducer from "@Tally/redux/systemCompanies/systemCompanies.slice";
import syncProductsReducer from "@Tally/redux/syncProducts/syncProducts.slice";
import tallyCompanyReducer from "@Tally/redux/tallyCompanies/tallyCompanies.slice";
import tallyCompanySyncLogReducer from "@Tally/redux/companySyncLog/companySyncLog.slice";
import tallyProductSyncLogReducer from "@Tally/redux/productSyncLog/productSyncLog.slice";
import syncCompaniesReducer from "@Tally/redux/syncCompanies/syncCompanies.slice";
import unmappedProductsReducer from "@Tally/redux/unmappedProducts/unmappedProducts.slice";
import { syncErrorListener } from "@Tally/redux/syncError.listener";

const appReducer = combineReducers({
    auth: authReducer,
    employees: employeeReducer,
    companies: companyReducer,
    companyCreate: companyCreateReducer,
    companyList: companyListReducer,
    companyContacts: companyContactReducer,
    stocks: stockReducer,
    productList: productListReducer,
    productCreate: productCreateReducer,
    productMigrateFromTally: productMigrateFromTallyReducer,
    productUpdate: productUpdateReducer,
    companiesReducer: companiesReducer,
    quotation: quotationReducer,
    purchases: purchaseReducer,
    purchaseCredits: purchaseCreditReducer,
    salesOrders: salesOrderReducer,
    keyboardNavigation: keyboardNavigationReducer,
    tallyProducts: tallyProductsReducer,
    tallyCompanies: tallyCompanyReducer,
    systemProducts: systemProductsReducer,
    systemCompanies: systemCompaniesReducer,
    syncProducts: syncProductsReducer,
    syncCompanies: syncCompaniesReducer,
    unmappedProducts: unmappedProductsReducer,
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
