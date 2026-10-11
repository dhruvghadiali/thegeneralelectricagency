import { ReceiptIndianRupee } from "lucide-react";

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";

function PurchaseCreditSheetHeader({ purchaseCredit }) {
  return (
    <SheetHeader className="border-b px-5 py-5 sm:px-6">
      <div className="flex items-start gap-3 pr-8">
        <span className="rounded-xl bg-primary/10 p-3 text-primary">
          <ReceiptIndianRupee className="size-6" />
        </span>
        <div className="min-w-0">
          <SheetTitle className="text-xl sm:text-2xl">
            {purchaseCredit.supplierName}
          </SheetTitle>
          <SheetDescription className="mt-1 break-all">
            Purchase credit ID: {purchaseCredit.id}
          </SheetDescription>
        </div>
      </div>
    </SheetHeader>
  );
}

export default PurchaseCreditSheetHeader;
