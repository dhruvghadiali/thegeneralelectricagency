import { Trash2 } from "lucide-react";

import {
  PURCHASE_CREDIT_PAYMENT_COMPLETION_OPTIONS,
  PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS,
} from "@Enums";
import {
  PURCHASE_CREDIT_AMOUNT_MAX,
  PURCHASE_CREDIT_AMOUNT_MIN,
  PURCHASE_CREDIT_NOTES_MAX_LENGTH,
} from "@Forms/purchaseCredit/purchaseCredit.validation.constants";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Textarea } from "@shadcnComponent/textarea";
import PurchaseCreditDatePicker from "@Forms/purchaseCredit/components/purchaseCreditDatePicker";
import PurchaseCreditFormField from "@Forms/purchaseCredit/components/purchaseCreditFormField";
import PurchaseCreditSelectField from "@Forms/purchaseCredit/components/purchaseCreditSelectField";

function PurchaseCreditPaymentPlanningFields({
  plans,
  isEditing,
  today,
  formik,
  errorFor,
  inputProps,
  onRemove,
}) {
  if (plans.length === 0) {
    return (
      <div className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
        No payment plans added.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {plans.map((plan, index) => {
        const prefix = `paymentPlanning[${index}]`;
        const path = (field) => `${prefix}.${field}`;

        return (
          <div key={index} className="rounded-xl border bg-muted/10 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="font-medium">Payment plan {index + 1}</p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove payment plan ${index + 1}`}
                onClick={() => onRemove(index)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <PurchaseCreditFormField
                id={`purchase-credit-reminding-date-${index}`}
                label="Reminding date"
                error={errorFor(path("remindingDate"))}
              >
                <PurchaseCreditDatePicker
                  id={`purchase-credit-reminding-date-${index}`}
                  label="Reminding date"
                  value={plan.remindingDate}
                  min={today}
                  error={errorFor(path("remindingDate"))}
                  onChange={(value) => formik.setFieldValue(path("remindingDate"), value, true)}
                  onBlur={() => formik.setFieldTouched(path("remindingDate"), true, true)}
                />
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-plan-amount-${index}`}
                label="Amount"
                required
                error={errorFor(path("amount"))}
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                  <Input
                    id={`purchase-credit-plan-amount-${index}`}
                    type="number"
                    min={PURCHASE_CREDIT_AMOUNT_MIN}
                    max={PURCHASE_CREDIT_AMOUNT_MAX}
                    inputMode="decimal"
                    className="pl-7"
                    {...inputProps(path("amount"), `purchase-credit-plan-amount-${index}`)}
                  />
                </div>
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-plan-payment-type-${index}`}
                label="Payment type"
                required
                error={errorFor(path("paymentType"))}
              >
                <PurchaseCreditSelectField
                  id={`purchase-credit-plan-payment-type-${index}`}
                  value={plan.paymentType}
                  options={PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS}
                  placeholder="Select payment type"
                  error={errorFor(path("paymentType"))}
                  onChange={(value) => formik.setFieldValue(path("paymentType"), value, true)}
                  onBlur={() => formik.setFieldTouched(path("paymentType"), true, true)}
                />
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-payment-completed-${index}`}
                label="Payment completed"
                required
                hint={!isEditing ? "New payment plans start as No." : undefined}
                error={errorFor(path("isPaymentCompleted"))}
              >
                <PurchaseCreditSelectField
                  id={`purchase-credit-payment-completed-${index}`}
                  value={String(plan.isPaymentCompleted)}
                  options={PURCHASE_CREDIT_PAYMENT_COMPLETION_OPTIONS}
                  placeholder="Select Yes or No"
                  disabled={!isEditing}
                  error={errorFor(path("isPaymentCompleted"))}
                  onChange={(value) =>
                    formik.setFieldValue(path("isPaymentCompleted"), value === "true", true)
                  }
                  onBlur={() => formik.setFieldTouched(path("isPaymentCompleted"), true, true)}
                />
              </PurchaseCreditFormField>

              <div className="sm:col-span-2 lg:col-span-3">
                <PurchaseCreditFormField
                  id={`purchase-credit-plan-notes-${index}`}
                  label="Notes"
                  error={errorFor(path("notes"))}
                >
                  <Textarea
                    id={`purchase-credit-plan-notes-${index}`}
                    maxLength={PURCHASE_CREDIT_NOTES_MAX_LENGTH}
                    placeholder="Optional payment plan notes"
                    {...inputProps(path("notes"), `purchase-credit-plan-notes-${index}`)}
                  />
                </PurchaseCreditFormField>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PurchaseCreditPaymentPlanningFields;
