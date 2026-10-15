const VERSION_PATTERN = /^V(\d+)$/i;
const REFERENCE_REVISION_PATTERN = /\/R(\d+)\//i;

function revisionProduct(product = {}) {
  // Description remains editable metadata and must not create a new revision.
  return {
    lineId: product.lineId ?? null,
    productId: product.productId ?? null,
    productSource: product.productSource ?? "product",
    quantity: Number(product.quantity) || 0,
    sellingPrice: Number(product.sellingPrice) || 0,
    discount: Number(product.discount) || 0,
  };
}

function normalizedGstPercentage(value) {
  const numericValue = Number(value);

  return Number.isFinite(numericValue)
    ? numericValue
    : String(value ?? "").trim();
}

export function hasQuotationRevisionChanges(
  originalProducts = [],
  currentProducts = [],
  originalGstPercentage,
  currentGstPercentage,
) {
  if (
    normalizedGstPercentage(originalGstPercentage) !==
    normalizedGstPercentage(currentGstPercentage)
  ) {
    return true;
  }

  if (originalProducts.length !== currentProducts.length) return true;

  return originalProducts.some((originalProduct, index) => {
    const currentProduct = currentProducts[index];

    return (
      JSON.stringify(revisionProduct(originalProduct)) !==
      JSON.stringify(revisionProduct(currentProduct))
    );
  });
}

function nextQuotationVersion(currentVersion, quotationReference) {
  const versionMatch = String(currentVersion ?? "").match(VERSION_PATTERN);
  const referenceMatch = String(quotationReference ?? "").match(
    REFERENCE_REVISION_PATTERN,
  );
  const currentNumber = Number(versionMatch?.[1] ?? referenceMatch?.[1]) || 1;

  return `V${currentNumber + 1}`;
}

function nextQuotationReference(quotationReference) {
  return String(quotationReference ?? "").replace(
    REFERENCE_REVISION_PATTERN,
    (_match, currentRevision) => `/R${Number(currentRevision) + 1}/`,
  );
}

export function resolveEditQuotationRevision({
  quotationReference,
  quotationVersion,
  originalGstPercentage,
  currentGstPercentage,
  originalProducts = [],
  currentProducts = [],
}) {
  const hasRevisionChanges = hasQuotationRevisionChanges(
    originalProducts,
    currentProducts,
    originalGstPercentage,
    currentGstPercentage,
  );

  if (!hasRevisionChanges) {
    return {
      hasRevisionChanges,
      quotationReference,
      quotationVersion,
    };
  }

  return {
    hasRevisionChanges,
    quotationReference: nextQuotationReference(quotationReference),
    quotationVersion: nextQuotationVersion(
      quotationVersion,
      quotationReference,
    ),
  };
}
