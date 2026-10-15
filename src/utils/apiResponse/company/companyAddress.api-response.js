import _ from "lodash";

import { fromCompanyContactApiResponse } from "@utils/apiResponse/company/companyContact.api-response";

export function fromCompanyAddressApiResponse(address = {}) {
  const contacts =
    address.company_employees ?? address.contact_person ?? address.contacts ?? [];

  return {
    id: address._id ?? address.id ?? null,
    address: address.address ?? "",
    state: address.state ?? "",
    pincode: address.pincode ?? "",
    contacts: _.map(contacts, fromCompanyContactApiResponse),
  };
}

export default fromCompanyAddressApiResponse;
