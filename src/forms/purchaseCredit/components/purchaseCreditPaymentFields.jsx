import { useState } from "react";
import _ from "lodash";
import { LoaderCircle, Save, Trash2 } from "lucide-react";
import moment from "moment";

import {
  PURCHASE_CREDIT_PAYMENT_STATUSES,
  PURCHASE_CREDIT_PAYMENT_TYPES,
  PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS,
  PURCHASE_CREDIT_PAYMENT_STATUS_TRANSITIONS,
  PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS,
} from "@Enums";
import {
  PURCHASE_CREDIT_AMOUNT_MAX,
  PURCHASE_CREDIT_NOTES_MAX_LENGTH,
  PURCHASE_CREDIT_REFERENCE_ID_MAX_LENGTH,
} from "@Forms/purchaseCredit/purchaseCredit.validation.constants";
import { Badge } from "@shadcnComponent/badge";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Textarea } from "@shadcnComponent/textarea";
import PurchaseCreditDatePicker from "@Forms/purchaseCredit/components/purchaseCreditDatePicker";
import PurchaseCreditFileUploader from "@Forms/purchaseCredit/components/purchaseCreditFileUploader";
import PurchaseCreditFormField from "@Forms/purchaseCredit/components/purchaseCreditFormField";
import PurchaseCreditSelectField from "@Forms/purchaseCredit/components/purchaseCreditSelectField";
import PurchaseCreditCollectionCardHeader from "@Forms/purchaseCredit/components/purchaseCreditCollectionCardHeader";
import {
  hasPurchaseCreditPaymentChanges,
  isPurchaseCreditPaymentAmountAllocated,
} from "@Forms/purchaseCredit/purchaseCreditForm.utils";

function PurchaseCreditPaymentFields({
  payments,
  isEditing,
  today,
  formik,
  errorFor,
  inputProps,
  updatingPaymentId,
  creatingPaymentIndex = null,
  onChangePaymentStatus,
  onSaveNewPayment,
  onSavePayment,
  onRemove,
}) {
  const [collapsedCards, setCollapsedCards] = useState({});
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
    _.filter(
      formik.values.paymentPlanning,
      (plan) => !plan.isPaymentCompleted,
    ),
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
        const cardKey = payment.id ?? `payment-${index}`;
        const isCollapsed = collapsedCards[cardKey] ?? true;
        const isSavedPayment = Boolean(payment.id);
        const savedPaymentStatus = payment.savedPaymentStatus;
        const allowedPaymentStatuses =
          PURCHASE_CREDIT_PAYMENT_STATUS_TRANSITIONS[savedPaymentStatus] ?? [];
        const paymentStatusOptions = isSavedPayment
          ? _.filter(
              PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS,
              ({ value }) =>
                value === savedPaymentStatus ||
                _.includes(allowedPaymentStatuses, value),
            )
          : PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS;
        const isSavingPayment = updatingPaymentId === payment.id;
        const hasSavedPaymentChanges =
          isSavedPayment && hasPurchaseCreditPaymentChanges(payment);
        const isCreatingPayment =
          !isSavedPayment && creatingPaymentIndex === index;
        const isAnyPaymentSaving =
          Boolean(updatingPaymentId) || creatingPaymentIndex !== null;
        const savedPaymentReadOnly = isEditing && isSavedPayment;
        const settlementDateRequired =
          isEditing &&
          payment.paymentStatus === PURCHASE_CREDIT_PAYMENT_STATUSES.PAID &&
          (!isSavedPayment || payment.paymentStatus !== savedPaymentStatus);
        const settlementDateDisabled =
          !isEditing ||
          !isSavedPayment ||
          (isSavedPayment && !settlementDateRequired) ||
          isAnyPaymentSaving;
        const canRemovePayment =
          !isSavedPayment && (isEditing || payments.length > 1);
        const referenceIdDisabled =
          payment.paymentType === PURCHASE_CREDIT_PAYMENT_TYPES.CASH;
        const referenceIdRequired =
          Boolean(payment.paymentType) && !referenceIdDisabled;
        const statusLabel =
          _.find(
            PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS,
            ({ value }) => value === payment.paymentStatus,
          )?.label ?? "Unknown";
        const statusVariant =
          payment.paymentStatus === PURCHASE_CREDIT_PAYMENT_STATUSES.PAID
            ? "success"
            : payment.paymentStatus ===
                PURCHASE_CREDIT_PAYMENT_STATUSES.FAILED
              ? "destructive"
              : payment.paymentStatus ===
                  PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS
                ? "warning"
                : "outline";
        const otherPaymentsTotal = _.sumBy(payments, (item, itemIndex) => {
          if (
            itemIndex === index ||
            !isPurchaseCreditPaymentAmountAllocated(item, {
              preferSavedStatus: isEditing,
            })
          ) {
            return 0;
          }

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
          <div key={cardKey} className="rounded-xl border bg-muted/10 p-4 sm:p-5">
            <PurchaseCreditCollectionCardHeader
              title={`Payment ${index + 1}`}
              isCollapsed={isCollapsed}
              statusLabel={statusLabel}
              statusVariant={statusVariant}
              amount={payment.amount}
              expandedBadge={
                isSavedPayment &&
                savedPaymentStatus ===
                  PURCHASE_CREDIT_PAYMENT_STATUSES.PAID ? (
                  <Badge variant="success">Settled payment</Badge>
                ) : null
              }
              onToggle={() =>
                setCollapsedCards((current) => ({
                  ...current,
                  [cardKey]: !isCollapsed,
                }))
              }
            >
                {isEditing && !isSavedPayment && (
                  <Button
                    type="button"
                    size="sm"
                    disabled={isAnyPaymentSaving}
                    onClick={() => onSaveNewPayment(payment, index)}
                  >
                    {isCreatingPayment ? (
                      <LoaderCircle
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Save className="size-4" aria-hidden="true" />
                    )}
                    Save payment
                  </Button>
                )}
                {isEditing && isSavedPayment && (
                  <Button
                    type="button"
                    size="sm"
                    disabled={
                      isAnyPaymentSaving ||
                      !hasSavedPaymentChanges
                    }
                    onClick={() => onSavePayment(payment, index)}
                  >
                    {isSavingPayment ? (
                      <LoaderCircle
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Save className="size-4" aria-hidden="true" />
                    )}
                    Save payment
                  </Button>
                )}
                {canRemovePayment && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove payment ${index + 1}`}
                    disabled={isAnyPaymentSaving}
                    onClick={() => onRemove(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </Button>
                )}
            </PurchaseCreditCollectionCardHeader>
            {!isCollapsed && (
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
                  options={paymentStatusOptions}
                  placeholder="Select status"
                  disabled={
                    !isEditing ||
                    !isSavedPayment ||
                    (isSavedPayment &&
                      (allowedPaymentStatuses.length === 0 ||
                        isAnyPaymentSaving))
                  }
                  error={errorFor(path("paymentStatus"))}
                  onChange={(value) =>
                    isSavedPayment
                      ? onChangePaymentStatus(index, value)
                      : formik.setFieldValue(path("paymentStatus"), value, true)
                  }
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
                    disabled={savedPaymentReadOnly || isCreatingPayment}
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
                  disabled={savedPaymentReadOnly || isCreatingPayment}
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
                  disabled={
                    referenceIdDisabled ||
                    savedPaymentReadOnly ||
                    isCreatingPayment
                  }
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
                  disabled={savedPaymentReadOnly || isCreatingPayment}
                  required
                  error={errorFor(path("paymentDate"))}
                  onChange={(value) => formik.setFieldValue(path("paymentDate"), value, true)}
                  onBlur={() => formik.setFieldTouched(path("paymentDate"), true, true)}
                />
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-received-payment-date-${index}`}
                label="Settlement date"
                required={settlementDateRequired}
                hint={!isEditing ? "Available when updating the purchase credit." : undefined}
                error={errorFor(path("receivedPaymentDate"))}
              >
                <PurchaseCreditDatePicker
                  id={`purchase-credit-received-payment-date-${index}`}
                  label="Settlement date"
                  value={payment.receivedPaymentDate}
                  min={payment.paymentDate || undefined}
                  max={today}
                  disabled={settlementDateDisabled}
                  required={settlementDateRequired}
                  error={errorFor(path("receivedPaymentDate"))}
                  onChange={(value) => formik.setFieldValue(path("receivedPaymentDate"), value, true)}
                  onBlur={() => formik.setFieldTouched(path("receivedPaymentDate"), true, true)}
                />
              </PurchaseCreditFormField>

              <div className="sm:col-span-2 lg:col-span-3">
                <PurchaseCreditFormField
                  id={`purchase-credit-payment-notes-${index}`}
                  label="Notes"
                  required={
                    isSavedPayment &&
                    payment.paymentStatus ===
                      PURCHASE_CREDIT_PAYMENT_STATUSES.REFUND
                  }
                  error={errorFor(path("notes"))}
                >
                  <Textarea
                    id={`purchase-credit-payment-notes-${index}`}
                    maxLength={PURCHASE_CREDIT_NOTES_MAX_LENGTH}
                    placeholder="Optional payment notes"
                    {...inputProps(path("notes"), `purchase-credit-payment-notes-${index}`)}
                    disabled={
                      isCreatingPayment ||
                      (savedPaymentReadOnly && isAnyPaymentSaving)
                    }
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
                    disabled={savedPaymentReadOnly || isCreatingPayment}
                    error={errorFor(path("paymentReceipts"))}
                    onChange={(value) => formik.setFieldValue(path("paymentReceipts"), value, true)}
                    onBlur={() => formik.setFieldTouched(path("paymentReceipts"), true, true)}
                  />
                </PurchaseCreditFormField>
              </div>
            </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PurchaseCreditPaymentFields;
