import _ from "lodash";
import moment from "moment";

import {
  PURCHASE_CREDIT_PAYMENT_STATUSES,
  PURCHASE_CREDIT_PAYMENT_TYPES,
} from "@Enums";

const toIsoDateTime = (value) => {
  if (!value) return undefined;

  const date = moment(value, [moment.ISO_8601, "YYYY-MM-DD"], true);
  return date.isValid() ? date.startOf("day").format() : undefined;
};

const toIsoUtcDateTime = (value) => {
  if (!value) return undefined;

  const date = moment.utc(value, [moment.ISO_8601, "YYYY-MM-DD"], true);
  return date.isValid() ? date.startOf("day").toISOString() : undefined;
};

const optionalText = (value) => _.trim(value ?? "") || undefined;
const receiptValues = (receipts = []) => _.filter(receipts, Boolean);

const toProductPayload = (item = {}) => ({
  product: item.product,
  stock: _.toNumber(item.stock),
});

const toPaymentPayload = (payment = {}) =>
  _.omitBy(
    {
      payment_status: payment.paymentStatus,
      amount: _.toNumber(payment.amount),
      payment_type: payment.paymentType,
      reference_id:
        payment.paymentType === PURCHASE_CREDIT_PAYMENT_TYPES.CASH
          ? undefined
          : optionalText(payment.referenceId),
      payment_date: toIsoDateTime(payment.paymentDate),
      received_payment_date: toIsoDateTime(payment.receivedPaymentDate),
      notes: optionalText(payment.notes),
      payment_receipts: receiptValues(payment.paymentReceipts),
    },
    _.isUndefined,
  );

const toPaymentPlanPayload = (plan = {}) =>
  _.omitBy(
    {
      reminding_date: toIsoDateTime(plan.remindingDate),
      amount: _.toNumber(plan.amount),
      payment_type: plan.paymentType,
      is_payment_completed: Boolean(plan.isPaymentCompleted),
      notes: optionalText(plan.notes),
    },
    _.isUndefined,
  );

function toPurchaseCreditMutationPayload(values = {}) {
  return _.omitBy(
    {
      supplier: values.supplier,
      products: _.map(values.products ?? [], toProductPayload),
      credited_at: toIsoDateTime(values.purchaseCreditAt),
      credit_amount: _.toNumber(values.purchaseCreditAmount),
      expected_delivery_date: toIsoDateTime(values.expectedDeliveryDate),
      acknowledgement_id: optionalText(values.acknowledgementId),
      acknowledgement_receipts: receiptValues(
        values.acknowledgementReceipts,
      ),
      payments: _.map(values.payments ?? [], toPaymentPayload),
      payment_planning: _.map(
        values.paymentPlanning ?? [],
        toPaymentPlanPayload,
      ),
    },
    _.isUndefined,
  );
}

export function toPurchaseCreditCreatePayload(values = {}) {
  return toPurchaseCreditMutationPayload(values);
}

export function toPurchaseCreditUpdatePayload(values = {}) {
  return _.omitBy(
    {
      credit_amount: _.toNumber(values.purchaseCreditAmount),
      expected_delivery_date: toIsoUtcDateTime(values.expectedDeliveryDate),
      acknowledgement_id: optionalText(values.acknowledgementId),
      acknowledgement_receipts: receiptValues(
        values.acknowledgementReceipts,
      ),
    },
    _.isUndefined,
  );
}

export function toPurchaseCreditPaymentUpdatePayload(values = {}) {
  const paymentStatus = values.paymentStatus;

  return _.omitBy(
    {
      payment_status: paymentStatus,
      received_payment_date:
        paymentStatus === PURCHASE_CREDIT_PAYMENT_STATUSES.PAID
          ? toIsoUtcDateTime(values.receivedPaymentDate)
          : undefined,
      notes: optionalText(values.notes),
    },
    _.isUndefined,
  );
}

export function toPurchaseCreditPaymentCreatePayload(values = {}) {
  return _.omitBy(
    {
      amount: _.toNumber(values.amount),
      payment_type: values.paymentType,
      reference_id:
        values.paymentType === PURCHASE_CREDIT_PAYMENT_TYPES.CASH
          ? undefined
          : optionalText(values.referenceId),
      payment_date: toIsoUtcDateTime(values.paymentDate),
      notes: optionalText(values.notes),
      payment_receipts: receiptValues(values.paymentReceipts),
    },
    _.isUndefined,
  );
}

export function toPurchaseCreditPlannedPaymentCreatePayload(values = {}) {
  return _.omitBy(
    {
      payment_status: PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS,
      amount: _.toNumber(values.amount),
      payment_type: values.paymentType,
      reference_id:
        values.paymentType === PURCHASE_CREDIT_PAYMENT_TYPES.CASH
          ? undefined
          : optionalText(values.referenceId),
      payment_date: toIsoUtcDateTime(values.paymentDate),
      received_payment_date: toIsoUtcDateTime(
        values.receivedPaymentDate,
      ),
      notes: optionalText(values.notes),
      payment_receipts: receiptValues(values.paymentReceipts),
    },
    _.isUndefined,
  );
}

export function toPurchaseCreditPaymentPlanningCreatePayload(values = {}) {
  return _.omitBy(
    {
      reminding_date: toIsoUtcDateTime(values.remindingDate),
      amount: _.toNumber(values.amount),
      payment_type: values.paymentType,
      notes: optionalText(values.notes),
    },
    _.isUndefined,
  );
}

export function toPurchaseCreditPaymentPlanningUpdatePayload(values = {}) {
  return _.omitBy(
    {
      reminding_date: toIsoUtcDateTime(values.remindingDate),
      amount: _.toNumber(values.amount),
      payment_type: values.paymentType,
      is_payment_completed: Boolean(values.isPaymentCompleted),
      notes: optionalText(values.notes),
    },
    _.isUndefined,
  );
}
