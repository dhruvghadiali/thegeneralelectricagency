import { Eye } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";
import PageBreadcrumb from "@commonComponent/pageBreadcrumb";

function StockHeader() {
  return (
    <div className="space-y-5">
      <PageBreadcrumb items={[{ label: "Stocks" }]} />
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Inventory control</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Existing stock
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Review product availability, reorder risk, value, and warehouse allocation.
          </p>
        </div>
        <Badge variant="outline" className="w-fit gap-1.5 px-3 py-1.5">
          <Eye className="size-3.5" />
          Read-only inventory
        </Badge>
      </section>
    </div>
  );
}

export default StockHeader;
