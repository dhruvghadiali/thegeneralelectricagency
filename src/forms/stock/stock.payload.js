import _ from "lodash";

import { STOCK_TABLE_DEFAULTS, TABLE_DEFAULTS } from "@Enums";

function fromStockLocationResponse(location = {}) {
  return {
    id: location._id ?? location.id ?? null,
    warehouseName: location.warehouse_name ?? location.warehouseName ?? "",
    rackNumber: location.rack_number ?? location.rackNumber ?? "",
    quantity: Number(location.quantity) || 0,
  };
}

export function fromStockResponse(stock = {}) {
  const locations = _.map(
    stock.warehouse_locations ?? stock.locations ?? [],
    fromStockLocationResponse,
  );
  const availableQuantity = Number(
    stock.available_quantity ?? stock.availableQuantity,
  ) || 0;
  const unitPrice = Number(stock.unit_price ?? stock.unitPrice) || 0;

  return {
    id: stock._id ?? stock.id ?? null,
    productName: stock.product_name ?? stock.productName ?? "",
    sku: stock.sku ?? "",
    brand: stock.brand ?? "",
    category: stock.category ?? "",
    model: stock.model ?? "",
    unit: stock.unit ?? "unit",
    availableQuantity,
    reservedQuantity: Number(stock.reserved_quantity ?? stock.reservedQuantity) || 0,
    damagedQuantity: Number(stock.damaged_quantity ?? stock.damagedQuantity) || 0,
    reorderLevel: Number(stock.reorder_level ?? stock.reorderLevel) || 0,
    unitPrice,
    stockValue: availableQuantity * unitPrice,
    locations,
    locationCount: locations.length,
    specifications: stock.specifications ?? {},
  };
}

export function fromStockListResponse(response = {}, requested = {}) {
  const pagination = response.pagination ?? {};
  const page = Number(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    Number(pagination.limit) || requested.limit || STOCK_TABLE_DEFAULTS.LIMIT;
  const total = Number(pagination.total) || 0;

  return {
    items: _.map(response.stocks ?? [], fromStockResponse),
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
