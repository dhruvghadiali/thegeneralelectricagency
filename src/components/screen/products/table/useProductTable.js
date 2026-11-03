import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { getProductList } from "@Redux/product/product.action";
import { productTableSelectors } from "@Redux/product/product.selector";
import { productTableActions } from "@Redux/product/product.slice";

export function useProductTable() {
  return useDataTable({
    selectors: productTableSelectors,
    actions: productTableActions,
    fetchAction: getProductList,
  });
}

export default useProductTable;
