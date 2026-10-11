import { PackageSearch } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";

function SyncPendingSheetHeader({ product }) {
  return (
    <SheetHeader className="border-b px-5 py-5 sm:px-6">
      <div className="flex items-start gap-3 pr-8">
        <span className="rounded-xl bg-primary/10 p-3 text-primary">
          <PackageSearch className="size-6" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <SheetTitle className="break-words text-xl sm:text-2xl">
              {product.name || "Sync-pending product"}
            </SheetTitle>
            <Badge variant="warning">Pending mapping</Badge>
            <Badge variant={product.isActive ? "success" : "destructive"}>
              {product.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <SheetDescription className="mt-1 break-all">
            Tally product ID: {product.productId || "—"}
          </SheetDescription>
        </div>
      </div>
    </SheetHeader>
  );
}

export default SyncPendingSheetHeader;
