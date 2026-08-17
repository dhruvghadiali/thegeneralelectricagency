import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchProducts } from "@Redux/product/product.action";
import { productTableSelectors } from "@Redux/product/product.selector";
import { productTableActions } from "@Redux/product/product.slice";
import { PRODUCT_COLUMNS } from "@screenComponent/products/product.columns";

const fetchProductList = () => fetchProducts(PRODUCT_COLUMNS);

export function useProductList() {
  return useDataTable({
    selectors: productTableSelectors,
    actions: productTableActions,
    fetchAction: fetchProductList,
  });
}
