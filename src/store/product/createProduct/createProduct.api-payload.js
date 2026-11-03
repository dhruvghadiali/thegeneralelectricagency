import _ from "lodash";

export function toProductInformationCreatePayload(values = {}) {
  const payload = {
    product_code: _.trim(values.productCode ?? ""),
    hsn_code: _.trim(values.hsnCode ?? ""),
    name: _.trim(values.name ?? ""),
    category: values.category ?? "",
    agency: values.agency ?? "",
  };

  const modelNumber = _.trim(values.modelNumber ?? "");
  const description = _.trim(values.description ?? "");

  if (modelNumber) payload.model_number = modelNumber;
  if (description) payload.description = description;

  return payload;
}
