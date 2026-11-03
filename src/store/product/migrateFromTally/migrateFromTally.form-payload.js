import _ from "lodash";

import { createMigrateFromTallyFormValues } from "@Redux/product/migrateFromTally/migrateFromTally.state";

const productValue = (product, camelCaseField, snakeCaseField) =>
  _.get(product, camelCaseField) ?? _.get(product, snakeCaseField);

export const checkIsTallyCollectionProduct = (product = {}) =>
  _.includes(
    [true, 1, "true", "1"],
    productValue(
      product,
      "isTallyCollectionRecord",
      "is_tally_collection_record",
    ),
  );

export const toMigrateFromTallyProductId = (product = {}) =>
  _.toString(_.get(product, "_id") ?? _.get(product, "id"));

export function toMigrateFromTallyFormValues(product = {}) {
  const emptyValues = createMigrateFromTallyFormValues();

  return {
    ...emptyValues,
    productCode: _.toString(
      productValue(product, "productMasterId", "product_master_id"),
    ),
    name: _.toString(_.get(product, "name")),
    hsnCode: _.toString(productValue(product, "hsnCode", "hsn_code")),
    description: _.toString(_.get(product, "description")),
  };
}
