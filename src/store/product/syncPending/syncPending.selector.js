import { createTableSelectors } from "@Redux/factories/table.factory";

const selectSyncPendingState = (state) => state.syncPendingProducts;

export const syncPendingTableSelectors = createTableSelectors(
  selectSyncPendingState,
);

export const selectSelectedSyncPendingProduct = (state) =>
  selectSyncPendingState(state).selectedProduct;
