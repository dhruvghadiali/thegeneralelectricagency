import _ from "lodash";

import { PURCHASE_CREDIT_PAYMENT_STATUSES } from "@Enums";

const PURCHASE_CREDIT_ALLOCATED_PAYMENT_STATUSES = Object.freeze([
  PURCHASE_CREDIT_PAYMENT_STATUSES.PAID,
  PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS,
]);

const PURCHASE_CREDIT_AMOUNT_FORMATTER = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

const PURCHASE_CREDIT_AMOUNT_UNITS = Object.freeze([
  { minimum: 10_000_000, divisor: 10_000_000, label: "Cr" },
  { minimum: 100_000, divisor: 100_000, label: "Lac" },
  { minimum: 1_000, divisor: 1_000, label: "K" },
]);

export function formatPurchaseCreditAmount(value) {
  const parsedAmount = _.toNumber(value);
  const amount = _.isFinite(parsedAmount) ? parsedAmount : 0;
  const unit = _.find(
    PURCHASE_CREDIT_AMOUNT_UNITS,
    ({ minimum }) => Math.abs(amount) >= minimum,
  );

  if (!unit) return `₹${PURCHASE_CREDIT_AMOUNT_FORMATTER.format(amount)}`;

  return `₹${PURCHASE_CREDIT_AMOUNT_FORMATTER.format(amount / unit.divisor)} ${unit.label}`;
}

export function isPurchaseCreditPaymentAmountAllocated(
  payment = {},
  { preferSavedStatus = false } = {},
) {
  const paymentStatus =
    preferSavedStatus && payment.id
      ? (payment.savedPaymentStatus ?? payment.paymentStatus)
      : payment.paymentStatus;

  return _.includes(
    PURCHASE_CREDIT_ALLOCATED_PAYMENT_STATUSES,
    paymentStatus,
  );
}

export function getPurchaseCreditCreatedPaymentId(response = {}) {
  const payment =
    response.payment ??
    response.created_payment ??
    response.createdPayment ??
    response;
  const responsePayments = response.payments ?? [];

  return (
    payment?._id ??
    payment?.id ??
    payment?.payment_id ??
    payment?.paymentId ??
    _.last(responsePayments)?._id ??
    _.last(responsePayments)?.id ??
    null
  );
}

export function hasPurchaseCreditPaymentChanges(payment = {}) {
  return (
    payment.paymentStatus !== payment.savedPaymentStatus ||
    payment.receivedPaymentDate !== payment.savedReceivedPaymentDate ||
    payment.notes !== payment.savedNotes
  );
}

export function hasPurchaseCreditPaymentPlanningChanges(plan = {}) {
  return (
    plan.remindingDate !== plan.savedRemindingDate ||
    String(plan.amount) !== String(plan.savedAmount) ||
    plan.paymentType !== plan.savedPaymentType ||
    Boolean(plan.isPaymentCompleted) !==
      Boolean(plan.savedIsPaymentCompleted) ||
    plan.notes !== plan.savedNotes
  );
}

export function countPurchaseCreditValidationErrors(error) {
  if (!error) return 0;
  if (_.isString(error)) return 1;

  if (_.isArray(error)) {
    return _.reduce(
      error,
      (total, item) => total + countPurchaseCreditValidationErrors(item),
      0,
    );
  }

  if (_.isObject(error)) {
    return _.reduce(
      _.values(error),
      (total, item) => total + countPurchaseCreditValidationErrors(item),
      0,
    );
  }

  return 0;
}
