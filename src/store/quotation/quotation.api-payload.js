function numberOrZero(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function toQuotationProductPayload(product = {}) {
  const unitPrice = Math.max(numberOrZero(product.sellingPrice), 0);
  const discount = Math.min(
    Math.max(numberOrZero(product.discount), 0),
    unitPrice,
  );

  return {
    product: product.productId ?? "",
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
  productInformation = [],
}) {
  return {
    quotation_ref_id: quotationRefId,
    company: selectedCompany?.id ?? "",
    company_name: companyInformation.companyName?.trim() ?? "",
    company_address: companyInformation.address?.trim() ?? "",
    company_email: companyInformation.email?.trim() ?? "",
    company_phone_number: companyInformation.phoneNumber?.trim() ?? "",
    company_gst_number: companyInformation.gstNumber?.trim() ?? "",
    tax_type: taxTreatment,
    gst: String(gstPercentage ?? ""),
    products: productInformation.map(toQuotationProductPayload),
  };
}
