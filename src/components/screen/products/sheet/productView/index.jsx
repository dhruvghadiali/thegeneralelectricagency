import { PackageSearch, XIcon } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";
import { displayProductValue } from "@screenComponent/products/sheet/productView/productView.utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";
import ProductDetails from "@screenComponent/products/sheet/productView/productDetails";
import ProductAuditFooter from "@screenComponent/products/sheet/productView/productAuditFooter";

function ProductDetailSheet({ product, onClose }) {
  return (
    <Sheet open={Boolean(product)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full gap-0 sm:max-w-xl [&>button:last-child]:hidden">
        {product && (
          <>
            <SheetHeader className="border-b px-5 py-2">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-primary/10 p-3 text-primary">
                  <PackageSearch className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-2">
                    <Badge variant={product.isActive ? "success" : "secondary"}>
                      {product.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <SheetTitle className="text-xl uppercase sm:text-2xl">
                    {displayProductValue(product.name)}
                  </SheetTitle>
                  <SheetDescription className="mt-1">
                    {displayProductValue(product.agencyName)}
                  </SheetDescription>
                </div>
                <SheetClose className="ring-offset-background focus:ring-ring ml-auto flex size-9 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-muted focus:ring-2 focus:ring-offset-2 focus:outline-hidden">
                  <XIcon className="size-4" aria-hidden="true" />
                  <span className="sr-only">Close product details</span>
                </SheetClose>
              </div>
            </SheetHeader>

            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-5 py-5 sm:px-6"
            >
              <ProductDetails product={product} />
            </div>

            <ProductAuditFooter product={product} />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default ProductDetailSheet;
