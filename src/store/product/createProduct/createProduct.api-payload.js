import _ from "lodash";

export function toProductInformationCreatePayload(values = {}) {
  const nullableText = (value) => _.trim(value) || null;

  return {
    product_code: _.trim(values.productCode),
    name: _.trim(values.name),
    category: _.trim(values.category),
    agency: _.trim(values.agency),
    model_number: nullableText(values.modelNumber),
    hsn_code: _.trim(values.hsnCode),
    description: nullableText(values.description),
  };
}
