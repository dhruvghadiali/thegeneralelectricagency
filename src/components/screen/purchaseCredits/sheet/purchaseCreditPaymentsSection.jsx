import { ReceiptIndianRupee } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";
import { formatDate } from "@/utils/date.util";
import { PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS } from "@Enums";
import { formatCurrency } from "@Tables/product/productTable.utils";
import { purchaseCreditOptionLabel } from "@screenComponent/purchaseCredits/sheet/purchaseCreditSheet.utils";
import {
  PURCHASE_CREDIT_STATUS_VARIANTS,
  purchaseCreditPaymentStatusLabel,
} from "@Tables/purchaseCredit/purchaseCreditTable.utils";


import PurchaseCreditDetailItem from "@screenComponent/purchaseCredits/sheet/purchaseCreditDetailItem";
import PurchaseCreditEmptyState from "@screenComponent/purchaseCredits/sheet/purchaseCreditEmptyState";
import PurchaseCreditReceiptLinks from "@screenComponent/purchaseCredits/sheet/purchaseCreditReceiptLinks";

function PurchaseCreditPaymentsSection({ payments = [] }) {
  if (!payments.length) {
    return (
      <PurchaseCreditEmptyState>
        No payments are available for this purchase credit.
      </PurchaseCreditEmptyState>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map((payment, index) => (
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
                  {formatCurrency(payment.amount)}
                </p>
              </div>
            </div>
            <Badge
              variant={
                PURCHASE_CREDIT_STATUS_VARIANTS[payment.paymentStatus] ??
                "outline"
              }
            >
              {purchaseCreditPaymentStatusLabel(payment.paymentStatus)}
            </Badge>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <PurchaseCreditDetailItem
              label="Payment type"
              value={purchaseCreditOptionLabel(
                PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS,
                payment.paymentType,
              )}
            />
            <PurchaseCreditDetailItem
              label="Payment date"
              value={formatDate(payment.paymentDate)}
            />
            <PurchaseCreditDetailItem
              label="Settlement date"
              value={formatDate(payment.settlementDate)}
            />
            <PurchaseCreditDetailItem
              label="Reference ID"
              value={payment.referenceId}
            />
            <div className="sm:col-span-2">
              <PurchaseCreditDetailItem label="Notes" value={payment.notes} />
            </div>
          </div>
          <PurchaseCreditReceiptLinks
            receipts={payment.receipts}
            label="Payment receipt"
          />
        </article>
      ))}
    </div>
  );
}

export default PurchaseCreditPaymentsSection;
