import { omitEmptyPayloadFields } from "@/utils/apiPayload.util";

export function toSystemProductCreatePayload(product) {
  return omitEmptyPayloadFields({
    name: product.name,
    product_id: product.guid,
    product_master_id: product.masterId,
    product_alter_id: product.alterId,
    hsn_code: product.hsnCode,
    description: product.description,
    stock_group: product.group,
    gst_applicable: product.gstApplicable,
    type_of_supply: product.supplyType,
    base_unit: product.units,
  });
}
