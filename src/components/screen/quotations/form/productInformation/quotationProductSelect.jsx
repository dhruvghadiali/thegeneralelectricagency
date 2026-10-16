import { useRef } from "react";
import { useDispatch } from "react-redux";

import { quotationProductDirectorySearchChanged } from "@Redux/quotation/quotation.slice";
import QuotationSearchableSelect from "@screenComponent/quotations/form/quotationSearchableSelect";
import useQuotationProductDirectory from "@screenComponent/quotations/form/productInformation/productDirectory/useQuotationProductDirectory";

function QuotationProductSelect({ value, onProductSelect, onProductClear }) {
  const dispatch = useDispatch();
  const directory = useQuotationProductDirectory();
  const selectionChangedRef = useRef(false);

  const restoreSearch = () => {
    dispatch(
      quotationProductDirectorySearchChanged(
        directory.selectedProduct?.name ?? value ?? "",
      ),
    );
  };

  return (
    <QuotationSearchableSelect
      id="quotation-product-mobile"
      value={value}
      placeholder="Select a product"
      searchPlaceholder="Search product name..."
      emptyMessage="No products found."
      options={directory.products}
      selectedId={directory.selectedProduct?.id}
      search={directory.productSearch}
      isLoading={directory.isLoading}
      isLoadingMore={directory.isLoadingMore}
      error={directory.error}
      hasMore={directory.hasMoreProducts}
      onOpenChange={(open) => {
        if (open) return;
        if (selectionChangedRef.current) {
          selectionChangedRef.current = false;
          return;
        }
        restoreSearch();
      }}
      onSearchChange={(search) =>
        dispatch(quotationProductDirectorySearchChanged(search))
      }
      onSelect={(product, isSelected) => {
        selectionChangedRef.current = true;
        if (isSelected) onProductClear();
        else onProductSelect(product, { focusInput: false });
      }}
      onClear={() => {
        selectionChangedRef.current = true;
        onProductClear();
      }}
      onRetry={() => directory.loadProducts()}
      onLoadMore={() => directory.loadProducts(directory.pagination.page + 1)}
    />
  );
}

export default QuotationProductSelect;
