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
