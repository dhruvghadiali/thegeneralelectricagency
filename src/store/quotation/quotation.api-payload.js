import _ from "lodash";

function numberOrZero(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function nullableText(value) {
  const normalizedValue = _.trim(value ?? "");

  return normalizedValue || null;
}

export function toQuotationProductPayload(
  product = {},
  quotationVersion = "V1",
  productReferenceField,
) {
  const unitPrice = Math.max(numberOrZero(product.sellingPrice), 0);
  const discount = Math.min(
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
    quotation_version: quotationVersion,
    description: nullableText(product.description),
    qty: Math.max(numberOrZero(product.quantity), 0),
    unit_price: unitPrice,
    discount,
    final_price: unitPrice - discount,
  };
}

export function toQuotationDetailsPayload({
  quotationRefId,
  selectedCompany,
  companyInformation = {},
  taxTreatment,
  gstPercentage,
  deliveryNotes,
  paymentNotes,
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
    products: productInformation.map((product) =>
      toQuotationProductPayload(product, quotationVersion, "product"),
    ),
  };
}
