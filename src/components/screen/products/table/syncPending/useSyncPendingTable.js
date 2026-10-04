import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchSyncPendingProducts } from "@Redux/product/syncPending/syncPending.action";
import { syncPendingTableSelectors } from "@Redux/product/syncPending/syncPending.selector";
import { syncPendingTableActions } from "@Redux/product/syncPending/syncPending.slice";

export function useSyncPendingTable() {
  return useDataTable({
    selectors: syncPendingTableSelectors,
    actions: syncPendingTableActions,
    fetchAction: fetchSyncPendingProducts,
  });
}

export default useSyncPendingTable;
