import _ from "lodash";

import { TABLE_DEFAULTS } from "@Enums";
import { PURCHASE_TABLE_DEFAULTS } from "@Tables/purchase/purchaseTable.defaults";

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

function fromLegacyPurchaseResponse(purchase = {}) {
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
    receivedProducts: [],
    receivedBy: fromPersonResponse(),
  };
}

function fromReceivedPurchaseResponse(purchase = {}) {
  const credit = purchase.supplier_credit ?? {};
  const supplier = credit.supplier ?? {};

  return {
    id: purchase._id ?? purchase.id ?? null,
    supplierName: supplier.company_name ?? "",
    supplierGstNumber: supplier.gst_number ?? "",
    acknowledgementId: credit.acknowledgement_id ?? "",
    receivedAt: purchase.received_at ?? null,
    receivedBy: fromPersonResponse(purchase.received_by ?? {}),
    createdBy: fromPersonResponse(purchase.created_by ?? {}),
    billReceipts: purchase.bill_receipts ?? [],
    receivedProducts: _.map(purchase.received_products ?? [], (item) => ({
      id: item._id ?? item.id ?? null,
      productCode: item.product?.product_code ?? "",
      productName: item.product?.name ?? "",
      stock: item.stock,
      unitPrice: item.unit_price,
      unitDiscount: item.unit_discount,
      unitGst: item.unit_gst,
      unitGstAmount: item.unit_gst_amount,
      finalPrice: item.final_price,
      notes: item.notes,
      qrCodes: item.qr_codes ?? [],
    })),
  };
}

function fromPurchaseSummaryResponse(summary = {}) {
  return {
    totalPurchases: Number(summary.total_purchases) || 0,
    totalUnitsReceived: Number(summary.total_units_received) || 0,
    totalReceivedValue: Number(summary.total_received_value) || 0,
  };
}

export function fromPurchaseListResponse(response = {}, requested = {}) {
  const pagination = response.pagination ?? {};
  const page = Number(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    Number(pagination.limit) ||
    requested.limit ||
    PURCHASE_TABLE_DEFAULTS.limit;
  const total = Number(pagination.total) || 0;

  return {
    items: _.map(response.purchases ?? [], (purchase) =>
      purchase.received_products
        ? fromReceivedPurchaseResponse(purchase)
        : fromLegacyPurchaseResponse(purchase),
    ),
    summary: fromPurchaseSummaryResponse(response.summary ?? {}),
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
