import _ from "lodash";

const nullableText = (value) => _.trim(value) || null;

const nullableWebsite = (value) => {
  const website = nullableText(value);

  if (!website) return null;
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
};

export function toCompanyProfileUpdatePayload(values = {}) {
  return {
    company_name: _.trim(values.companyName),
    company_type: _.trim(values.companyType),
    email: nullableText(values.email),
    phone_number: nullableText(values.phoneNumber),
    gst_number: nullableText(values.gstNumber)?.toUpperCase() ?? null,
    pan_number: nullableText(values.panNumber)?.toUpperCase() ?? null,
    website: nullableWebsite(values.website),
  };
}

export function toCompanyAddressUpdatePayload(values = {}) {
  return {
    address: _.trim(values.address),
    state: _.trim(values.state),
    pincode: _.toNumber(values.pincode),
  };
}
