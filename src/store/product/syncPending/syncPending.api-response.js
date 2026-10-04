import _ from "lodash";
import moment from "moment";

import { TABLE_DEFAULTS } from "@Enums";
import { PRODUCT_LIST_DEFAULTS } from "@Redux/product/product.defaults";

const fromEmployeeResponse = (employee) => {
  if (!_.isObject(employee)) {
    return null;
  }

  return {
    id: _.get(employee, "_id", _.get(employee, "id", null)),
    employeeId:
      _.get(employee, "emp_id", _.get(employee, "employeeId", "")) ?? "",
    firstName:
      _.get(employee, "first_name", _.get(employee, "firstName", "")) ?? "",
    lastName:
      _.get(employee, "last_name", _.get(employee, "lastName", "")) ?? "",
    username: _.get(employee, "username", "") ?? "",
    name: _.compact([
      _.get(employee, "first_name", _.get(employee, "firstName", "")),
      _.get(employee, "last_name", _.get(employee, "lastName", "")),
    ]).join(" "),
  };
};

const fromDateResponse = (value) => {
  if (_.isNil(value) || value === "") {
    return null;
  }

  const date = moment(value);

  return date.isValid() ? date.toISOString() : null;
};

export function fromSyncPendingProductResponse(product = {}) {
  return {
    id: _.get(product, "_id", _.get(product, "id", null)),
    systemId: _.get(product, "system_id", _.get(product, "systemId", null)),
    productId:
      _.get(product, "product_id", _.get(product, "productId", "")) ?? "",
    productMasterId:
      _.get(
        product,
        "product_master_id",
        _.get(product, "productMasterId", ""),
      ) ?? "",
    productAlterId:
      _.get(
        product,
        "product_alter_id",
        _.get(product, "productAlterId", ""),
      ) ?? "",
    hsnCode: _.get(product, "hsn_code", _.get(product, "hsnCode", "")) ?? "",
    name: _.get(product, "name", "") ?? "",
    productCode:
      _.get(product, "product_code", _.get(product, "productCode", "")) ?? "",
    category: _.get(product, "category", "") ?? "",
    agency: _.get(product, "agency", "") ?? "",
    modelNumber:
      _.get(product, "model_number", _.get(product, "modelNumber", "")) ?? "",
    description: _.get(product, "description", "") ?? "",
    purchasePrice: _.get(
      product,
      "purchase_price",
      _.get(product, "purchasePrice", null),
    ),
    salePrice: _.get(product, "sale_price", _.get(product, "salePrice", null)),
    gstPercentage: _.get(
      product,
      "gst_percentage",
      _.get(product, "gstPercentage", null),
    ),
    discountAmount: _.get(
      product,
      "discount_amount",
      _.get(product, "discountAmount", null),
    ),
    discountPercentage: _.get(
      product,
      "discount_percentage",
      _.get(product, "discountPercentage", null),
    ),
    stockGroup:
      _.get(product, "stock_group", _.get(product, "stockGroup", "")) ?? "",
    baseUnit: _.get(product, "base_unit", _.get(product, "baseUnit", "")) ?? "",
    gstApplicable:
      _.get(product, "gst_applicable", _.get(product, "gstApplicable", "")) ??
      "",
    typeOfSupply:
      _.get(product, "type_of_supply", _.get(product, "typeOfSupply", "")) ??
      "",
    isSystemGenerated: Boolean(
      _.get(
        product,
        "is_system_generated",
        _.get(product, "isSystemGenerated", false),
      ),
    ),
    createdBy: fromEmployeeResponse(
      _.get(product, "created_by", _.get(product, "createdBy")),
    ),
    updatedBy: fromEmployeeResponse(
      _.get(product, "updated_by", _.get(product, "updatedBy")),
    ),
    isActive: _.isNil(_.get(product, "is_active", _.get(product, "isActive")))
      ? true
      : Boolean(_.get(product, "is_active", _.get(product, "isActive"))),
    createdAt: fromDateResponse(
      _.get(product, "created_at", _.get(product, "createdAt")),
    ),
    updatedAt: fromDateResponse(
      _.get(product, "updated_at", _.get(product, "updatedAt")),
    ),
  };
}

export function fromSyncPendingProductListResponse(
  response = {},
  requested = {},
) {
  const items = _.map(
    response.tally_products ?? response.products ?? response.items ?? [],
    fromSyncPendingProductResponse,
  );
  const pagination = response.pagination ?? {};
  const page =
    _.toNumber(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    _.toNumber(pagination.limit) ||
    requested.limit ||
    PRODUCT_LIST_DEFAULTS.limit;
  const total = _.toNumber(pagination.total) || items.length;

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages:
        _.toNumber(pagination.total_pages ?? pagination.totalPages) ||
        Math.ceil(total / limit) ||
        0,
    },
  };
}
