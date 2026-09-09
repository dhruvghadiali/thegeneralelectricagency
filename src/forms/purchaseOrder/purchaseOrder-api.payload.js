import _ from "lodash";
import moment from "moment";

const toReceivedProductPayload = (item = {}) => ({
  product: item.product,
  stock: _.toNumber(item.quantityPurchased),
  unit_price: _.toNumber(item.unitPrice),
  unit_discount: _.toNumber(item.unitDiscount),
  unit_gst: _.toNumber(item.unitGst),
  unit_gst_amount: _.toNumber(item.unitGstAmount),
  final_price: _.toNumber(item.finalPrice),
  notes: _.trim(item.notes ?? "") || null,
});

export function toPurchaseCreatePayload(values = {}) {
  const receivedAt = moment().format("DD-MM-YYYY");

  return _.map(values.products ?? [], (product) => ({
    received_products: toReceivedProductPayload(product),
    received_at: receivedAt,
    received_by: values.receivedOrCollectedBy,
  }));
}
