import { CalendarDays, PackageCheck, PackageOpen, UserRound } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";
import { formatDate } from "@screenComponent/products/sheet/formatDate";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";

import StockMetric from "@screenComponent/products/sheet/stockMetric";

function ProductStockSheet({ product, onClose }) {
  const reservations = product?.reservedStock ?? [];

  return (
    <Sheet open={Boolean(product)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-xl">
        <SheetHeader className="border-b px-6 py-5 pr-12">
          <div className="flex flex-wrap items-center gap-2">
            <SheetTitle className="text-xl">{product?.name ?? "Product details"}</SheetTitle>
            {product && (
              <Badge variant={product.isActive ? "success" : "destructive"}>
                {product.isActive ? "Active" : "Inactive"}
              </Badge>
            )}
          </div>
          <SheetDescription>
            {product?.productCode ? `Product code: ${product.productCode}` : "Stock availability and reservation details."}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-6 pb-8">
          <section className="space-y-3">
            <div>
              <h3 className="font-semibold">Stock information</h3>
              <p className="text-sm text-muted-foreground">Current inventory and active reservations.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StockMetric icon={PackageOpen} label="Total stock" value={product?.stocks ?? 0} />
              <StockMetric icon={PackageCheck} label="Reserved stock" value={reservations.length} />
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h3 className="font-semibold">Reserved stock details</h3>
              <p className="text-sm text-muted-foreground">People and companies associated with each reservation.</p>
            </div>
            {reservations.length === 0 ? (
              <div className="rounded-xl border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
                No stock reservations are available for this product.
              </div>
            ) : (
              <div className="space-y-3">
                {reservations.map((reservation, index) => (
                  <article key={`${reservation.reservedAt ?? "reservation"}-${index}`} className="rounded-xl border bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{reservation.reservedFor || "Company not available"}</p>
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <UserRound className="size-3.5" aria-hidden="true" />
                          Reserved by {reservation.reservedBy || "—"}
                        </div>
                      </div>
                      <Badge variant="secondary">Reserved</Badge>
                    </div>
                    <div className="mt-4 grid gap-3 rounded-lg bg-muted/50 p-3 text-sm sm:grid-cols-2">
                      <div><p className="text-xs text-muted-foreground">Start date</p><p className="mt-1 font-medium">{formatDate(reservation.startDate)}</p></div>
                      <div><p className="text-xs text-muted-foreground">End date</p><p className="mt-1 font-medium">{formatDate(reservation.endDate)}</p></div>
                    </div>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      Reserved on {formatDate(reservation.reservedAt)}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ProductStockSheet;
