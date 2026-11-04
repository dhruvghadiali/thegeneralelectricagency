import _ from "lodash";

import {
  COMPANY_TYPE_OPTIONS,
  INDIAN_STATE_AND_UNION_TERRITORY_OPTIONS,
} from "@Enums";
import { createCompanyUpdateFormValues } from "@Redux/company/updateCompany/updateCompany.state";

const companyValue = (company, camelCaseField, snakeCaseField) =>
  _.get(company, camelCaseField) ?? _.get(company, snakeCaseField);

const textValue = (value) => (_.isNil(value) ? "" : _.toString(value));

const canonicalOptionValue = (value, options) => {
  const text = _.trim(textValue(value));
  const normalizedValue = _.toLower(text);
  const matchingOption = _.find(
    options,
    (option) => _.toLower(_.trim(option.value)) === normalizedValue,
  );

  return matchingOption?.value ?? text;
};

const firstCompanyAddress = (company) => {
  const addresses = _.get(company, "addresses") ?? _.get(company, "address");

  if (_.isArray(addresses)) return _.first(addresses) ?? {};
  return _.isPlainObject(addresses) ? addresses : {};
};

export const toCompanyInformationCompanyId = (company = {}) =>
  textValue(_.get(company, "_id") ?? _.get(company, "id"));

export const toCompanyInformationAddressId = (company = {}) => {
  const address = firstCompanyAddress(company);
  return textValue(_.get(address, "_id") ?? _.get(address, "id"));
};

export function toCompanyInformationUpdateFormValues(company = {}) {
  const address = firstCompanyAddress(company);

  return {
    ...createCompanyUpdateFormValues(),
    companyName: textValue(companyValue(company, "name", "company_name")),
    companyType: canonicalOptionValue(
      companyValue(company, "type", "company_type"),
      COMPANY_TYPE_OPTIONS,
    ),
    email: textValue(_.get(company, "email")),
    phoneNumber: textValue(companyValue(company, "phone", "phone_number")),
    gstNumber: textValue(companyValue(company, "gstNumber", "gst_number")),
    panNumber: textValue(companyValue(company, "panNumber", "pan_number")),
    website: textValue(_.get(company, "website")),
    address: textValue(_.get(address, "address")),
    state: canonicalOptionValue(
      _.get(address, "state"),
      INDIAN_STATE_AND_UNION_TERRITORY_OPTIONS,
    ),
    pincode: textValue(_.get(address, "pincode")),
  };
}
