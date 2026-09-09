import moment from "moment";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "@Tables/product/productTable.utils";
export default function PurchaseOrderDetailSheet({ purchase, onClose }) {
  return (
    <Sheet open={Boolean(purchase)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full gap-0 sm:max-w-xl lg:max-w-3xl">
        <SheetHeader className="border-b">
          <SheetTitle>Received purchase details</SheetTitle>
          <SheetDescription>
            {purchase?.supplierName || "Purchase receiving information"}
          </SheetDescription>
        </SheetHeader>
        {purchase && (
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto space-y-5 p-6"
          >
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                ["Purchase ID", purchase.id],
                ["Acknowledgement", purchase.acknowledgementId],
                [
                  "Received at",
                  purchase.receivedAt
                    ? moment(purchase.receivedAt).format("DD MMM YYYY")
                    : "",
                ],
                ["Received by", purchase.receivedBy?.name],
                ["Employee ID", purchase.receivedBy?.employeeId],
                ["Supplier GST", purchase.supplierGstNumber],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="mt-1 break-words text-sm font-medium">
                    {value || "—"}
                  </dd>
                </div>
              ))}
            </dl>
            {purchase.receivedProducts.map((product, index) => (
              <section
                key={product.id ?? index}
                className="space-y-4 rounded-xl border p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {product.productName || "Product"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.productCode}
                  </p>
                </div>
                <dl className="grid gap-4 sm:grid-cols-3">
                  {[
                    ["Stock", formatNumber(product.stock)],
                    ["Unit price", formatCurrency(product.unitPrice)],
                    ["Unit discount", formatCurrency(product.unitDiscount)],
                    ["Unit GST", formatPercentage(product.unitGst)],
                    ["Unit GST amount", formatCurrency(product.unitGstAmount)],
                    ["Final price", formatCurrency(product.finalPrice)],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="mt-1 text-sm font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                {product.notes && (
                  <p className="whitespace-pre-wrap text-sm">{product.notes}</p>
                )}
                {product.qrCodes.length > 0 && (
                  <p className="break-words text-xs text-muted-foreground">
                    QR codes: {product.qrCodes.join(", ")}
                  </p>
                )}
              </section>
            ))}
            {!purchase.receivedProducts.length && (
              <p className="text-sm text-muted-foreground">
                No received products available.
              </p>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
