import _ from "lodash";

import { INDIAN_STATE_AND_UNION_TERRITORY_OPTIONS } from "@Enums";
import { createCompanyMigrateFormValues } from "@Redux/company/migrateFromTally/migrateFromTally.state";

const companyValue = (company, camelCaseField, snakeCaseField) =>
  _.get(company, camelCaseField) ?? _.get(company, snakeCaseField);

const textValue = (value) => (_.isNil(value) ? "" : _.toString(value));

const canonicalStateValue = (value) => {
  const text = _.trim(textValue(value));
  const normalizedValue = _.toLower(text);
  const matchingOption = _.find(
    INDIAN_STATE_AND_UNION_TERRITORY_OPTIONS,
    (option) => _.toLower(_.trim(option.value)) === normalizedValue,
  );

  return matchingOption?.value ?? text;
};

export const checkIsTallyCollectionCompany = (company = {}) =>
  _.includes(
    [true, 1, "true", "1"],
    companyValue(
      company,
      "isTallyCollectionRecord",
      "is_tally_collection_record",
    ),
  );

export const toMigrateFromTallyCompanyId = (company = {}) =>
  textValue(_.get(company, "_id") ?? _.get(company, "id"));

export function toMigrateFromTallyCompanyFormValues(company = {}) {
  return {
    ...createCompanyMigrateFormValues(),
    companyName: textValue(companyValue(company, "name", "company_name")),
    email: textValue(_.get(company, "email")),
    gstNumber: textValue(companyValue(company, "gstNumber", "gst_number")),
    panNumber: textValue(companyValue(company, "panNumber", "pan_number")),
    phoneNumber: textValue(companyValue(company, "phone", "phone_number")),
    website: textValue(_.get(company, "website")),
    address: textValue(_.get(company, "address1")),
    pincode: textValue(_.get(company, "pincode1")),
    state: canonicalStateValue(_.get(company, "state1")),
  };
}
