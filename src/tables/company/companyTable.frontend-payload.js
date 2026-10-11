import _ from "lodash";

import { TABLE_DEFAULTS } from "@Enums";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";

function fromCompanyContactResponse(contact = {}) {
  return {
    id: contact._id ?? contact.id ?? null,
    name: contact.contact_person_name ?? contact.name ?? "",
    mobile: contact.contact_person_mobile_number ?? contact.mobile ?? "",
    position: contact.contact_person_position ?? contact.position ?? "other",
  };
}

function fromCompanyAddressResponse(address = {}) {
  const contacts =
    address.company_employees ?? address.contact_person ?? address.contacts ?? [];

  return {
    id: address._id ?? address.id ?? null,
    address: address.address ?? "",
    state: address.state ?? "",
    pincode: address.pincode ?? "",
    contacts: _.map(contacts, fromCompanyContactResponse),
  };
}

function findSystemAddressRecord(value) {
  if (_.isArray(value)) {
    return value.map(findSystemAddressRecord).find(Boolean) ?? null;
  }

  if (!_.isPlainObject(value)) return null;

  const hasAddressValue = ["address1", "state1", "pincode1"].some((field) => {
    const fieldValue = value[field];
    return !_.isNil(fieldValue) && String(fieldValue).trim() !== "";
  });

  if (hasAddressValue) return value;

  return Object.values(value).map(findSystemAddressRecord).find(Boolean) ?? null;
}

function fromCompanyResponse(company = {}) {
  const systemId = company.system_id ?? company.systemId;
  const hasSystemId = !_.isNil(systemId) && String(systemId).trim() !== "";
  const systemCompany =
    findSystemAddressRecord(systemId) ??
    findSystemAddressRecord(company) ??
    company;
  const systemAddress = systemCompany.address1 ?? company.address1 ?? "";
  const systemState = systemCompany.state1 ?? company.state1 ?? "";
  const systemPincode = systemCompany.pincode1 ?? company.pincode1 ?? "";
  const addressSource = hasSystemId
    ? [
        {
          address: systemAddress,
          state: systemState,
          pincode: systemPincode,
          company_employees: company.company_employees,
          contact_person: company.contact_person,
          contacts: company.contacts,
        },
      ]
    : company.addresses ?? company.address ?? [];
  const addresses = _.map(addressSource, fromCompanyAddressResponse);

  return {
    id: company._id ?? company.id ?? null,
    name: company.company_name ?? company.name ?? "",
    type: company.company_type ?? company.type ?? "",
    isActive: company.is_active !== false,
    email: company.email ?? "",
    phone: company.phone_number ?? company.phone ?? "",
    gstNumber: company.gst_number ?? company.gstNumber ?? "",
    panNumber: company.pan_number ?? company.panNumber ?? "",
    website: company.website ?? "",
    systemId,
    address1: systemAddress,
    state1: systemState,
    pincode1: systemPincode,
    addresses,
    addressCount: addresses.length,
    contactCount: _.sumBy(addresses, (address) => address.contacts.length),
  };
}

function fromCompanyPaginationResponse(pagination = {}, requested = {}) {
  const page =
    _.toNumber(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    _.toNumber(pagination.limit) ||
    requested.limit ||
    COMPANY_TABLE_DEFAULTS.limit;
  const total = _.toNumber(pagination.total) || 0;

  return {
    page,
    limit,
    total,
    totalPages:
      _.toNumber(pagination.total_pages ?? pagination.totalPages) ||
      Math.ceil(total / limit) ||
      0,
  };
}

function fromCompanySummaryResponse(summary = {}) {
  return {
    totalCompanies: _.toNumber(summary.total_companies) || 0,
    activeCompanies: _.toNumber(summary.active_companies) || 0,
    inactiveCompanies: _.toNumber(summary.inactive_companies) || 0,
  };
}

export function fromCompanyListResponse(response = {}, requested = {}) {
  return {
    items: _.map(response.companies ?? [], fromCompanyResponse),
    pagination: fromCompanyPaginationResponse(
      response.pagination ?? {},
      requested,
    ),
    summary: fromCompanySummaryResponse(response.summary),
  };
}
