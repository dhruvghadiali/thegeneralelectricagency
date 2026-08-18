import _ from "lodash";
import moment from "moment";

import { TABLE_DEFAULTS } from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";

const toIsoDateTime = (value) => {
  if (!value) return undefined;
  const date = value instanceof Date
    ? moment(value)
    : moment(value, "YYYY-MM-DD", true);
  return date.isValid() ? date.startOf("day").format() : undefined;
};

const optionalText = (value) => _.trim(value ?? "") || undefined;

const toPaymentPayload = (payment = {}) =>
  _.omitBy(
    {
      payment_status: payment.paymentStatus,
      payment_amount: _.toNumber(payment.paymentAmount),
      payment_date: toIsoDateTime(payment.paymentDate),
      expected_payment_date: toIsoDateTime(payment.expectedPaymentDate),
      payment_mode: optionalText(payment.paymentMode),
    },
    _.isUndefined,
  );

export function toPurchaseCreatePayload(values = {}) {
  return {
    product: values.product,
    supplier: values.supplier,
    purchase_date: toIsoDateTime(values.purchaseDate),
    expected_delivery_date: toIsoDateTime(values.expectedDeliveryDate),
    quantity_purchased: _.toNumber(values.quantityPurchased),
    bill_amount: _.toNumber(values.billAmount),
    actual_paid_amount: _.toNumber(values.actualPaidAmount),
    gst_amount: _.toNumber(values.gstAmount),
    gst_percentage: _.toNumber(values.gstPercentage),
    purchase_order_pdf: _.trim(values.purchaseOrderPdf ?? ""),
    payments: _.map(values.payments ?? [], toPaymentPayload),
  };
}

export function toPurchaseListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = TABLE_DEFAULTS.LIMIT,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({ columns, page, limit, search, sort, filters });
}

const fromPersonResponse = (person = {}) => ({
  id: person._id ?? person.id ?? null,
  employeeId: person.emp_id ?? person.employeeId ?? "",
  username: person.username ?? "",
  name: [person.first_name, person.last_name].filter(Boolean).join(" "),
});

const fromPaymentResponse = (payment = {}) => ({
  id: payment._id ?? payment.id ?? null,
  paymentStatus: payment.payment_status ?? payment.paymentStatus ?? "pending",
  paymentAmount: payment.payment_amount ?? payment.paymentAmount ?? null,
  paymentDate: payment.payment_date ?? payment.paymentDate ?? null,
  expectedPaymentDate:
    payment.expected_payment_date ?? payment.expectedPaymentDate ?? null,
  paymentMode: payment.payment_mode ?? payment.paymentMode ?? "",
  paymentReferenceNumber:
    payment.payment_reference_number ?? payment.paymentReferenceNumber ?? "",
});

export function fromPurchaseResponse(purchase = {}) {
  const product = purchase.product ?? {};
  const supplier = purchase.supplier ?? {};
  const payments = _.map(purchase.payments ?? [], fromPaymentResponse);
  const latestPayment = payments.at(-1);

  return {
    id: purchase._id ?? purchase.id ?? null,
    productId: product._id ?? product.id ?? product ?? null,
    productCode: product.product_code ?? product.productCode ?? "",
    productName: product.name ?? "",
    supplierId: supplier._id ?? supplier.id ?? supplier ?? null,
    supplierName: supplier.company_name ?? supplier.name ?? "",
    supplierType: supplier.company_type ?? supplier.type ?? "",
    supplierGstNumber: supplier.gst_number ?? supplier.gstNumber ?? "",
    purchaseDate: purchase.purchase_date ?? purchase.purchaseDate ?? null,
    expectedDeliveryDate:
      purchase.expected_delivery_date ?? purchase.expectedDeliveryDate ?? null,
    actualDeliveryDate:
      purchase.actual_delivery_date ?? purchase.actualDeliveryDate ?? null,
    quantityPurchased:
      purchase.quantity_purchased ?? purchase.quantityPurchased ?? null,
    billAmount: purchase.bill_amount ?? purchase.billAmount ?? null,
    actualPaidAmount:
      purchase.actual_paid_amount ?? purchase.actualPaidAmount ?? null,
    gstAmount: purchase.gst_amount ?? purchase.gstAmount ?? null,
    gstPercentage: purchase.gst_percentage ?? purchase.gstPercentage ?? null,
    payments,
    paymentStatus: latestPayment?.paymentStatus ?? "pending",
    stocks: purchase.stocks ?? [],
    purchaseOrderPdf:
      purchase.purchase_order_pdf ?? purchase.purchaseOrderPdf ?? "",
    createdBy: fromPersonResponse(purchase.created_by ?? purchase.createdBy),
    updatedBy: fromPersonResponse(purchase.updated_by ?? purchase.updatedBy),
    isActive: purchase.is_active !== false,
    createdAt: purchase.created_at ?? purchase.createdAt ?? null,
    updatedAt: purchase.updated_at ?? purchase.updatedAt ?? null,
  };
}

export function fromPurchaseListResponse(response = {}, requested = {}) {
  const pagination = response.pagination ?? {};
  const page = Number(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    Number(pagination.limit) || requested.limit || TABLE_DEFAULTS.LIMIT;
  const total = Number(pagination.total) || 0;
  const summary = response.summary ?? {};

  return {
    items: _.map(response.purchases ?? [], fromPurchaseResponse),
    summary: {
      totalPurchases: Number(summary.total_purchases) || 0,
      pendingDeliveries: Number(summary.pending_deliveries) || 0,
      totalBillAmount: Number(summary.total_bill_amount) || 0,
      totalPaidAmount: Number(summary.total_paid_amount) || 0,
      outstandingAmount: Number(summary.outstanding_amount) || 0,
    },
    pagination: {
      page,
      limit,
      total,
      totalPages:
        Number(pagination.total_pages ?? pagination.totalPages) ||
        Math.ceil(total / limit) ||
        0,
    },
  };
}
