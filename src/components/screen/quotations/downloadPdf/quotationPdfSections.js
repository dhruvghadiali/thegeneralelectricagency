import _ from "lodash";

// Shared data mapping for create and edit quotation PDFs.

function createCompanySection(companyInformation = {}) {
  return {
    name: companyInformation.companyName ?? "",
    address1: companyInformation.address ?? "",
    email: companyInformation.email ?? "",
    phone: companyInformation.phoneNumber ?? "",
    gstNumber: companyInformation.gstNumber ?? "",
  };
}

function createProductSections(
  productInformation = [],
  productDirectory = [],
  gstPercentage,
) {
  const productsById = new Map(
    productDirectory.map((product) => [product.id, product]),
  );

  return productInformation.map((savedProduct) => {
    const directoryProduct = productsById.get(savedProduct.productId) ?? {};

    return {
      product: {
        name: savedProduct.product,
        productCode:
          savedProduct.productCode ?? directoryProduct.productCode ?? "",
        hsnCode: savedProduct.hsnCode || directoryProduct.hsnCode || "",
        category: savedProduct.category ?? directoryProduct.category ?? "",
        description:
          savedProduct.description ?? directoryProduct.description ?? "",
        productDeliveryNotes:
          savedProduct.productDeliveryNotes ??
          directoryProduct.productDeliveryNotes ??
          "",
      },
      pricing: {
        quantity: savedProduct.quantity,
        salePrice: savedProduct.sellingPrice,
        discountAmount: savedProduct.discount,
        gstPercentage,
      },
    };
  });
}

function createCommercialSection({
  taxTreatment,
  gstPercentage,
  deliveryNotes,
  paymentNotes,
  roundOff,
}) {
  return {
    taxTreatment,
    gstPercentage,
    deliveryNotes,
    paymentNotes,
    roundOff,
  };
}

function capitalizeName(name) {
  return _.toLower(_.trim(name)).replace(
    /(^|[\s'-])([a-z])/g,
    (_match, separator, letter) => `${separator}${_.toUpper(letter)}`,
  );
}

function createEnquiryContactSection(loggedInUser = {}) {
  const firstName = _.trim(loggedInUser.firstName);
  const lastName = _.trim(loggedInUser.lastName);
  const fullName = _.compact([firstName, lastName]).join(" ");
  const savedName = _.trim(loggedInUser.name);
  const enquiryName =
    (savedName || fullName).length > 30
      ? firstName || savedName
      : savedName || fullName;

  return {
    name: capitalizeName(enquiryName || loggedInUser.username) || "-",
    phone: loggedInUser.phone || "-",
  };
}

export function createQuotationPdfSections({
  quotationRefId,
  quotationDate,
  companyInformation,
  productInformation,
  productDirectory,
  taxTreatment,
  gstPercentage,
  deliveryNotes,
  paymentNotes,
  roundOff,
  loggedInUser,
}) {
  return {
    quotationRefId,
    quotationDate,
    company: createCompanySection(companyInformation),
    products: createProductSections(
      productInformation,
      productDirectory,
      gstPercentage,
    ),
    commercial: createCommercialSection({
      taxTreatment,
      gstPercentage,
      deliveryNotes,
      paymentNotes,
      roundOff,
    }),
    enquiryContact: createEnquiryContactSection(loggedInUser),
  };
}
