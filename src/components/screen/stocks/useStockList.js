import { fetchStocks } from "@Redux/stock/stock.action";
import { stockTableActions } from "@Redux/stock/stock.slice";
import { stockTableSelectors } from "@Redux/stock/stock.selector";
import { useDataTable } from "@commonComponent/dataTable/useDataTable";

const fetchStockList = () => fetchStocks();

export function useStockList() {
  return useDataTable({
    selectors: stockTableSelectors,
    actions: stockTableActions,
    fetchAction: fetchStockList,
  });
}

export default useStockList;
