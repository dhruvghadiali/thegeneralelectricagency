import _ from "lodash";

import { cn } from "@/lib/utils";
import { Button } from "@shadcnComponent/button";
import HighlightedProductName from "@screenComponent/quotations/form/productInformation/productDirectory/highlightedProductName";

function ProductDirectoryList({
  products,
  productSearch,
  selectedProduct,
  onProductSelect,
  onProductOptionKeyDown,
}) {
  return (
    <div
      className={cn(
        "divide-y",
        productSearch.trim() &&
          !selectedProduct &&
          "[&:not(:focus-within)>[data-product-option]:first-child]:bg-accent [&:not(:focus-within)>[data-product-option]:first-child]:text-accent-foreground",
      )}
      role="listbox"
      aria-label="Products"
    >
      {products.map((product, index) => (
        <Button
          key={product.id ?? `${product.name}-${index}`}
          type="button"
          variant="ghost"
          role="option"
          data-product-option
          aria-selected={
            Boolean(selectedProduct) && selectedProduct.id === product.id
          }
          onClick={() => onProductSelect(product)}
          onKeyDown={(event) => onProductOptionKeyDown(event, index)}
          className="h-auto w-full justify-start rounded-none px-6 py-3 text-left font-medium aria-selected:bg-accent aria-selected:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
        >
          <span className="min-w-0 truncate">
            <HighlightedProductName
              name={_.toUpper(product.name || "Unnamed product")}
              search={productSearch}
            />
          </span>
        </Button>
      ))}
    </div>
  );
}

export default ProductDirectoryList;
