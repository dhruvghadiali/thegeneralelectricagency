import _ from "lodash";

import { COMPANY_TABLE_DEFAULTS, TABLE_DEFAULTS } from "@Enums";

function fromCompanyContactResponse(contact = {}) {
  return {
    id: contact._id ?? contact.id ?? null,
    name: contact.contact_person_name ?? contact.name ?? "",
    mobile: contact.contact_person_mobile_number ?? contact.mobile ?? "",
    position: contact.contact_person_position ?? contact.position ?? "other",
  };
}

function fromCompanyAddressResponse(address = {}) {
  const contacts = address.company_employees ?? address.contacts ?? [];

  return {
    id: address._id ?? address.id ?? null,
    address: address.address ?? "",
    pincode: address.pincode ?? "",
    contacts: _.map(contacts, fromCompanyContactResponse),
  };
}

export function fromCompanyResponse(company = {}) {
  const addresses = _.map(
    company.addresses ?? company.address ?? [],
    fromCompanyAddressResponse,
  );

  return {
    id: company._id ?? company.id ?? null,
    name: company.company_name ?? company.name ?? "",
    type: company.company_type ?? company.type ?? "",
    email: company.email ?? "",
    phone: company.phone_number ?? company.phone ?? "",
    gstNumber: company.gst_number ?? company.gstNumber ?? "",
    panNumber: company.pan_number ?? company.panNumber ?? "",
    website: company.website ?? "",
    addresses,
    addressCount: addresses.length,
    contactCount: _.sumBy(addresses, (address) => address.contacts.length),
  };
}

export function fromCompanyListResponse(response = {}, requested = {}) {
  const pagination = response.pagination ?? {};
  const page = Number(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    Number(pagination.limit) ||
    requested.limit ||
    COMPANY_TABLE_DEFAULTS.LIMIT;
  const total = Number(pagination.total) || 0;

  return {
    items: _.map(response.companies ?? [], fromCompanyResponse),
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
