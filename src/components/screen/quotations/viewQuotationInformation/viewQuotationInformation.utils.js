import { QUOTATION_TAX_TREATMENT_OPTIONS } from "@Enums";
import { fromQuotationResponse } from "@Redux/quotation/quotation.api-response";
import {
  calculateQuotationBillTotals,
  quotationCurrencyFormatter,
} from "@screenComponent/quotations/form/quotationSummary/quotationSummary.utils";

export function displayValue(value) {
  return value === null || value === undefined || value === "" ? "—" : value;
}

export function formatQuotationDate(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function getTaxTreatmentLabel(value) {
  return (
    QUOTATION_TAX_TREATMENT_OPTIONS.find((option) => option.value === value)
      ?.label ?? displayValue(value)
  );
}

export function getQuotationTotals(quotation) {
  return calculateQuotationBillTotals(
    quotation?.productInformation ?? [],
    quotation?.taxTreatment,
    quotation?.gstPercentage,
    quotation?.roundOff,
  );
}

export function formatMoney(value) {
  return quotationCurrencyFormatter.format(Number(value) || 0);
}

export function formatPercentage(value) {
  const percentage = Number(value);

  return `${Number.isFinite(percentage) ? percentage.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  }) : 0}%`;
}

function isHistoryProductRow(entry = {}) {
  return (
    !Array.isArray(entry.products) &&
    !Array.isArray(entry.productInformation) &&
    ("qty" in entry || "unit_price" in entry || "final_price" in entry) &&
    Boolean(entry.product || entry.tally_product)
  );
}

function historyProductSnapshot(entry) {
  return {
    quotation_version: entry.quotation_version ?? entry.quotationVersion,
    delivery_notes: entry.delivery_notes ?? entry.deliveryNotes,
    payment_notes: entry.payment_notes ?? entry.paymentNotes,
    tax_type: entry.tax_type ?? entry.taxType,
    gst: entry.gst ?? entry.gstPercentage,
    round_off: entry.round_off ?? entry.roundOff,
    notes: entry.notes,
    created_at: entry.created_at ?? entry.createdAt,
    created_by: entry.created_by ?? entry.createdBy,
    updated_at: entry.updated_at ?? entry.updatedAt,
    updated_by: entry.updated_by ?? entry.updatedBy,
    products: [entry],
  };
}

export function normalizeHistoryEntry(entry = {}, index = 0) {
  const source = isHistoryProductRow(entry)
    ? historyProductSnapshot(entry)
    : entry;
  const snapshot =
    entry.companyInformation && Array.isArray(entry.productInformation)
      ? entry
      : fromQuotationResponse(source);
  const quotationNumber = snapshot.quotationNumber ?? "";
  const quotationVersion =
    snapshot.quotationVersion ??
    String(quotationNumber)
      .match(/\/R(\d+)\//i)?.[1]
      ?.replace(/^/, "V") ??
    `V${index + 1}`;

  return {
    ...snapshot,
    quotationNumber:
      quotationNumber ||
      (snapshot.productInformation?.length > 1
        ? `${snapshot.productInformation.length} products`
        : snapshot.productInformation?.[0]?.product) ||
      `Quotation version ${quotationVersion}`,
    quotationVersion,
    historyIndex: index,
    id: [
      snapshot.id ?? entry._id ?? entry.id ?? quotationNumber ?? "revision",
      snapshot.quotationVersion ?? entry.quotation_version ?? index,
      index,
    ].join("-"),
    changedAt:
      snapshot.updatedAt ??
      snapshot.createdAt ??
      entry.updated_at ??
      entry.created_at,
    changedBy: snapshot.updatedBy?.name || snapshot.createdBy?.name || "—",
  };
}

function comparableValue(value) {
  return String(value ?? "").trim();
}

export function getProductChangeKey(product, index) {
  return String(
    product.productId ?? product.product ?? product.lineId ?? index,
  );
}

function comparableProduct(product) {
  return {
    product: comparableValue(product.product),
    quantity: comparableValue(product.quantity),
    sellingPrice: comparableValue(product.sellingPrice),
    discount: comparableValue(product.discount),
    description: comparableValue(product.description),
    productDeliveryNotes: comparableValue(product.productDeliveryNotes),
    hsnCode: comparableValue(product.hsnCode),
    productCode: comparableValue(product.productCode),
    category: comparableValue(product.category),
    agency: comparableValue(product.agency),
    modelNumber: comparableValue(product.modelNumber),
  };
}

const PRODUCT_FIELD_LABELS = Object.freeze({
  product: "Product",
  quantity: "Quantity",
  sellingPrice: "Unit price",
  discount: "Discount",
  description: "Description",
  productDeliveryNotes: "Delivery notes",
  hsnCode: "HSN code",
  productCode: "Product code",
  category: "Category",
  agency: "Agency",
  modelNumber: "Model number",
});

export function getQuotationChanges(current, previous) {
  if (!previous) {
    return {
      fields: new Set(),
      labels: ["Initial version"],
      productChanges: new Map(),
      removedProducts: [],
    };
  }

  const fields = new Set();
  const labels = [];
  const compareField = (key, currentValue, previousValue, label) => {
    if (comparableValue(currentValue) !== comparableValue(previousValue)) {
      fields.add(key);
      labels.push(label);
    }
  };

  compareField(
    "companyName",
    current.companyInformation?.companyName,
    previous.companyInformation?.companyName,
    "Company name",
  );
  compareField(
    "address",
    current.companyInformation?.address,
    previous.companyInformation?.address,
    "Address",
  );
  compareField(
    "email",
    current.companyInformation?.email,
    previous.companyInformation?.email,
    "Email",
  );
  compareField(
    "phoneNumber",
    current.companyInformation?.phoneNumber,
    previous.companyInformation?.phoneNumber,
    "Phone",
  );
  compareField(
    "gstNumber",
    current.companyInformation?.gstNumber,
    previous.companyInformation?.gstNumber,
    "GST number",
  );
  compareField(
    "taxTreatment",
    current.taxTreatment,
    previous.taxTreatment,
    "Tax treatment",
  );
  compareField(
    "gstPercentage",
    current.gstPercentage,
    previous.gstPercentage,
    "GST rate",
  );
  compareField(
    "deliveryNotes",
    current.deliveryNotes,
    previous.deliveryNotes,
    "Delivery notes",
  );
  compareField(
    "paymentNotes",
    current.paymentNotes,
    previous.paymentNotes,
    "Payment notes",
  );
  compareField(
    "roundOff",
    current.roundOff,
    previous.roundOff,
    "Round off total",
  );
  compareField("notes", current.notes, previous.notes, "Notes");

  const currentProducts = current.productInformation ?? [];
  const previousProducts = previous.productInformation ?? [];
  const previousByKey = new Map(
    previousProducts.map((product, index) => [
      getProductChangeKey(product, index),
      product,
    ]),
  );
  const currentKeys = new Set();
  const productChanges = new Map();

  currentProducts.forEach((product, index) => {
    const key = getProductChangeKey(product, index);
    const previousProduct = previousByKey.get(key);
    currentKeys.add(key);

    if (!previousProduct) {
      productChanges.set(key, { type: "Added", fields: [] });
      return;
    }

    const currentProduct = comparableProduct(product);
    const priorProduct = comparableProduct(previousProduct);
    const changedProductFields = Object.keys(PRODUCT_FIELD_LABELS)
      .filter((field) => currentProduct[field] !== priorProduct[field])
      .map((field) => PRODUCT_FIELD_LABELS[field]);

    if (changedProductFields.length) {
      productChanges.set(key, {
        type: "Updated",
        fields: changedProductFields,
      });
    }
  });

  const removedProducts = previousProducts.filter(
    (product, index) => !currentKeys.has(getProductChangeKey(product, index)),
  );

  if (productChanges.size || removedProducts.length) {
    fields.add("products");
    labels.push("Products");
  }

  return { fields, labels, productChanges, removedProducts };
}

function versionNumber(entry, fallback) {
  return (
    Number(String(entry.quotationVersion ?? "").match(/\d+/)?.[0]) || fallback
  );
}

export function buildQuotationHistory(history = []) {
  const createdAtGroups = new Map();
  const groupedHistory = [];

  history.forEach((entry, index) => {
    if (!isHistoryProductRow(entry)) {
      groupedHistory.push(entry);
      return;
    }

    const createdAt = entry.created_at ?? entry.createdAt;
    const groupKey = createdAt || `history-row-${index}`;
    const existingGroup = createdAtGroups.get(groupKey);

    if (existingGroup) {
      existingGroup.products.push(entry);
      return;
    }

    const group = {
      ...historyProductSnapshot(entry),
      _id: `history-${groupKey}`,
    };
    createdAtGroups.set(groupKey, group);
    groupedHistory.push(group);
  });

  const ascending = groupedHistory
    .map(normalizeHistoryEntry)
    .sort((left, right) => {
      const leftTime = new Date(left.changedAt ?? 0).getTime();
      const rightTime = new Date(right.changedAt ?? 0).getTime();

      if (leftTime !== rightTime) return leftTime - rightTime;

      return versionNumber(left, 0) - versionNumber(right, 0);
    });

  return ascending
    .map((entry, index) => {
      const changes = getQuotationChanges(entry, ascending[index - 1]);

      if (entry.historyIndex !== 0) {
        changes.labels = changes.labels.filter(
          (label) => label !== "Initial version",
        );
      }

      return {
        ...entry,
        changes,
      };
    })
    .reverse();
}
