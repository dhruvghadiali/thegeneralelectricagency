import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchPurchases } from "@Redux/purchase/purchase.action";
import { purchaseTableSelectors } from "@Redux/purchase/purchase.selector";
import { purchaseTableActions } from "@Redux/purchase/purchase.slice";
import { PURCHASE_ORDER_COLUMNS } from "@screenComponent/purchaseOrders/purchaseOrder.columns";

const fetchPurchaseList = () => fetchPurchases(PURCHASE_ORDER_COLUMNS);

export function usePurchaseOrderList() {
  return useDataTable({
    selectors: purchaseTableSelectors,
    actions: purchaseTableActions,
    fetchAction: fetchPurchaseList,
  });
}
