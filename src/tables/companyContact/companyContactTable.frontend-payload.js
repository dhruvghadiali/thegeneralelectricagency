import _ from "lodash";

import { TABLE_DEFAULTS } from "@Enums";
import { COMPANY_CONTACT_TABLE_DEFAULTS } from "@Tables/companyContact/companyContactTable.defaults";

function fromCompanyDetailsResponse(details = {}) {
  return {
    email: details.email ?? "",
    phone: details.phone_number ?? "",
    gstNumber: details.gst_number ?? "",
    panNumber: details.pan_number ?? "",
  };
}

function fromCompanyContactResponse(contact = {}) {
  return {
    id: contact._id ?? contact.id ?? null,
    companyId:
      contact.company_id ??
      contact.company?._id ??
      contact.company?.id ??
      (typeof contact.company === "string" ? contact.company : null),
    companyAddressId:
      contact.company_address_id ??
      contact.company_address?._id ??
      contact.company_address?.id ??
      null,
    contactPersonName: contact.contact_person_name ?? "",
    contactPersonMobileNumber:
      contact.contact_person_mobile_number ?? "",
    contactPersonPosition: contact.contact_person_position ?? "other",
    isActive: contact.is_active !== false,
    companyName: contact.company_name ?? "",
    companyType: contact.company_type ?? "",
    companyAddress:
      contact.company_address?.address ?? contact.company_address ?? "",
    companyAddressPincode:
      contact.company_address_pincode ?? contact.company_address?.pincode ?? "",
    companyDetails: _.map(
      contact.company_details ?? [],
      fromCompanyDetailsResponse,
    ),
  };
}

function fromCompanyContactPaginationResponse(
  pagination = {},
  requested = {},
) {
  const page =
    _.toNumber(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    _.toNumber(pagination.limit) ||
    requested.limit ||
    COMPANY_CONTACT_TABLE_DEFAULTS.limit;
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

function fromCompanyContactSummaryResponse(summary = {}) {
  return {
    totalContacts: _.toNumber(summary.total_contacts) || 0,
    activeContacts: _.toNumber(summary.active_contacts) || 0,
    inactiveContacts: _.toNumber(summary.inactive_contacts) || 0,
  };
}

export function fromCompanyContactListResponse(response = {}, requested = {}) {
  return {
    items: _.map(
      response.company_contacts ?? [],
      fromCompanyContactResponse,
    ),
    pagination: fromCompanyContactPaginationResponse(
      response.pagination ?? {},
      requested,
    ),
    summary: fromCompanyContactSummaryResponse(response.summary),
  };
}
