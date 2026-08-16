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
  isActive = true,
} = {}) {
  return {
    ...buildListQueryParams({
      columns,
      page,
      limit,
      search,
      sort,
      filters,
    }),
    is_active: isActive,
  };
}

export function toCompanyCreatePayload(values = {}) {
  const website = values.website
    ? /^https?:\/\//i.test(values.website)
      ? values.website
      : `https://${values.website}`
    : "";

  return {
    company_name: values.company_name?.trim() ?? "",
    company_type: values.company_type ?? "",
    email: values.email?.trim() ?? "",
    phone_number: values.phone_number?.trim() ?? "",
    gst_number: values.gst_number?.trim().toUpperCase() ?? "",
    pan_number: values.pan_number?.trim().toUpperCase() ?? "",
    website,
    address: _.map(values.addresses ?? [], (companyAddress) => ({
      address: companyAddress.address?.trim() ?? "",
      pincode: _.toNumber(companyAddress.pincode),
      contact_person: _.map(
        companyAddress.company_employees ?? [],
        (contact) => ({
          contact_person_name: contact.contact_person_name?.trim() ?? "",
          contact_person_mobile_number:
            contact.contact_person_mobile_number?.trim() ?? "",
          contact_person_position:
            contact.contact_person_position?.trim() ?? "",
        }),
      ),
    })),
  };
}

export function toCompanyFormFieldPath(apiField = "") {
  return apiField
    .replace(/^address(?=\.|$)/, "addresses")
    .replace(/\.contact_person(?=\.|$)/g, ".company_employees");
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
    fieldErrors.company_name = error.message;
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
