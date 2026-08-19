import _ from "lodash";

import { PRODUCT_TABLE_DEFAULTS, TABLE_DEFAULTS } from "@Enums";

const discountRangeValue = (value, boundary) => {
  if (value && typeof value === "object") return value[boundary] ?? "";
  return value ?? "";
};

export function toProductFormValues(product = {}) {
  return {
    ...product,
    agencyName: product.agencyName ?? "",
    purchasePrice: product.purchasePrice ?? "",
    salePrice: product.salePrice ?? "",
    gstPercentage: product.gstPercentage ?? "",
    discountAmountMin: discountRangeValue(product.discountAmount, "min"),
    discountAmountMax: discountRangeValue(product.discountAmount, "max"),
    discountPercentageMin: discountRangeValue(
      product.discountPercentage,
      "min",
    ),
    discountPercentageMax: discountRangeValue(
      product.discountPercentage,
      "max",
    ),
  };
}

function fromProductResponse(product = {}) {
  const agencySource = product.agency ?? product.company ?? "";
  const agency = _.isObject(agencySource)
    ? agencySource._id ?? agencySource.id ?? ""
    : agencySource;
  const agencyName =
    product.agency_name ??
    product.company_name ??
    (_.isObject(agencySource)
      ? agencySource.company_name ?? agencySource.name ?? ""
      : agencySource);
  const discountRange = (value) => {
    if (_.isObject(value)) {
      return {
        min: value.min ?? null,
        max: value.max ?? null,
      };
    }

    return {
      min: value ?? null,
      max: value ?? null,
    };
  };
  const discountAmount =
    product.discount_amount ?? product.discountAmount ?? null;
  const discountPercentage =
    product.discount_percentage ?? product.discountPercentage ?? null;

  return {
    id: product._id ?? product.id ?? null,
    productCode: product.product_code ?? product.productCode ?? "",
    name: product.name ?? "",
    category: product.category ?? "",
    agency,
    agencyName,
    modelNumber: product.model_number ?? product.modelNumber ?? "",
    description: product.description ?? "",
    purchasePrice: product.purchase_price ?? product.purchasePrice ?? null,
    salePrice: product.sale_price ?? product.salePrice ?? null,
    gstPercentage: product.gst_percentage ?? product.gstPercentage ?? null,
    discountAmount: discountRange(discountAmount),
    discountPercentage: discountRange(discountPercentage),
    isActive: _.isNil(product.is_active ?? product.isActive)
      ? true
      : Boolean(product.is_active ?? product.isActive),
    createdAt: product.created_at ?? product.createdAt ?? null,
    updatedAt: product.updated_at ?? product.updatedAt ?? null,
  };
}

function fromProductSummaryResponse(summary = {}) {
  return {
    totalProducts: _.toNumber(summary.total_products) || 0,
    activeProducts: _.toNumber(summary.active_products) || 0,
    inactiveProducts: _.toNumber(summary.inactive_products) || 0,
  };
}

export function fromProductListResponse(response = {}, requested = {}) {
  const pagination = response.pagination ?? {};
  const page = Number(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    Number(pagination.limit) || requested.limit || PRODUCT_TABLE_DEFAULTS.LIMIT;
  const total = Number(pagination.total) || 0;
  const products = response.products ?? response.items ?? [];

  return {
    items: _.map(products, fromProductResponse),
    summary: fromProductSummaryResponse(response.summary ?? response),
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
