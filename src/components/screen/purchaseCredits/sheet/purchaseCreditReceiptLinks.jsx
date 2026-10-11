import { ExternalLink, FileText } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { purchaseCreditReceiptUrl } from "@screenComponent/purchaseCredits/sheet/purchaseCreditSheet.utils";

function PurchaseCreditReceiptLinks({ receipts = [], label }) {
  if (!receipts.length) return null;

  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      {receipts.map((receipt, index) => (
        <Button
          key={`${receipt}-${index}`}
          asChild
          variant="outline"
          className="justify-start overflow-hidden"
        >
          <a
            href={purchaseCreditReceiptUrl(receipt)}
            target="_blank"
            rel="noreferrer"
          >
            <FileText className="size-4 shrink-0" />
            <span className="truncate">
              {label} {index + 1}
            </span>
            <ExternalLink className="ml-auto size-3.5 shrink-0" />
          </a>
        </Button>
      ))}
    </div>
  );
}

export default PurchaseCreditReceiptLinks;
