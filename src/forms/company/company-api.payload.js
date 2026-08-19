import _ from "lodash";

import { COMPANY_TABLE_DEFAULTS, TABLE_DEFAULTS } from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toCompanyListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = COMPANY_TABLE_DEFAULTS.LIMIT,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({
    columns,
    page,
    limit,
    search,
    sort,
    filters,
  });
}

function toCompanyProfilePayload(values = {}) {
  const website = values.website
    ? /^https?:\/\//i.test(values.website)
      ? values.website
      : `https://${values.website}`
    : "";

  return {
    company_name: values.companyName?.trim() ?? "",
    company_type: values.companyType ?? "",
    email: values.email?.trim() ?? "",
    phone_number: values.phoneNumber?.trim() ?? "",
    gst_number: values.gstNumber?.trim().toUpperCase() ?? "",
    pan_number: values.panNumber?.trim().toUpperCase() ?? "",
    website,
  };
}

export function toCompanyCreatePayload(values = {}) {
  return {
    ...toCompanyProfilePayload(values),
    address: _.map(values.addresses ?? [], (companyAddress) => ({
      address: companyAddress.address?.trim() ?? "",
      pincode: _.toNumber(companyAddress.pincode),
      contact_person: _.map(
        companyAddress.companyEmployees ?? [],
        (contact) => ({
          contact_person_name: contact.contactPersonName?.trim() ?? "",
          contact_person_mobile_number:
            contact.contactPersonMobileNumber?.trim() ?? "",
          contact_person_position: contact.contactPersonPosition?.trim() ?? "",
        }),
      ),
    })),
  };
}

export function toCompanyUpdatePayload(values = {}) {
  return toCompanyProfilePayload(values);
}

export function toCompanyAddressUpdatePayload(address = {}) {
  return {
    address: address.address?.trim() ?? "",
    pincode: _.toNumber(address.pincode),
  };
}

export function toCompanyAddressCreatePayload(companyId, address = {}) {
  return {
    company: companyId,
    ...toCompanyAddressUpdatePayload(address),
  };
}

export function toCompanyContactUpdatePayload(contact = {}) {
  return {
    contact_person_name: contact.contactPersonName?.trim() ?? "",
    contact_person_mobile_number:
      contact.contactPersonMobileNumber?.trim() ?? "",
    contact_person_position: contact.contactPersonPosition?.trim() ?? "",
  };
}

export function toCompanyContactCreatePayload(
  companyId,
  addressId,
  contact = {},
) {
  return {
    company: companyId,
    company_address: addressId,
    ...toCompanyContactUpdatePayload(contact),
  };
}
