import _ from "lodash";

import { COMPANY_DETAILS_INITIAL_VALUES } from "@Forms/company/companyDetails/companyDetails.initialValues";

export function toCompanyFormValues(company) {
  if (!company) {
    return _.cloneDeep(COMPANY_DETAILS_INITIAL_VALUES);
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
        : _.cloneDeep(COMPANY_DETAILS_INITIAL_VALUES.addresses),
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

  return {
    message: error.message || "Unable to save the company. Please try again.",
    fieldErrors,
  };
}
