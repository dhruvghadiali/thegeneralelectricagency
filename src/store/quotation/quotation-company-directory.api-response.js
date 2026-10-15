import {
  QUOTATION_COMPANY_LIMIT,
  QUOTATION_COMPANY_PAGE,
} from "@Redux/quotation/quotation.state";
import { fromCompanyListApiResponse } from "@utils/apiResponse/company/companyList.api-response";

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

export function fromQuotationCompanyDirectoryResponse(
  response = {},
  requested = {},
) {
  return fromCompanyListApiResponse(response, requested, {
    page: QUOTATION_COMPANY_PAGE,
    limit: QUOTATION_COMPANY_LIMIT,
  });
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
