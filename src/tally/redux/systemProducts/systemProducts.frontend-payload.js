export function fromSystemProductsResponse(response) {
  const groups = Array.isArray(response) ? response : [response];

  if (groups.some((group) => !Array.isArray(group?.tally_products))) {
    throw new Error("The system products response is missing tally_products.");
  }

  return groups.reduce(
    (products, group) => products.concat(group.tally_products),
    [],
  );
}
