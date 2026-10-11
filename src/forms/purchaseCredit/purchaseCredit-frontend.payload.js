import _ from "lodash";
import moment from "moment";

import { PURCHASE_CREDIT_PAYMENT_STATUSES } from "@Enums";
import {
  EMPTY_PURCHASE_CREDIT_PAYMENT,
  EMPTY_PURCHASE_CREDIT_PAYMENT_PLAN,
  EMPTY_PURCHASE_CREDIT_PRODUCT,
} from "@Forms/purchaseCredit/purchaseCredit.initialValues";

const entityId = (value) =>
  _.isObject(value) ? (value._id ?? value.id ?? "") : (value ?? "");

const toFormDate = (value) => {
  if (!value) return "";
  const date = moment.parseZone(value);
  return date.isValid() ? date.format("YYYY-MM-DD") : "";
};

const toBoolean = (value) => value === true || value === "true";
const toFormNumberString = (value) =>
  value === undefined || value === null ? "" : String(value);

const fromProductResponse = (item = {}) => ({
  ...EMPTY_PURCHASE_CREDIT_PRODUCT,
  product: entityId(item.product ?? item.productId),
  stock: toFormNumberString(item.stock),
});

const fromPaymentResponse = (payment = {}) => {
  const paymentStatus =
    payment.payment_status ??
    payment.paymentStatus ??
    PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS;
  const receivedPaymentDate = toFormDate(
    payment.received_payment_date ??
      payment.receivedPaymentDate ??
      payment.settlementDate,
  );
  const notes = payment.notes ?? "";

  return {
    ...EMPTY_PURCHASE_CREDIT_PAYMENT,
    id: payment._id ?? payment.id ?? null,
    paymentStatus,
    savedPaymentStatus: paymentStatus,
    amount: toFormNumberString(payment.amount),
    paymentType: payment.payment_type ?? payment.paymentType ?? "",
    referenceId: payment.reference_id ?? payment.referenceId ?? "",
    paymentDate: toFormDate(payment.payment_date ?? payment.paymentDate),
    receivedPaymentDate,
    savedReceivedPaymentDate: receivedPaymentDate,
    notes,
    savedNotes: notes,
    paymentReceipts:
      payment.payment_receipts ??
      payment.paymentReceipts ??
      payment.receipts ??
      [],
  };
};

const fromPaymentPlanResponse = (plan = {}) => {
  const remindingDate = toFormDate(
    plan.reminding_date ?? plan.remindingDate,
  );
  const amount = toFormNumberString(plan.amount);
  const paymentType = plan.payment_type ?? plan.paymentType ?? "";
  const isPaymentCompleted = toBoolean(
    plan.is_payment_completed ?? plan.isPaymentCompleted ?? false,
  );
  const notes = plan.notes ?? "";

  return {
    ...EMPTY_PURCHASE_CREDIT_PAYMENT_PLAN,
    id: plan._id ?? plan.id ?? null,
    remindingDate,
    savedRemindingDate: remindingDate,
    amount,
    savedAmount: amount,
    paymentType,
    savedPaymentType: paymentType,
    isPaymentCompleted,
    savedIsPaymentCompleted: isPaymentCompleted,
    notes,
    savedNotes: notes,
  };
};

export function fromPurchaseCreditResponse(purchaseCredit = {}) {
  const products = _.map(purchaseCredit.products ?? [], fromProductResponse);
  const payments = _.map(purchaseCredit.payments ?? [], fromPaymentResponse);
  const paymentPlanning = _.map(
    purchaseCredit.payment_planning ?? purchaseCredit.paymentPlanning ?? [],
    fromPaymentPlanResponse,
  );

  return {
    id: purchaseCredit._id ?? purchaseCredit.id ?? null,
    supplier: entityId(purchaseCredit.supplier ?? purchaseCredit.supplierId),
    products: products.length
      ? products
      : [{ ...EMPTY_PURCHASE_CREDIT_PRODUCT }],
    purchaseCreditAt: toFormDate(
      purchaseCredit.credited_at ??
        purchaseCredit.creditedAt ??
        purchaseCredit.purchaseCreditAt ??
        purchaseCredit.purchaseAt,
    ),
    purchaseCreditAmount: toFormNumberString(
      purchaseCredit.credit_amount ??
        purchaseCredit.creditAmount ??
        purchaseCredit.purchaseCreditAmount ??
        purchaseCredit.purchaseAmount,
    ),
    expectedDeliveryDate: toFormDate(
      purchaseCredit.expected_delivery_date ??
        purchaseCredit.expectedDeliveryDate,
    ),
    acknowledgementId:
      purchaseCredit.acknowledgement_id ??
      purchaseCredit.acknowledgementId ??
      "",
    acknowledgementReceipts:
      purchaseCredit.acknowledgement_receipts ??
      purchaseCredit.acknowledgementReceipts ??
      [],
    payments: payments.length
      ? payments
      : [{ ...EMPTY_PURCHASE_CREDIT_PAYMENT }],
    paymentPlanning,
  };
}
