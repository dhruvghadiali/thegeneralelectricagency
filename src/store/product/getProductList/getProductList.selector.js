import { createTableSelectors } from "@Redux/factories/table.factory";

const selectProductListState = (state) => state.productList;
const selectProductTableState = (state) =>
  selectProductListState(state).productTable;

export const productTableSelectors = createTableSelectors(
  selectProductTableState,
);

export const selectProductSummary = (state) =>
  selectProductListState(state).summary;
