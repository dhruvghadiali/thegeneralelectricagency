import { CalendarDays } from "lucide-react";

import { formatDate } from "@/utils/date.util";
import { Badge } from "@shadcnComponent/badge";
import { PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS } from "@Enums";
import { formatCurrency } from "@Tables/product/productTable.utils";
import { purchaseCreditOptionLabel } from "@screenComponent/purchaseCredits/sheet/purchaseCreditSheet.utils";

import PurchaseCreditDetailItem from "@screenComponent/purchaseCredits/sheet/purchaseCreditDetailItem";
import PurchaseCreditEmptyState from "@screenComponent/purchaseCredits/sheet/purchaseCreditEmptyState";

function PurchaseCreditPaymentPlanningSection({ paymentPlanning = [] }) {
  if (!paymentPlanning.length) {
    return (
      <PurchaseCreditEmptyState>
        No payment planning is available for this purchase credit.
      </PurchaseCreditEmptyState>
    );
  }

  return (
    <div className="grid gap-3">
      {paymentPlanning.map((plan, index) => (
        <article
          key={plan.id ?? index}
          className="rounded-xl border bg-card p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-primary/10 p-2 text-primary">
                <CalendarDays className="size-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">
                  Reminder {index + 1}
                </p>
                <p className="font-semibold">
                  {formatDate(plan.remindingDate)}
                </p>
              </div>
            </div>
            <Badge variant={plan.isPaymentCompleted ? "success" : "warning"}>
              {plan.isPaymentCompleted ? "Completed" : "Pending"}
            </Badge>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <PurchaseCreditDetailItem
              label="Amount"
              value={formatCurrency(plan.amount)}
            />
            <PurchaseCreditDetailItem
              label="Payment type"
              value={purchaseCreditOptionLabel(
                PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS,
                plan.paymentType,
              )}
            />
            <PurchaseCreditDetailItem label="Notes" value={plan.notes} />
          </div>
        </article>
      ))}
    </div>
  );
}

export default PurchaseCreditPaymentPlanningSection;
