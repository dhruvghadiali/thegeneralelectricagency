import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchProducts } from "@Redux/product/product.action";
import { productTableSelectors } from "@Redux/product/product.selector";
import { productTableActions } from "@Redux/product/product.slice";
import { PRODUCT_TABLE_COLUMNS } from "@Tables/product/productTable.columns";

const fetchProductList = () => fetchProducts(PRODUCT_TABLE_COLUMNS);

export function useProductTable() {
  return useDataTable({
    selectors: productTableSelectors,
    actions: productTableActions,
    fetchAction: fetchProductList,
  });
}

export default useProductTable;
