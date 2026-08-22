import {
  CalendarDays,
  ExternalLink,
  FileText,
  Landmark,
  ReceiptIndianRupee,
  ShoppingCart,
} from "lucide-react";

import {
  PAYMENT_MODE_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
  PAYMENT_STATUSES,
} from "@Enums";
import { Badge } from "@shadcnComponent/badge";
import { Button } from "@shadcnComponent/button";
import { Separator } from "@shadcnComponent/separator";
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

const STATUS_VARIANTS = {
  [PAYMENT_STATUSES.PAID]: "success",
  [PAYMENT_STATUSES.FAILED]: "destructive",
  [PAYMENT_STATUSES.CANCELLED]: "destructive",
  [PAYMENT_STATUSES.REFUNDED]: "secondary",
  [PAYMENT_STATUSES.PENDING]: "outline",
};

const optionLabel = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value ?? "—";

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(date);
};

function Detail({ label, value }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm font-medium">{value || "—"}</p>
    </div>
  );
}

function PurchaseOrderDetailSheet({ purchase, onClose }) {
  return (
    <Sheet
      open={Boolean(purchase)}
      onOpenChange={(open) => !open && onClose()}
    >
      <SheetContent className="w-full gap-0 sm:max-w-xl lg:max-w-3xl">
        {purchase && (
          <>
            <SheetHeader className="border-b px-5 py-5 sm:px-6">
              <div className="flex items-start gap-3 pr-8">
                <span className="rounded-xl bg-primary/10 p-3 text-primary">
                  <ShoppingCart className="size-6" />
                </span>
                <div className="min-w-0">
                  <SheetTitle className="text-xl sm:text-2xl">
                    {purchase.productName}
                  </SheetTitle>
                  <SheetDescription className="mt-1 break-all">
                    Purchase ID: {purchase.id}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-5 py-5 sm:px-6"
            >
              <section>
                <h3 className="text-sm font-semibold">Order details</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Detail label="Product code" value={purchase.productCode} />
                  <Detail label="Supplier" value={purchase.supplierName} />
                  <Detail
                    label="Supplier GST"
                    value={purchase.supplierGstNumber}
                  />
                  <Detail
                    label="Purchase date"
                    value={formatDate(purchase.purchaseDate)}
                  />
                  <Detail
                    label="Expected delivery"
                    value={formatDate(purchase.expectedDeliveryDate)}
                  />
                  <Detail
                    label="Actual delivery"
                    value={formatDate(purchase.actualDeliveryDate)}
                  />
                  <Detail
                    label="Quantity"
                    value={formatNumber(purchase.quantityPurchased)}
                  />
                  <Detail
                    label="Bill amount"
                    value={formatCurrency(purchase.billAmount)}
                  />
                  <Detail
                    label="Amount paid"
                    value={formatCurrency(purchase.actualPaidAmount)}
                  />
                  <Detail
                    label="GST amount"
                    value={formatCurrency(purchase.gstAmount)}
                  />
                  <Detail
                    label="GST rate"
                    value={formatPercentage(purchase.gstPercentage)}
                  />
                  <Detail
                    label="Created by"
                    value={purchase.createdBy.name || purchase.createdBy.username}
                  />
                </div>

                {purchase.purchaseOrderPdf && (
                  <Button asChild variant="outline" className="mt-4">
                    <a
                      href={purchase.purchaseOrderPdf}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FileText className="size-4" />
                      Open purchase order PDF
                      <ExternalLink className="size-3.5" />
                    </a>
                  </Button>
                )}
              </section>

              <Separator className="my-6" />

              <section>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">Payment information</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      All payment records attached to this purchase order.
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {purchase.payments.length} payment
                    {purchase.payments.length === 1 ? "" : "s"}
                  </Badge>
                </div>

                {purchase.payments.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {purchase.payments.map((payment, index) => (
                      <article
                        key={payment.id ?? index}
                        className="rounded-xl border bg-card p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="rounded-lg bg-primary/10 p-2 text-primary">
                              <ReceiptIndianRupee className="size-4" />
                            </span>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Payment {index + 1}
                              </p>
                              <p className="font-semibold">
                                {formatCurrency(payment.paymentAmount)}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              STATUS_VARIANTS[payment.paymentStatus] ?? "outline"
                            }
                          >
                            {optionLabel(
                              PAYMENT_STATUS_OPTIONS,
                              payment.paymentStatus,
                            )}
                          </Badge>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="flex gap-2 rounded-lg bg-muted/40 p-3">
                            <CalendarDays className="mt-0.5 size-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Payment date
                              </p>
                              <p className="mt-1 text-sm font-medium">
                                {formatDate(payment.paymentDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 rounded-lg bg-muted/40 p-3">
                            <CalendarDays className="mt-0.5 size-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Expected payment date
                              </p>
                              <p className="mt-1 text-sm font-medium">
                                {formatDate(payment.expectedPaymentDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 rounded-lg bg-muted/40 p-3">
                            <Landmark className="mt-0.5 size-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Payment mode
                              </p>
                              <p className="mt-1 text-sm font-medium">
                                {optionLabel(
                                  PAYMENT_MODE_OPTIONS,
                                  payment.paymentMode,
                                )}
                              </p>
                            </div>
                          </div>
                          <Detail
                            label="Reference number"
                            value={payment.paymentReferenceNumber}
                          />
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 rounded-xl border border-dashed p-5 text-center text-sm text-muted-foreground">
                    No payment information is available for this purchase.
                  </p>
                )}
              </section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default PurchaseOrderDetailSheet;
