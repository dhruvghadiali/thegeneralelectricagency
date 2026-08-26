import _ from "lodash";
import moment from "moment";

import { PURCHASE_CREDIT_PAYMENT_TYPES } from "@Enums";

const toIsoDateTime = (value) => {
  if (!value) return undefined;

  const date = moment(value, [moment.ISO_8601, "YYYY-MM-DD"], true);
  return date.isValid() ? date.startOf("day").format() : undefined;
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
  return toPurchaseCreditMutationPayload(values);
}
