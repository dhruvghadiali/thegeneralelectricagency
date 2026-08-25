import { Trash2 } from "lucide-react";

import {
  PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS,
  PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS,
} from "@Enums";
import {
  PURCHASE_CREDIT_AMOUNT_MAX,
  PURCHASE_CREDIT_AMOUNT_MIN,
  PURCHASE_CREDIT_NOTES_MAX_LENGTH,
  PURCHASE_CREDIT_REFERENCE_ID_MAX_LENGTH,
} from "@Forms/purchaseCredit/purchaseCredit.validation.constants";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Textarea } from "@shadcnComponent/textarea";
import PurchaseCreditDatePicker from "@Forms/purchaseCredit/components/purchaseCreditDatePicker";
import PurchaseCreditFileUploader from "@Forms/purchaseCredit/components/purchaseCreditFileUploader";
import PurchaseCreditFormField from "@Forms/purchaseCredit/components/purchaseCreditFormField";
import PurchaseCreditSelectField from "@Forms/purchaseCredit/components/purchaseCreditSelectField";

function PurchaseCreditPaymentFields({
  payments,
  isEditing,
  today,
  formik,
  errorFor,
  inputProps,
  onRemove,
}) {
  return (
    <div className="space-y-4">
      {payments.map((payment, index) => {
        const prefix = `payments[${index}]`;
        const path = (field) => `${prefix}.${field}`;

        return (
          <div key={index} className="rounded-xl border bg-muted/10 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="font-medium">Payment {index + 1}</p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={payments.length === 1}
                aria-label={`Remove payment ${index + 1}`}
                onClick={() => onRemove(index)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <PurchaseCreditFormField
                id={`purchase-credit-payment-status-${index}`}
                label="Payment status"
                required
                hint={!isEditing ? "New purchase credits start as Pending." : undefined}
                error={errorFor(path("paymentStatus"))}
              >
                <PurchaseCreditSelectField
                  id={`purchase-credit-payment-status-${index}`}
                  value={payment.paymentStatus}
                  options={PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS}
                  placeholder="Select status"
                  disabled={!isEditing}
                  error={errorFor(path("paymentStatus"))}
                  onChange={(value) => formik.setFieldValue(path("paymentStatus"), value, true)}
                  onBlur={() => formik.setFieldTouched(path("paymentStatus"), true, true)}
                />
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-payment-amount-${index}`}
                label="Amount"
                required
                error={errorFor(path("amount"))}
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                  <Input
                    id={`purchase-credit-payment-amount-${index}`}
                    type="number"
                    min={PURCHASE_CREDIT_AMOUNT_MIN}
                    max={PURCHASE_CREDIT_AMOUNT_MAX}
                    inputMode="decimal"
                    className="pl-7"
                    {...inputProps(path("amount"), `purchase-credit-payment-amount-${index}`)}
                  />
                </div>
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-payment-type-${index}`}
                label="Payment type"
                required
                error={errorFor(path("paymentType"))}
              >
                <PurchaseCreditSelectField
                  id={`purchase-credit-payment-type-${index}`}
                  value={payment.paymentType}
                  options={PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS}
                  placeholder="Select payment type"
                  error={errorFor(path("paymentType"))}
                  onChange={(value) => formik.setFieldValue(path("paymentType"), value, true)}
                  onBlur={() => formik.setFieldTouched(path("paymentType"), true, true)}
                />
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-reference-id-${index}`}
                label="Reference ID"
                hint={!isEditing ? "Available when updating the purchase credit." : undefined}
                error={errorFor(path("referenceId"))}
              >
                <Input
                  id={`purchase-credit-reference-id-${index}`}
                  maxLength={PURCHASE_CREDIT_REFERENCE_ID_MAX_LENGTH}
                  disabled={!isEditing}
                  placeholder="Transaction reference"
                  {...inputProps(path("referenceId"), `purchase-credit-reference-id-${index}`)}
                />
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-payment-date-${index}`}
                label="Payment date"
                required
                error={errorFor(path("paymentDate"))}
              >
                <PurchaseCreditDatePicker
                  id={`purchase-credit-payment-date-${index}`}
                  label="Payment date"
                  value={payment.paymentDate}
                  max={today}
                  required
                  error={errorFor(path("paymentDate"))}
                  onChange={(value) => formik.setFieldValue(path("paymentDate"), value, true)}
                  onBlur={() => formik.setFieldTouched(path("paymentDate"), true, true)}
                />
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-received-payment-date-${index}`}
                label="Received payment date"
                required={isEditing}
                hint={!isEditing ? "Available when updating the purchase credit." : undefined}
                error={errorFor(path("receivedPaymentDate"))}
              >
                <PurchaseCreditDatePicker
                  id={`purchase-credit-received-payment-date-${index}`}
                  label="Received payment date"
                  value={payment.receivedPaymentDate}
                  max={today}
                  disabled={!isEditing}
                  required={isEditing}
                  error={errorFor(path("receivedPaymentDate"))}
                  onChange={(value) => formik.setFieldValue(path("receivedPaymentDate"), value, true)}
                  onBlur={() => formik.setFieldTouched(path("receivedPaymentDate"), true, true)}
                />
              </PurchaseCreditFormField>

              <div className="sm:col-span-2 lg:col-span-3">
                <PurchaseCreditFormField
                  id={`purchase-credit-payment-notes-${index}`}
                  label="Notes"
                  error={errorFor(path("notes"))}
                >
                  <Textarea
                    id={`purchase-credit-payment-notes-${index}`}
                    maxLength={PURCHASE_CREDIT_NOTES_MAX_LENGTH}
                    placeholder="Optional payment notes"
                    {...inputProps(path("notes"), `purchase-credit-payment-notes-${index}`)}
                  />
                </PurchaseCreditFormField>
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <PurchaseCreditFormField
                  id={`purchase-credit-payment-receipts-${index}`}
                  label="Payment receipts"
                  error={errorFor(path("paymentReceipts"))}
                >
                  <PurchaseCreditFileUploader
                    id={`purchase-credit-payment-receipts-${index}`}
                    value={payment.paymentReceipts}
                    error={errorFor(path("paymentReceipts"))}
                    onChange={(value) => formik.setFieldValue(path("paymentReceipts"), value, true)}
                    onBlur={() => formik.setFieldTouched(path("paymentReceipts"), true, true)}
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

export default PurchaseCreditPaymentFields;
