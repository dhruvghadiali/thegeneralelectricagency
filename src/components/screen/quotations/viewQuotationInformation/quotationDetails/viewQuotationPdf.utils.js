function hasQuotationReference(value) {
  return /\/R\d+\//i.test(String(value ?? ""));
}

function getVersionNumber(version) {
  return String(version ?? "").match(/\d+/)?.[0];
}

function getVersionedQuotationReference(reference, version) {
  const versionNumber = getVersionNumber(version);

  if (!reference || !versionNumber) return reference ?? "";

  return String(reference).replace(/\/R\d+\//i, `/R${versionNumber}/`);
}

function getQuotationReference(quotation, baseQuotation) {
  if (hasQuotationReference(quotation?.quotationNumber)) {
    return quotation.quotationNumber;
  }

  return getVersionedQuotationReference(
    baseQuotation?.quotationNumber,
    quotation?.quotationVersion,
  );
}

function getEnquiryContact(quotation, baseQuotation) {
  const person =
    quotation?.updatedBy?.name
      ? quotation.updatedBy
      : quotation?.createdBy?.name
        ? quotation.createdBy
        : baseQuotation?.updatedBy?.name
          ? baseQuotation.updatedBy
          : baseQuotation?.createdBy;

  return {
    name: person?.name ?? "",
    phone: person?.phone ?? "",
  };
}

export function createViewQuotationPdfInput(quotation, baseQuotation) {
  const productInformation = quotation?.productInformation ?? [];

  return {
    quotationRefId: getQuotationReference(quotation, baseQuotation),
    quotationDate:
      quotation?.changedAt ??
      quotation?.updatedAt ??
      quotation?.createdAt ??
      baseQuotation?.updatedAt ??
      baseQuotation?.createdAt,
    companyInformation:
      quotation?.companyInformation?.companyName
        ? quotation.companyInformation
        : baseQuotation?.companyInformation,
    productInformation,
    productDirectory: productInformation.map((product) => ({
      id: product.productId,
      name: product.product,
      productCode: product.productCode,
      hsnCode: product.hsnCode,
      category: product.category,
      agency: product.agency,
      modelNumber: product.modelNumber,
      description: product.description,
    })),
    taxTreatment: quotation?.taxTreatment,
    gstPercentage: quotation?.gstPercentage,
    deliveryNotes: quotation?.deliveryNotes,
    paymentNotes: quotation?.paymentNotes,
    loggedInUser: getEnquiryContact(quotation, baseQuotation),
  };
}

