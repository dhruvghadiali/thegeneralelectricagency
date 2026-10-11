import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchPurchaseCredits } from "@Redux/purchaseCredit/purchaseCredit.action";
import { purchaseCreditTableSelectors } from "@Redux/purchaseCredit/purchaseCredit.selector";
import { purchaseCreditTableActions } from "@Redux/purchaseCredit/purchaseCredit.slice";
import { PURCHASE_CREDIT_TABLE_COLUMNS } from "@Tables/purchaseCredit/purchaseCreditTable.columns";

const fetchPurchaseCreditList = () =>
  fetchPurchaseCredits(PURCHASE_CREDIT_TABLE_COLUMNS);

export function usePurchaseCreditTable() {
  return useDataTable({
    selectors: purchaseCreditTableSelectors,
    actions: purchaseCreditTableActions,
    fetchAction: fetchPurchaseCreditList,
  });
}

export default usePurchaseCreditTable;
