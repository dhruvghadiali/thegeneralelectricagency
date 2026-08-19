import _ from "lodash";

import { COMPANY_TABLE_DEFAULTS, TABLE_DEFAULTS } from "@Enums";
import { COMPANY_INITIAL_VALUES } from "@Forms/company/company.initialValues";

export function toCompanyFormValues(company) {
  if (!company) {
    return _.cloneDeep(COMPANY_INITIAL_VALUES);
  }

  const addresses = _.map(company.addresses ?? [], (companyAddress) => ({
    id: companyAddress.id ?? null,
    address: companyAddress.address ?? "",
    pincode: String(companyAddress.pincode ?? ""),
    companyEmployees: _.map(companyAddress.contacts ?? [], (contact) => ({
      id: contact.id ?? null,
      contactPersonName: contact.name ?? "",
      contactPersonMobileNumber: contact.mobile ?? "",
      contactPersonPosition: contact.position ?? "",
    })),
  }));

  return {
    companyName: company.name ?? "",
    companyType: company.type ?? "",
    email: company.email ?? "",
    phoneNumber: company.phone ?? "",
    gstNumber: company.gstNumber ?? "",
    panNumber: company.panNumber ?? "",
    website: company.website ?? "",
    addresses:
      addresses.length > 0
        ? addresses
        : _.cloneDeep(COMPANY_INITIAL_VALUES.addresses),
  };
}

const COMPANY_FORM_FIELD_BY_API_FIELD = {
  company_name: "companyName",
  company_type: "companyType",
  phone_number: "phoneNumber",
  gst_number: "gstNumber",
  pan_number: "panNumber",
  address: "addresses",
  contact_person: "companyEmployees",
  contact_person_name: "contactPersonName",
  contact_person_mobile_number: "contactPersonMobileNumber",
  contact_person_position: "contactPersonPosition",
};

function toCompanyFormFieldPath(apiField = "") {
  return apiField.replace(
    /(^|\.)([a-z_]+)(?=\.|\[|$)/g,
    (_, separator, field) =>
      `${separator}${COMPANY_FORM_FIELD_BY_API_FIELD[field] ?? field}`,
  );
}

const COMPANY_CREATE_STATUS_MESSAGES = {
  400: "Please review the highlighted company details.",
  401: "Your session has expired. Please sign in again.",
  403: "You do not have permission to add a company.",
  404: "The company service could not be found.",
  408: "The request timed out. Please try again.",
  409: "A company with these details already exists.",
  413: "The submitted company details are too large.",
  422: "Please review the highlighted company details.",
  429: "Too many requests. Please wait a moment and try again.",
  500: "The server could not create the company. Please try again.",
  502: "The company service is temporarily unavailable.",
  503: "The company service is temporarily unavailable.",
  504: "The company service took too long to respond.",
};

export function fromCompanyCreateError(error = {}) {
  const fieldErrors = {};
  const errorDetails = _.isArray(error.data)
    ? error.data
    : _.isArray(error.data?.errors)
      ? error.data.errors
      : [];

  _.forEach(errorDetails, (item) => {
    if (!item?.field || !item?.message) return;
    fieldErrors[toCompanyFormFieldPath(item.field)] = item.message;
  });

  if (error.status === 409 && error.message && _.isEmpty(fieldErrors)) {
    fieldErrors.companyName = error.message;
  }

  const isNetworkError =
    !error.status &&
    (!error.message || /network error|failed to fetch/i.test(error.message));
  const fallbackMessage = isNetworkError
    ? "Unable to connect to the company service. Check your connection and try again."
    : COMPANY_CREATE_STATUS_MESSAGES[error.status] ??
      "Unable to save the company. Please try again.";
  const hasBackendMessage =
    error.message &&
    !/^request failed with status code/i.test(error.message) &&
    !/network error|failed to fetch/i.test(error.message);

  return {
    status: error.status ?? null,
    message: hasBackendMessage ? error.message : fallbackMessage,
    fieldErrors,
    retryable:
      isNetworkError ||
      [408, 429, 500, 502, 503, 504].includes(error.status),
  };
}

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
    pincode: address.pincode ?? "",
    contacts: _.map(contacts, fromCompanyContactResponse),
  };
}

function fromCompanyResponse(company = {}) {
  const addresses = _.map(
    company.addresses ?? company.address ?? [],
    fromCompanyAddressResponse,
  );

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
    addresses,
    addressCount: addresses.length,
    contactCount: _.sumBy(addresses, (address) => address.contacts.length),
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
    summary: fromCompanySummaryResponse(response.summary),
  };
}
