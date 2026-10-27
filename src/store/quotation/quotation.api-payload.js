import _ from "lodash";

function numberOrZero(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function nullableText(value) {
  const normalizedValue = _.trim(value ?? "");

  return normalizedValue || null;
}

function normalizedQuotationVersion(value, quotationReference = "") {
  const versionMatch = String(value ?? "").match(/^V(\d+)$/i);

  if (versionMatch) return `V${Number(versionMatch[1])}`;

  const referenceMatch = String(quotationReference).match(/\/R(\d+)\//i);

  return `V${Number(referenceMatch?.[1]) || 1}`;
}

export function toQuotationProductPayload(
  product = {},
  quotationVersion = "V1",
  productReferenceField,
) {
  const unitPrice = Math.max(numberOrZero(product.sellingPrice), 0);
  const discountAmount = Math.min(
    Math.max(numberOrZero(product.discount), 0),
    unitPrice,
  );
  const referenceField =
    productReferenceField ??
    (product.productSource === "tallyProduct"
      ? "tally_product"
      : "product");
  const productReference =
    referenceField === "tally_product"
      ? { tally_product: product.productId ?? "" }
      : { product: product.productId ?? "" };

  return {
    ...productReference,
    quotation_version: normalizedQuotationVersion(quotationVersion),
    description: nullableText(product.description),
    product_delivery_notes: nullableText(product.productDeliveryNotes),
    qty: Math.max(numberOrZero(product.quantity), 0),
    unit_price: unitPrice,
    discount: discountAmount,
    final_price: unitPrice - discountAmount,
  };
}

export function toQuotationDetailsCreatePayload({
  quotationRefId,
  selectedCompany,
  companyInformation = {},
  taxTreatment,
  gstPercentage,
  deliveryNotes,
  paymentNotes,
  roundOff = false,
  productInformation = [],
}) {
  return {
    quotation_ref_id: quotationRefId,
    company: nullableText(selectedCompany?.id),
    company_name: companyInformation.companyName?.trim() ?? "",
    company_address: companyInformation.address?.trim() ?? "",
    company_email: nullableText(companyInformation.email),
    company_phone_number: nullableText(companyInformation.phoneNumber),
    company_gst_number: nullableText(companyInformation.gstNumber),
    tax_type: taxTreatment,
    gst: String(gstPercentage ?? ""),
    delivery_notes: nullableText(deliveryNotes),
    payment_notes: nullableText(paymentNotes),
    round_off: Boolean(roundOff),
    products: productInformation.map((product) =>
      toQuotationProductPayload(product, "V1"),
    ),
  };
}

export function toQuotationDetailsUpdatePayload({
  quotationRefId,
  quotationVersion,
  selectedCompany,
  companyInformation = {},
  taxTreatment,
  gstPercentage,
  deliveryNotes,
  paymentNotes,
  roundOff = false,
  productInformation = [],
}) {
  const resolvedQuotationVersion = normalizedQuotationVersion(
    quotationVersion,
    quotationRefId,
  );

  return {
    quotation_ref_id: quotationRefId,
    company: nullableText(selectedCompany?.id),
    company_name: companyInformation.companyName?.trim() ?? "",
    company_address: companyInformation.address?.trim() ?? "",
    company_email: nullableText(companyInformation.email),
    company_phone_number: nullableText(companyInformation.phoneNumber),
    company_gst_number: nullableText(companyInformation.gstNumber),
    tax_type: taxTreatment,
    gst: String(gstPercentage ?? ""),
    delivery_notes: nullableText(deliveryNotes),
    payment_notes: nullableText(paymentNotes),
    round_off: Boolean(roundOff),
    products: productInformation.map((product) =>
      toQuotationProductPayload(product, resolvedQuotationVersion, "product"),
    ),
  };
}
