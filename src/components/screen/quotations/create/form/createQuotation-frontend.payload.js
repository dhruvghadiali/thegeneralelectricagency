function hasValue(value) {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

function getPrimaryAddress(company = {}) {
  return (
    company.addresses?.find((address) =>
      [address.address, address.state, address.pincode].some(hasValue),
    ) ?? null
  );
}

function formatCompanyAddress(company, primaryAddress) {
  return [
    primaryAddress?.address ?? company.address1,
    primaryAddress?.state ?? company.state1,
    primaryAddress?.pincode ?? company.pincode1,
  ]
    .filter(hasValue)
    .map((value) => String(value).trim())
    .join(", ");
}

export function toQuotationCompanyFormValues(company = {}) {
  const primaryAddress = getPrimaryAddress(company);
  const contactPhone = primaryAddress?.contacts?.find((contact) =>
    hasValue(contact.mobile),
  )?.mobile;

  return {
    companyName: company.name ?? "",
    address: formatCompanyAddress(company, primaryAddress),
    email: company.email ?? "",
    phoneNumber: company.phone || contactPhone || "",
    gstNumber: company.gstNumber ?? "",
  };
}

export function toQuotationProductFormValues(product = {}) {
  return {
    product: product.name ?? "",
    sellingPrice:
      product.salePrice === null || product.salePrice === undefined
        ? ""
        : String(product.salePrice),
    description: product.description ?? "",
  };
}
