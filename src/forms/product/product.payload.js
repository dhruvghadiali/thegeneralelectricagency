import _ from "lodash";

import { PRODUCT_TABLE_DEFAULTS, TABLE_DEFAULTS } from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toProductMutationPayload(values = {}) {
  const nullableNumber = (value) => {
    if (value === "" || value === null || value === undefined) return null;
    const number = _.toNumber(value);
    return Number.isFinite(number) ? number : null;
  };
  const discountAmountMin = nullableNumber(values.discountAmountMin);
  const discountAmountMax = nullableNumber(values.discountAmountMax);
  const discountPercentageMin = nullableNumber(values.discountPercentageMin);
  const discountPercentageMax = nullableNumber(values.discountPercentageMax);
  const payload = {
    product_code: _.trim(values.productCode ?? ""),
    name: _.trim(values.name ?? ""),
    category: values.category ?? "",
    agency: values.agency ?? "",
    purchase_price: nullableNumber(values.purchasePrice),
    sale_price: nullableNumber(values.salePrice),
    gst_percentage: nullableNumber(values.gstPercentage),
    discount_amount: {
      min: discountAmountMin,
      max: discountAmountMax,
    },
    discount_percentage: {
      min: discountPercentageMin,
      max: discountPercentageMax,
    },
  };

  const modelNumber = _.trim(values.modelNumber ?? "");
  const description = _.trim(values.description ?? "");

  if (modelNumber) payload.model_number = modelNumber;
  if (description) payload.description = description;

  return payload;
}

export function toProductListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = PRODUCT_TABLE_DEFAULTS.LIMIT,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({ columns, page, limit, search, sort, filters });
}

export function fromProductResponse(product = {}) {
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
    agency: product.agency ?? "",
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

export function fromProductSummaryResponse(summary = {}) {
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
