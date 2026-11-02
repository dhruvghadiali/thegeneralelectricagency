import _ from "lodash";

export function toMigrateFromTallyPayload(tallyProductId, values = {}) {
  const nullableText = (value) => _.trim(value) || null;

  return {
    tally_product_id: _.toString(tallyProductId),
    name: _.trim(values.name),
    hsn_code: _.trim(values.hsnCode),
    category: _.trim(values.category),
    agency: _.trim(values.agency),
    description: nullableText(values.description),
    model_number: nullableText(values.modelNumber),
  };
}
