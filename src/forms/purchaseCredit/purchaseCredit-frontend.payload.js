import _ from "lodash";
import moment from "moment";

import { PURCHASE_CREDIT_PAYMENT_STATUSES } from "@Enums";
import {
  EMPTY_PURCHASE_CREDIT_PAYMENT,
  EMPTY_PURCHASE_CREDIT_PAYMENT_PLAN,
  EMPTY_PURCHASE_CREDIT_PRODUCT,
} from "@Forms/purchaseCredit/purchaseCredit.initialValues";

const entityId = (value) =>
  _.isObject(value) ? value._id ?? value.id ?? "" : value ?? "";

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
  product: entityId(item.product),
  stock: toFormNumberString(item.stock),
});

const fromPaymentResponse = (payment = {}) => ({
  ...EMPTY_PURCHASE_CREDIT_PAYMENT,
  paymentStatus:
    payment.payment_status ??
    payment.paymentStatus ??
    PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS,
  amount: toFormNumberString(payment.amount),
  paymentType: payment.payment_type ?? payment.paymentType ?? "",
  referenceId: payment.reference_id ?? payment.referenceId ?? "",
  paymentDate: toFormDate(payment.payment_date ?? payment.paymentDate),
  receivedPaymentDate: toFormDate(
    payment.received_payment_date ?? payment.receivedPaymentDate,
  ),
  notes: payment.notes ?? "",
  paymentReceipts:
    payment.payment_receipts ?? payment.paymentReceipts ?? [],
});

const fromPaymentPlanResponse = (plan = {}) => ({
  ...EMPTY_PURCHASE_CREDIT_PAYMENT_PLAN,
  remindingDate: toFormDate(plan.reminding_date ?? plan.remindingDate),
  amount: toFormNumberString(plan.amount),
  paymentType: plan.payment_type ?? plan.paymentType ?? "",
  isPaymentCompleted: toBoolean(
    plan.is_payment_completed ?? plan.isPaymentCompleted ?? false,
  ),
  notes: plan.notes ?? "",
});

export function fromPurchaseCreditResponse(purchaseCredit = {}) {
  const products = _.map(purchaseCredit.products ?? [], fromProductResponse);
  const payments = _.map(purchaseCredit.payments ?? [], fromPaymentResponse);
  const paymentPlanning = _.map(
    purchaseCredit.payment_planning ?? purchaseCredit.paymentPlanning ?? [],
    fromPaymentPlanResponse,
  );

  return {
    id: purchaseCredit._id ?? purchaseCredit.id ?? null,
    supplier: entityId(purchaseCredit.supplier),
    products: products.length ? products : [{ ...EMPTY_PURCHASE_CREDIT_PRODUCT }],
    purchaseCreditAt: toFormDate(
      purchaseCredit.credited_at ??
        purchaseCredit.creditedAt ??
        purchaseCredit.purchaseCreditAt,
    ),
    purchaseCreditAmount: toFormNumberString(
      purchaseCredit.credit_amount ??
        purchaseCredit.creditAmount ??
        purchaseCredit.purchaseCreditAmount,
    ),
    expectedDeliveryDate: toFormDate(
      purchaseCredit.expected_delivery_date ?? purchaseCredit.expectedDeliveryDate,
    ),
    acknowledgementId:
      purchaseCredit.acknowledgement_id ?? purchaseCredit.acknowledgementId ?? "",
    acknowledgementReceipts:
      purchaseCredit.acknowledgement_receipts ??
      purchaseCredit.acknowledgementReceipts ??
      [],
    payments: payments.length ? payments : [{ ...EMPTY_PURCHASE_CREDIT_PAYMENT }],
    paymentPlanning,
  };
}
