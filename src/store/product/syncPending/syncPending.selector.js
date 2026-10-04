import { createTableSelectors } from "@Redux/factories/table.factory";

const selectSyncPendingState = (state) => state.syncPendingProducts;

export const syncPendingTableSelectors = createTableSelectors(
  selectSyncPendingState,
);
