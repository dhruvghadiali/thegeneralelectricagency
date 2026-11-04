import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { getProductList } from "@Redux/product/getProductList/getProductList.action";
import { productTableActions } from "@Redux/product/getProductList/getProductList.slice";
import { productTableSelectors } from "@Redux/product/getProductList/getProductList.selector";

export function useProductTable() {
  return useDataTable({
    selectors: productTableSelectors,
    actions: productTableActions,
    fetchAction: getProductList,
  });
}

export default useProductTable;
