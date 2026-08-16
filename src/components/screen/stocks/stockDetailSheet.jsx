import {
  Boxes,
  Building2,
  CircleDollarSign,
  MapPin,
  PackageCheck,
  PackageX,
  Tag,
  TriangleAlert,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  formatCurrency,
  specificationLabel,
  stockCategoryLabel,
  stockStatus,
} from "@/components/screen/stocks/stock.utils";

function QuantityCard({ icon, label, value, tone }) {
  const Icon = icon;

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className={`rounded-md p-1.5 ${tone}`}>
          <Icon className="size-3.5" />
        </span>
        {label}
      </div>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function StockDetailSheet({ stock, onClose }) {
  const status = stock ? stockStatus(stock) : null;

  return (
    <Sheet open={Boolean(stock)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full gap-0 sm:max-w-xl lg:max-w-2xl">
        {stock && (
          <>
            <SheetHeader className="border-b px-5 py-5 sm:px-6">
              <div className="flex items-start gap-3 pr-8">
                <span className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Boxes className="size-6" />
                </span>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant={status.variant}>{status.label}</Badge>
                    <Badge variant="outline">{stockCategoryLabel(stock.category)}</Badge>
                  </div>
                  <SheetTitle className="text-xl sm:text-2xl">
                    {stock.productName}
                  </SheetTitle>
                  <SheetDescription className="mt-1">
                    {stock.sku} · {stock.brand} · {stock.model}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div data-lenis-prevent className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <section>
                <h3 className="text-sm font-semibold">Stock position</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <QuantityCard
                    icon={PackageCheck}
                    label="Available"
                    value={stock.availableQuantity}
                    tone="bg-emerald-500/10 text-emerald-600"
                  />
                  <QuantityCard
                    icon={Boxes}
                    label="Reserved"
                    value={stock.reservedQuantity}
                    tone="bg-sky-500/10 text-sky-600"
                  />
                  <QuantityCard
                    icon={PackageX}
                    label="Damaged"
                    value={stock.damagedQuantity}
                    tone="bg-rose-500/10 text-rose-600"
                  />
                  <QuantityCard
                    icon={TriangleAlert}
                    label="Reorder at"
                    value={stock.reorderLevel}
                    tone="bg-amber-500/10 text-amber-600"
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Quantities are measured in {stock.unit}s.
                </p>
              </section>

              <Separator className="my-6" />

              <section>
                <h3 className="text-sm font-semibold">Product & valuation</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="flex gap-3 rounded-lg border bg-card p-3">
                    <span className="rounded-md bg-muted p-2 text-muted-foreground">
                      <Tag className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground">Unit price</p>
                      <p className="mt-1 text-sm font-semibold">{formatCurrency(stock.unitPrice)}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-lg border bg-card p-3">
                    <span className="rounded-md bg-muted p-2 text-muted-foreground">
                      <CircleDollarSign className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground">Available stock value</p>
                      <p className="mt-1 text-sm font-semibold">{formatCurrency(stock.stockValue)}</p>
                    </div>
                  </div>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">Warehouse allocation</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Available stock split by warehouse and rack.
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {stock.locationCount} {stock.locationCount === 1 ? "location" : "locations"}
                  </Badge>
                </div>

                {stock.locations.length > 0 ? (
                  <div className="mt-4 grid gap-3">
                    {stock.locations.map((location) => (
                      <article
                        key={location.id}
                        className="flex items-center gap-3 rounded-xl border bg-card p-4"
                      >
                        <span className="rounded-lg bg-primary/10 p-2.5 text-primary">
                          <Building2 className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{location.warehouseName}</p>
                          <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3" /> Rack {location.rackNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-semibold">{location.quantity}</p>
                          <p className="text-xs text-muted-foreground">{stock.unit}s</p>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 rounded-xl border border-dashed p-5 text-center text-sm text-muted-foreground">
                    No available stock is allocated to a warehouse.
                  </p>
                )}
              </section>

              <Separator className="my-6" />

              <section>
                <h3 className="text-sm font-semibold">Specifications</h3>
                <div className="mt-3 grid overflow-hidden rounded-xl border sm:grid-cols-2">
                  {Object.entries(stock.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="border-b p-3 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-child(odd)]:border-r"
                    >
                      <p className="text-xs text-muted-foreground">{specificationLabel(key)}</p>
                      <p className="mt-1 text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default StockDetailSheet;
