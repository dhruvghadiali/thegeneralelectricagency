import { SheetFooter } from "@shadcnComponent/sheet";
import { DATE_FORMATS, formatDate } from "@/utils/date.util";
import { displayProductPerson } from "@screenComponent/products/sheet/productView/productView.utils";

import ProductAuditSection from "@screenComponent/products/sheet/productView/productAuditSection";

function ProductAuditFooter({ product }) {
  return (
    <SheetFooter className="border-t bg-muted/20 px-5 py-4 sm:px-6">
      <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-0">
        <ProductAuditSection
          title="Created"
          personLabel="Created by"
          dateLabel="Created at"
          person={displayProductPerson(product.createdBy)}
          date={formatDate(product.createdAt, DATE_FORMATS.DATE_TIME)}
          className="sm:pr-5"
        />
        <ProductAuditSection
          title="Last updated"
          personLabel="Updated by"
          dateLabel="Updated at"
          person={displayProductPerson(product.updatedBy)}
          date={formatDate(product.updatedAt, DATE_FORMATS.DATE_TIME)}
          className="border-t pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0"
        />
      </div>
    </SheetFooter>
  );
}

export default ProductAuditFooter;
