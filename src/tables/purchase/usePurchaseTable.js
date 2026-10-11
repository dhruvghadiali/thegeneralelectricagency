import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchPurchases } from "@Redux/purchase/purchase.action";
import { purchaseTableSelectors } from "@Redux/purchase/purchase.selector";
import { purchaseTableActions } from "@Redux/purchase/purchase.slice";
import { PURCHASE_TABLE_COLUMNS } from "@Tables/purchase/purchaseTable.columns";

const fetchPurchaseList = () => fetchPurchases(PURCHASE_TABLE_COLUMNS);

export function usePurchaseTable() {
  return useDataTable({
    selectors: purchaseTableSelectors,
    actions: purchaseTableActions,
    fetchAction: fetchPurchaseList,
  });
}

export default usePurchaseTable;
