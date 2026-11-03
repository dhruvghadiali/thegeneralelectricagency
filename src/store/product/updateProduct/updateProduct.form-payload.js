import _ from "lodash";

import { createProductUpdateFormValues } from "@Redux/product/updateProduct/updateProduct.state";

const productValue = (product, camelCaseField, snakeCaseField) =>
  _.get(product, camelCaseField) ?? _.get(product, snakeCaseField);

const agencyValues = (product) => {
  const agency = _.get(product, "agency");

  if (_.isObject(agency)) {
    return {
      agency: _.toString(_.get(agency, "_id") ?? _.get(agency, "id")),
      agencyName: _.toString(
        _.get(agency, "company_name") ?? _.get(agency, "name"),
      ),
    };
  }

  return {
    agency: _.toString(agency),
    agencyName: _.toString(
      productValue(product, "agencyName", "agency_name") ??
        _.get(product, "company_name"),
    ),
  };
};

export const toProductInformationProductId = (product = {}) =>
  _.toString(_.get(product, "_id") ?? _.get(product, "id"));

export function toProductInformationFormValues(product = {}) {
  return {
    ...createProductUpdateFormValues(),
    productCode: _.toString(
      productValue(product, "productCode", "product_code"),
    ),
    name: _.toString(_.get(product, "name")),
    category: _.toString(_.get(product, "category")),
    ...agencyValues(product),
    modelNumber: _.toString(
      productValue(product, "modelNumber", "model_number"),
    ),
    hsnCode: _.toString(productValue(product, "hsnCode", "hsn_code")),
    description: _.toString(_.get(product, "description")),
  };
}
