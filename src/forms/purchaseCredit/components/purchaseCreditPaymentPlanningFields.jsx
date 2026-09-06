import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { LoaderCircle, Save, Trash2 } from "lucide-react";

import {
  PURCHASE_CREDIT_PAYMENT_COMPLETION_OPTIONS,
  PURCHASE_CREDIT_PAYMENT_STATUSES,
  PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS,
} from "@Enums";
import { EMPTY_PURCHASE_CREDIT_PAYMENT } from "@Forms/purchaseCredit/purchaseCredit.initialValues";
import {
  PURCHASE_CREDIT_AMOUNT_MAX,
  PURCHASE_CREDIT_NOTES_MAX_LENGTH,
} from "@Forms/purchaseCredit/purchaseCredit.validation.constants";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Textarea } from "@shadcnComponent/textarea";
import PurchaseCreditDatePicker from "@Forms/purchaseCredit/components/purchaseCreditDatePicker";
import PurchaseCreditFormField from "@Forms/purchaseCredit/components/purchaseCreditFormField";
import PurchaseCreditSelectField from "@Forms/purchaseCredit/components/purchaseCreditSelectField";
import PurchaseCreditCollectionCardHeader from "@Forms/purchaseCredit/components/purchaseCreditCollectionCardHeader";
import PurchaseCreditPaymentPlanningCompletionDialog from "@Forms/purchaseCredit/components/purchaseCreditPaymentPlanningCompletionDialog";
import {
  hasPurchaseCreditPaymentPlanningChanges,
  getPurchaseCreditCreatedPaymentId,
  isPurchaseCreditPaymentAmountAllocated,
} from "@Forms/purchaseCredit/purchaseCreditForm.utils";

function PurchaseCreditPaymentPlanningFields({
  plans,
  isEditing,
  today,
  formik,
  errorFor,
  inputProps,
  creatingPaymentPlanningIndex = null,
  updatingPaymentPlanningId,
  completingPaymentPlanningId,
  paymentPlanningCompletionError,
  onSaveNewPaymentPlanning,
  onSavePaymentPlanning,
  onCompletePaymentPlanning,
  onRemove,
}) {
  const [completionPlanIndex, setCompletionPlanIndex] = useState(null);
  const [collapsedCards, setCollapsedCards] = useState({});
  const openCompletionDialogTimer = useRef(null);
  const purchaseCreditAmount = _.toNumber(formik.values.purchaseCreditAmount);
  const paymentsTotal = _.sumBy(
    _.filter(formik.values.payments, (payment) =>
      isPurchaseCreditPaymentAmountAllocated(payment, {
        preferSavedStatus: true,
      }),
    ),
    (payment) => {
      const amount = _.toNumber(payment.amount);
      return _.isFinite(amount) ? amount : 0;
    },
  );

  useEffect(
    () => () => {
      if (openCompletionDialogTimer.current !== null) {
        window.clearTimeout(openCompletionDialogTimer.current);
      }
    },
    [],
  );

  if (plans.length === 0) {
    return (
      <div className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
        No payment plans added.
      </div>
    );
  }

  const completionPlan =
    completionPlanIndex === null ? null : plans[completionPlanIndex];

  const closeCompletionDialog = () => setCompletionPlanIndex(null);
  const openCompletionDialog = (planIndex) => {
    if (openCompletionDialogTimer.current !== null) {
      window.clearTimeout(openCompletionDialogTimer.current);
    }

    openCompletionDialogTimer.current = window.setTimeout(() => {
      setCompletionPlanIndex(planIndex);
      openCompletionDialogTimer.current = null;
    }, 200);
  };
  const confirmPlanCompletion = async (paymentDetails) => {
    if (
      completionPlanIndex === null ||
      !completionPlan?.id ||
      !onCompletePaymentPlanning
    ) {
      return false;
    }

    let response;

    try {
      response = await onCompletePaymentPlanning(
        completionPlan.id,
        { ...completionPlan, isPaymentCompleted: true },
        paymentDetails,
      );
    } catch {
      return false;
    }

    const paymentId = getPurchaseCreditCreatedPaymentId(response?.payment);
    const savedPayment = paymentId
      ? {
          ...EMPTY_PURCHASE_CREDIT_PAYMENT,
          ...paymentDetails,
          id: paymentId,
          paymentStatus: PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS,
          savedPaymentStatus:
            PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS,
          savedReceivedPaymentDate: paymentDetails.receivedPaymentDate,
          savedNotes: paymentDetails.notes,
        }
      : null;

    await formik.setValues(
      (current) => ({
        ...current,
        payments: savedPayment
          ? _.concat(current.payments, savedPayment)
          : current.payments,
        paymentPlanning: _.map(
          current.paymentPlanning,
          (plan, index) =>
            index === completionPlanIndex
              ? {
                  ...plan,
                  isPaymentCompleted: true,
                  savedIsPaymentCompleted: true,
                  savedRemindingDate: plan.remindingDate,
                  savedAmount: plan.amount,
                  savedPaymentType: plan.paymentType,
                  savedNotes: plan.notes,
                  completionPayment: paymentDetails,
                }
              : plan,
        ),
      }),
      false,
    );

    if (!paymentId) {
      formik.setStatus(
        "The payment and payment plan were saved, but the payment identifier was not returned. Reopen the purchase credit before updating that payment.",
      );
    }

    closeCompletionDialog();
    return true;
  };

  return (
    <div className="space-y-4">
      {_.map(plans, (plan, index) => {
        const prefix = `paymentPlanning[${index}]`;
        const path = (field) => `${prefix}.${field}`;
        const cardKey = plan.id ?? `payment-plan-${index}`;
        const isCollapsed = collapsedCards[cardKey] ?? true;
        const isSavedPlan = Boolean(plan.id);
        const isPlanCompleted = Boolean(plan.isPaymentCompleted);
        const isCreatingPlan =
          !isSavedPlan && creatingPaymentPlanningIndex === index;
        const isUpdatingPlan =
          isSavedPlan && updatingPaymentPlanningId === plan.id;
        const isAnyPlanCreating =
          creatingPaymentPlanningIndex !== null;
        const isAnyPlanSaving =
          isAnyPlanCreating ||
          Boolean(updatingPaymentPlanningId) ||
          Boolean(completingPaymentPlanningId);
        const hasSavedPlanChanges =
          isSavedPlan && hasPurchaseCreditPaymentPlanningChanges(plan);
        const otherPlansTotal = _.sumBy(plans, (item, itemIndex) => {
          if (itemIndex === index || item.isPaymentCompleted) return 0;

          const amount = _.toNumber(item.amount);
          return _.isFinite(amount) ? amount : 0;
        });
        const availablePlanningAmount = _.isFinite(purchaseCreditAmount)
          ? _.max([
              0,
              _.min([
                PURCHASE_CREDIT_AMOUNT_MAX,
                purchaseCreditAmount - paymentsTotal - otherPlansTotal,
              ]),
            ])
          : PURCHASE_CREDIT_AMOUNT_MAX;

        return (
          <div
            key={cardKey}
            className="rounded-xl border bg-muted/10 p-4 sm:p-5"
          >
            <PurchaseCreditCollectionCardHeader
              title={`Payment plan ${index + 1}`}
              isCollapsed={isCollapsed}
              statusLabel={isPlanCompleted ? "Completed" : "Pending"}
              statusVariant={isPlanCompleted ? "success" : "warning"}
              amount={plan.amount}
              onToggle={() =>
                setCollapsedCards((current) => ({
                  ...current,
                  [cardKey]: !isCollapsed,
                }))
              }
            >
                {isEditing && !isSavedPlan && (
                  <Button
                    type="button"
                    size="sm"
                    disabled={isAnyPlanSaving}
                    onClick={() => onSaveNewPaymentPlanning(plan, index)}
                  >
                    {isCreatingPlan ? (
                      <LoaderCircle
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Save className="size-4" aria-hidden="true" />
                    )}
                    Save plan
                  </Button>
                )}
                {isEditing && isSavedPlan && (
                  <Button
                    type="button"
                    size="sm"
                    disabled={
                      isAnyPlanSaving ||
                      isPlanCompleted ||
                      !hasSavedPlanChanges
                    }
                    onClick={() => onSavePaymentPlanning(plan, index)}
                  >
                    {isUpdatingPlan ? (
                      <LoaderCircle
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Save className="size-4" aria-hidden="true" />
                    )}
                    Save plan
                  </Button>
                )}
                {(!isEditing || !isSavedPlan) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove payment plan ${index + 1}`}
                    disabled={isAnyPlanSaving}
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
                id={`purchase-credit-reminding-date-${index}`}
                label="Reminding date"
                error={errorFor(path("remindingDate"))}
              >
                <PurchaseCreditDatePicker
                  id={`purchase-credit-reminding-date-${index}`}
                  label="Reminding date"
                  value={plan.remindingDate}
                  min={today}
                  disabled={
                    isPlanCompleted || isCreatingPlan || isUpdatingPlan
                  }
                  error={errorFor(path("remindingDate"))}
                  onChange={(value) => formik.setFieldValue(path("remindingDate"), value, true)}
                  onBlur={() => formik.setFieldTouched(path("remindingDate"), true, true)}
                />
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-plan-amount-${index}`}
                label="Amount"
                required
                hint={`Available amount: ₹${availablePlanningAmount.toLocaleString("en-IN")}`}
                error={errorFor(path("amount"))}
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                  <Input
                    id={`purchase-credit-plan-amount-${index}`}
                    type="text"
                    inputMode="decimal"
                    className="pl-7"
                    {...inputProps(path("amount"), `purchase-credit-plan-amount-${index}`)}
                    disabled={
                      isPlanCompleted || isCreatingPlan || isUpdatingPlan
                    }
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
                  disabled={
                    isPlanCompleted || isCreatingPlan || isUpdatingPlan
                  }
                  error={errorFor(path("paymentType"))}
                  onChange={(value) => formik.setFieldValue(path("paymentType"), value, true)}
                  onBlur={() => formik.setFieldTouched(path("paymentType"), true, true)}
                />
              </PurchaseCreditFormField>

              <PurchaseCreditFormField
                id={`purchase-credit-payment-completed-${index}`}
                label="Payment completed"
                required
                hint={
                  !isSavedPlan && !plan.isPaymentCompleted
                    ? "New payment plans start as No."
                    : undefined
                }
                error={errorFor(path("isPaymentCompleted"))}
              >
                <PurchaseCreditSelectField
                  id={`purchase-credit-payment-completed-${index}`}
                  value={String(plan.isPaymentCompleted)}
                  options={PURCHASE_CREDIT_PAYMENT_COMPLETION_OPTIONS}
                  placeholder="Select Yes or No"
                  disabled={
                    !isEditing ||
                    !isSavedPlan ||
                    isPlanCompleted ||
                    isCreatingPlan ||
                    isUpdatingPlan
                  }
                  error={errorFor(path("isPaymentCompleted"))}
                  onChange={(value) => {
                    if (value === "true") {
                      openCompletionDialog(index);
                      return;
                    }

                    formik.setFieldValue(
                      path("isPaymentCompleted"),
                      false,
                      true,
                    );
                  }}
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
                    disabled={
                      isPlanCompleted || isCreatingPlan || isUpdatingPlan
                    }
                  />
                </PurchaseCreditFormField>
              </div>
            </div>
            )}
          </div>
        );
      })}
      <PurchaseCreditPaymentPlanningCompletionDialog
        open={completionPlanIndex !== null}
        plan={completionPlan}
        today={today}
        isSubmitting={
          Boolean(completionPlan?.id) &&
          completingPaymentPlanningId === completionPlan.id
        }
        submissionError={paymentPlanningCompletionError}
        onCancel={closeCompletionDialog}
        onConfirm={confirmPlanCompletion}
      />
    </div>
  );
}

export default PurchaseCreditPaymentPlanningFields;
