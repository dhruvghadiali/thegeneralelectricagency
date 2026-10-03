import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchProducts } from "@Redux/product/product.action";
import { productTableSelectors } from "@Redux/product/product.selector";
import { productTableActions } from "@Redux/product/product.slice";

export function useProductTable() {
  return useDataTable({
    selectors: productTableSelectors,
    actions: productTableActions,
    fetchAction: fetchProducts,
  });
}

export default useProductTable;
