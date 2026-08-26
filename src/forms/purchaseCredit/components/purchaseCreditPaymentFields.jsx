import _ from "lodash";
import { Trash2 } from "lucide-react";
import moment from "moment";

import {
  PURCHASE_CREDIT_PAYMENT_TYPES,
  PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS,
  PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS,
} from "@Enums";
import {
  PURCHASE_CREDIT_AMOUNT_MAX,
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
  const purchaseCreditAt = moment(
    formik.values.purchaseCreditAt,
    "YYYY-MM-DD",
    true,
  );
  const minimumPaymentDate = purchaseCreditAt.isValid()
    ? purchaseCreditAt.format("YYYY-MM-DD")
    : undefined;
  const purchaseCreditAmount = _.toNumber(formik.values.purchaseCreditAmount);
  const paymentPlanningTotal = _.sumBy(
    formik.values.paymentPlanning,
    (plan) => {
      const amount = _.toNumber(plan.amount);
      return _.isFinite(amount) ? amount : 0;
    },
  );

  return (
    <div className="space-y-4">
      {_.map(payments, (payment, index) => {
        const prefix = `payments[${index}]`;
        const path = (field) => `${prefix}.${field}`;
        const referenceIdDisabled =
          payment.paymentType === PURCHASE_CREDIT_PAYMENT_TYPES.CASH;
        const referenceIdRequired =
          Boolean(payment.paymentType) && !referenceIdDisabled;
        const otherPaymentsTotal = _.sumBy(payments, (item, itemIndex) => {
          if (itemIndex === index) return 0;

          const amount = _.toNumber(item.amount);
          return _.isFinite(amount) ? amount : 0;
        });
        const availablePaymentAmount = _.isFinite(purchaseCreditAmount)
          ? _.max([
              0,
              _.min([
                PURCHASE_CREDIT_AMOUNT_MAX,
                purchaseCreditAmount -
                  otherPaymentsTotal -
                  paymentPlanningTotal,
              ]),
            ])
          : PURCHASE_CREDIT_AMOUNT_MAX;

        const changePaymentType = (value) => {
          formik.setValues(
            (current) => ({
              ...current,
              payments: _.map(current.payments, (item, itemIndex) =>
                itemIndex === index
                  ? {
                      ...item,
                      paymentType: value,
                      ...(value === PURCHASE_CREDIT_PAYMENT_TYPES.CASH
                        ? { referenceId: "" }
                        : {}),
                    }
                  : item,
              ),
            }),
            true,
          );

          if (value === PURCHASE_CREDIT_PAYMENT_TYPES.CASH) {
            formik.setFieldTouched(path("referenceId"), false, false);
          }
        };

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
                hint={
                  !isEditing
                    ? "New purchase credits start as In progress."
                    : undefined
                }
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
                hint={`Available amount: ₹${availablePaymentAmount.toLocaleString("en-IN")}`}
                error={errorFor(path("amount"))}
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                  <Input
                    id={`purchase-credit-payment-amount-${index}`}
                    type="text"
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
                  onChange={changePaymentType}
                  onBlur={() => formik.setFieldTouched(path("paymentType"), true, true)}
                />
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-reference-id-${index}`}
                label="Reference ID"
                required={referenceIdRequired}
                hint={
                  referenceIdDisabled
                    ? "Reference ID is not required for cash payments."
                    : undefined
                }
                error={errorFor(path("referenceId"))}
              >
                <Input
                  id={`purchase-credit-reference-id-${index}`}
                  maxLength={PURCHASE_CREDIT_REFERENCE_ID_MAX_LENGTH}
                  disabled={referenceIdDisabled}
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
                  min={minimumPaymentDate}
                  max={today}
                  required
                  error={errorFor(path("paymentDate"))}
                  onChange={(value) => formik.setFieldValue(path("paymentDate"), value, true)}
                  onBlur={() => formik.setFieldTouched(path("paymentDate"), true, true)}
                />
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-received-payment-date-${index}`}
                label="Settlement date"
                required={isEditing}
                hint={!isEditing ? "Available when updating the purchase credit." : undefined}
                error={errorFor(path("receivedPaymentDate"))}
              >
                <PurchaseCreditDatePicker
                  id={`purchase-credit-received-payment-date-${index}`}
                  label="Settlement date"
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
