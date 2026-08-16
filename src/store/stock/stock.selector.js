import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import { createTableSelectors } from "@Redux/factories/table.factory";

const selectStockState = (state) => state.stocks;

export const stockTableSelectors = createTableSelectors(selectStockState);

export const selectSelectedStock = createSelector(
  selectStockState,
  (state) => state.selectedStock,
);

export const selectStockSummary = createSelector(
  stockTableSelectors.selectItems,
  (stocks) => ({
    availableUnits: _.sumBy(stocks, "availableQuantity"),
    lowStockCount: _.filter(
      stocks,
      (stock) => stock.availableQuantity <= stock.reorderLevel,
    ).length,
    damagedUnits: _.sumBy(stocks, "damagedQuantity"),
    inventoryValue: _.sumBy(stocks, "stockValue"),
  }),
);

export default stockTableSelectors;
