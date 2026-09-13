import { createSelector } from "@reduxjs/toolkit";

const selectSalesOrderState = (state) => state.salesOrders;

export const selectSalesOrderCustomerOptionsState = createSelector(
  selectSalesOrderState,
  (salesOrders) => salesOrders.customers,
);
