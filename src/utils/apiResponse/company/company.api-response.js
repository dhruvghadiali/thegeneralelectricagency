import _ from "lodash";

import { fromCompanyAddressApiResponse } from "@utils/apiResponse/company/companyAddress.api-response";

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

export function fromCompanyApiResponse(company = {}) {
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
  const addresses = _.map(addressSource, fromCompanyAddressApiResponse);

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

export default fromCompanyApiResponse;
