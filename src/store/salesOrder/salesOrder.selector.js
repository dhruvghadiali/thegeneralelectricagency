import { createSelector } from "@reduxjs/toolkit";

const selectSalesOrderState = (state) => state.salesOrders;

export const selectSalesOrderCompanyOptionsState = createSelector(
  selectSalesOrderState,
  (salesOrders) => salesOrders.companyOptions,
);
