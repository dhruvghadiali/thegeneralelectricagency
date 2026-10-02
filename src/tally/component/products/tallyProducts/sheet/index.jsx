import { useDispatch, useSelector } from "react-redux";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";
import { PRODUCT_DETAILS } from "@Tally/component/products/tallyProducts/sheet/productDetails";
import { productDetailsClosed } from "@Tally/redux/tallyProducts/tallyProducts.slice";
import { selectSelectedTallyProduct } from "@Tally/redux/tallyProducts/tallyProducts.selector";

function ProductDetails() {
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedTallyProduct);

  return (
    <Sheet
      open={Boolean(product)}
      onOpenChange={(open) => !open && dispatch(productDetailsClosed())}
    >
      <SheetContent className="w-full gap-0 sm:max-w-xl">
        <SheetHeader className="border-b pr-12">
          <SheetTitle className="break-words">
            {product?.name ?? "Product details"}
          </SheetTitle>
          <SheetDescription>Product information received from Tally.</SheetDescription>
        </SheetHeader>
        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto p-4">
          <dl className="divide-y">
            {PRODUCT_DETAILS.map(([label, field]) => (
              <div
                key={field}
                className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4"
              >
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="min-w-0 whitespace-pre-wrap break-words text-sm font-medium">
                  {product?.[field] || "—"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ProductDetails;
