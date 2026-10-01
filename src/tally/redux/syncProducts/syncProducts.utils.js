export function findNewProducts(tallyProducts, systemProducts) {
  const systemIds = new Set(
    systemProducts
      .map(({ product_id: productId }) => String(productId ?? "").trim().toLowerCase())
      .filter(Boolean),
  );

  return tallyProducts.filter(({ guid }) => {
    const tallyGuid = String(guid ?? "").trim().toLowerCase();
    return tallyGuid && !systemIds.has(tallyGuid);
  });
}
