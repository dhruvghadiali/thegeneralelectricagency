import _ from "lodash";

const EMPTY_VALUE = "-";

export function formattedValue(value, formatter) {
  if (_.isNil(value) || _.trim(String(value)) === "") return EMPTY_VALUE;

  return formatter(String(value));
}

export function companyAddress(company) {
  const address = company?.addresses?.[0];
  const addressParts = [
    address?.address || company?.address1,
    address?.state || company?.state1,
    address?.pincode || company?.pincode1,
  ].filter((value) => !_.isNil(value) && _.trim(String(value)) !== "");

  if (addressParts.length === 0) return EMPTY_VALUE;

  return addressParts.map((value) => _.startCase(String(value))).join(", ");
}

export function companyStreetAddress(company) {
  return company?.addresses?.[0]?.address || company?.address1 || "";
}
