import _ from "lodash";

import { fromProductDiscountRangeApiResponse } from "@utils/apiResponse/product/productDiscountRange.api-response";
import { fromProductReservedStockApiResponse } from "@utils/apiResponse/product/productReservedStock.api-response";

export function fromProductApiResponse(product = {}) {
  const agencySource = product.agency ?? product.company ?? "";
  const agency = _.isObject(agencySource)
    ? (agencySource._id ?? agencySource.id ?? "")
    : agencySource;
  const agencyName =
    product.agency_name ??
    product.company_name ??
    (_.isObject(agencySource)
      ? (agencySource.company_name ?? agencySource.name ?? "")
      : agencySource);

  return {
    id: product._id ?? product.id ?? null,
    systemId: product.system_id ?? product.systemId,
    productCode: product.product_code ?? product.productCode ?? "",
    hsnCode: product.hsn_code ?? product.hsnCode ?? "",
    name: product.name ?? "",
    category: product.category ?? "",
    agency,
    agencyName,
    modelNumber: product.model_number ?? product.modelNumber ?? "",
    description: product.description ?? "",
    purchasePrice: product.purchase_price ?? product.purchasePrice ?? null,
    salePrice: product.sale_price ?? product.salePrice ?? null,
    gstPercentage: product.gst_percentage ?? product.gstPercentage ?? null,
    discountAmount: fromProductDiscountRangeApiResponse(
      product.discount_amount ?? product.discountAmount ?? null,
    ),
    discountPercentage: fromProductDiscountRangeApiResponse(
      product.discount_percentage ?? product.discountPercentage ?? null,
    ),
    stocks: _.toNumber(product.stocks) || 0,
    reservedStock: _.map(
      product.reserved_stock ?? product.reservedStock ?? [],
      fromProductReservedStockApiResponse,
    ),
    isMigrateToTally: Boolean(
      product.is_migrate_to_tally ?? product.isMigrateToTally,
    ),
    isActive: _.isNil(product.is_active ?? product.isActive)
      ? true
      : Boolean(product.is_active ?? product.isActive),
    createdAt: product.created_at ?? product.createdAt ?? null,
    updatedAt: product.updated_at ?? product.updatedAt ?? null,
  };
}

export default fromProductApiResponse;
