import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";
import { PRODUCT_DETAILS } from "@Tally/component/products/systemProducts/sheet/productDetails";
import { productDetailsClosed } from "@Tally/redux/systemProducts/systemProducts.slice";
import { selectSelectedSystemProduct } from "@Tally/redux/systemProducts/systemProducts.selector";

function ProductDetails() {
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedSystemProduct);

  return (
    <Sheet
      open={Boolean(product)}
      onOpenChange={(open) => !open && dispatch(productDetailsClosed())}
    >
      <SheetContent className="w-full gap-0 sm:max-w-xl">
        <SheetHeader className="border-b pr-12">
          <SheetTitle className="break-words">
            {product?.name || product?.product_id || "Product details"}
          </SheetTitle>
          <SheetDescription>Saved system product information.</SheetDescription>
        </SheetHeader>
        <div data-lenis-prevent className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4">
          {PRODUCT_DETAILS.map(({ title, fields }) => (
            <section key={title} aria-label={title}>
              <h3 className="text-sm font-semibold">{title}</h3>
              <dl className="mt-2 divide-y">
                {fields.map(([label, field, format]) => {
                  const value = _.get(product, field);
                  const display = format
                    ? format(value)
                    : value == null || value === "" ? "—" : String(value);

                  return (
                    <div
                      key={field}
                      className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4"
                    >
                      <dt className="text-sm text-muted-foreground">{label}</dt>
                      <dd className="min-w-0 whitespace-pre-wrap break-words text-sm font-medium">
                        {display}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ProductDetails;
