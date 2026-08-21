import { TABLE_DEFAULTS } from "@Enums";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company";
import { toCompanyListParams } from "@Tables/company/companyTable.api-payload";

export const activeCompanyListParams = (options) => ({
  ...toCompanyListParams(options),
  is_active: true,
});

export const companyListRequestOptions = ({ search, page }) => ({
  page,
  limit: COMPANY_TABLE_DEFAULTS.limit,
  search,
  sort: COMPANY_TABLE_DEFAULTS.sort,
});

export function findContactAddress(company, contact) {
  return (
    company?.addresses?.find(
      (address) =>
        (contact.companyAddressId && address.id === contact.companyAddressId) ||
        (address.address === contact.companyAddress &&
          String(address.pincode) === String(contact.companyAddressPincode)),
    ) ?? null
  );
}

export function findContactCompany(companies, contact) {
  return (
    companies.find((company) => company.id === contact.companyId) ??
    companies.find((company) => company.name === contact.companyName) ??
    null
  );
}

export function getAssignmentBlockReason({
  currentCompany,
  currentAddress,
  isInactiveContact,
}) {
  if (isInactiveContact || !currentCompany) return null;
  if (currentCompany.contactCount <= 1) {
    return `${currentCompany.name} has only one contact person. Add another contact person before moving this contact.`;
  }
  if (!currentAddress) {
    return "The current company address could not be verified. Reassignment is unavailable.";
  }
  if (currentAddress.contacts.length <= 1) {
    return "This address has only one contact person. Add another contact person to this address before moving this contact.";
  }
  return null;
}

export function getAssignmentValues(assignment) {
  return {
    companyId: assignment.companyId,
    companyAddressId: assignment.companyAddressId,
  };
}

export function hasAssignmentChanged(assignment) {
  const values = getAssignmentValues(assignment);
  return Boolean(
    values.companyId &&
      values.companyAddressId &&
      (values.companyId !== String(assignment.currentCompany?.id ?? "") ||
        values.companyAddressId !== String(assignment.currentAddress?.id ?? "")),
  );
}

export function yupFieldErrors(error) {
  return Object.fromEntries(
    (error?.inner ?? [])
      .filter((item) => item.path && item.message)
      .map((item) => [item.path, item.message]),
  );
}

export const FIRST_COMPANY_PAGE = TABLE_DEFAULTS.PAGE;
