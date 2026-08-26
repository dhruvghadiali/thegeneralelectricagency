import _ from "lodash";

import {
  PURCHASE_CREDIT_PAYMENT_STATUSES,
  TABLE_DEFAULTS,
} from "@Enums";
import { PURCHASE_CREDIT_TABLE_DEFAULTS } from "@Tables/purchaseCredit/purchaseCreditTable.defaults";

const entityId = (value) =>
  _.isObject(value) ? value._id ?? value.id ?? "" : value ?? "";

const toBoolean = (value) => value === true || value === "true";

const fromPersonResponse = (person = {}) => ({
  id: person._id ?? person.id ?? null,
  employeeId: person.emp_id ?? person.employeeId ?? "",
  username: person.username ?? "",
  name: [person.first_name, person.last_name].filter(Boolean).join(" "),
});

const fromProductResponse = (item = {}) => {
  const product = item.product ?? {};

  return {
    id: item._id ?? item.id ?? null,
    productId: entityId(product),
    productCode: product.product_code ?? product.productCode ?? "",
    name: product.name ?? "",
    category: product.category ?? "",
    stock: _.toNumber(item.stock) || 0,
    agency: product.agency ?? null,
  };
};

const fromPaymentResponse = (payment = {}) => ({
  id: payment._id ?? payment.id ?? null,
  paymentStatus:
    payment.payment_status ??
    payment.paymentStatus ??
    PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS,
  amount: _.toNumber(payment.amount) || 0,
  paymentType: payment.payment_type ?? payment.paymentType ?? "",
  referenceId: payment.reference_id ?? payment.referenceId ?? "",
  paymentDate: payment.payment_date ?? payment.paymentDate ?? null,
  settlementDate:
    payment.received_payment_date ?? payment.receivedPaymentDate ?? null,
  notes: payment.notes ?? "",
  receipts: payment.payment_receipts ?? payment.paymentReceipts ?? [],
});

const fromPaymentPlanResponse = (plan = {}) => ({
  id: plan._id ?? plan.id ?? null,
  remindingDate: plan.reminding_date ?? plan.remindingDate ?? null,
  amount: _.toNumber(plan.amount) || 0,
  paymentType: plan.payment_type ?? plan.paymentType ?? "",
  isPaymentCompleted: toBoolean(
    plan.is_payment_completed ?? plan.isPaymentCompleted ?? false,
  ),
  notes: plan.notes ?? "",
});

function fromPurchaseCreditResponse(purchaseCredit = {}) {
  const supplier = purchaseCredit.supplier ?? {};
  const products = _.map(purchaseCredit.products ?? [], fromProductResponse);
  const payments = _.map(purchaseCredit.payments ?? [], fromPaymentResponse);
  const paymentPlanning = _.map(
    purchaseCredit.payment_planning ?? purchaseCredit.paymentPlanning ?? [],
    fromPaymentPlanResponse,
  );
  const paymentAmount = _.sumBy(payments, "amount");
  const plannedAmount = _.sumBy(paymentPlanning, "amount");
  const purchaseAmount =
    _.toNumber(purchaseCredit.credit_amount ?? purchaseCredit.creditAmount) || 0;
  const latestPayment = payments.at(-1);

  return {
    id: purchaseCredit._id ?? purchaseCredit.id ?? null,
    supplierId: entityId(supplier),
    supplierName: supplier.company_name ?? supplier.companyName ?? "",
    supplierType: supplier.company_type ?? supplier.companyType ?? "",
    supplierGstNumber: supplier.gst_number ?? supplier.gstNumber ?? "",
    products,
    productNames: _.map(products, "name").filter(Boolean).join(", "),
    totalStock: _.sumBy(products, "stock"),
    purchaseAt:
      purchaseCredit.credited_at ?? purchaseCredit.creditedAt ?? null,
    purchaseAmount,
    expectedDeliveryDate:
      purchaseCredit.expected_delivery_date ??
      purchaseCredit.expectedDeliveryDate ??
      null,
    acknowledgementId:
      purchaseCredit.acknowledgement_id ??
      purchaseCredit.acknowledgementId ??
      "",
    acknowledgementReceipts:
      purchaseCredit.acknowledgement_receipts ??
      purchaseCredit.acknowledgementReceipts ??
      [],
    payments,
    paymentPlanning,
    paymentAmount,
    plannedAmount,
    availableAmount: Math.max(
      purchaseAmount - paymentAmount - plannedAmount,
      0,
    ),
    paymentStatus:
      latestPayment?.paymentStatus ??
      PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS,
    isDeleted: purchaseCredit.is_deleted === true,
    createdBy: fromPersonResponse(
      purchaseCredit.created_by ?? purchaseCredit.createdBy,
    ),
    createdAt: purchaseCredit.created_at ?? purchaseCredit.createdAt ?? null,
    updatedAt: purchaseCredit.updated_at ?? purchaseCredit.updatedAt ?? null,
  };
}

function fromPaginationResponse(pagination = {}, requested = {}) {
  const page =
    _.toNumber(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    _.toNumber(pagination.limit) ||
    requested.limit ||
    PURCHASE_CREDIT_TABLE_DEFAULTS.limit;
  const total = _.toNumber(pagination.total) || 0;

  return {
    page,
    limit,
    total,
    totalPages:
      _.toNumber(pagination.total_pages ?? pagination.totalPages) ||
      Math.ceil(total / limit) ||
      0,
  };
}

export function fromPurchaseCreditListResponse(response = {}, requested = {}) {
  return {
    items: _.map(
      response.supplier_credits ?? response.supplierCredits ?? [],
      fromPurchaseCreditResponse,
    ),
    pagination: fromPaginationResponse(response.pagination, requested),
  };
}
