import _ from "lodash";

export function findDuplicateProductIndex(
  products,
  candidate,
  editingProductIndex,
) {
  const candidateName = _.toLower(_.trim(candidate.product));

  return products.findIndex((product, index) => {
    if (index === editingProductIndex) return false;

    const hasMatchingId =
      candidate.productId !== null &&
      candidate.productId !== undefined &&
      product.productId !== null &&
      product.productId !== undefined &&
      String(candidate.productId) === String(product.productId);
    const hasMatchingName =
      candidateName.length > 0 &&
      candidateName === _.toLower(_.trim(product.product));

    return hasMatchingId || hasMatchingName;
  });
}
