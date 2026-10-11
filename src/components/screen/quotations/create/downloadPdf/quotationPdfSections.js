import _ from "lodash";

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
        productCode: directoryProduct.productCode ?? "",
        hsnCode: directoryProduct.hsnCode ?? "",
        category: directoryProduct.category ?? "",
        description:
          savedProduct.description || directoryProduct.description || "",
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
}) {
  return {
    taxTreatment,
    gstPercentage,
    deliveryNotes,
    paymentNotes,
  };
}

function createEnquiryContactSection(loggedInUser = {}) {
  const firstName = _.trim(loggedInUser.firstName);
  const lastName = _.trim(loggedInUser.lastName);
  const fullName = _.compact([firstName, lastName]).join(" ");
  const enquiryName = fullName.length > 30 ? firstName : fullName;

  return {
    name: enquiryName || loggedInUser.username || "-",
    phone: loggedInUser.phone || "-",
  };
}

export function createQuotationPdfSections({
  companyInformation,
  productInformation,
  productDirectory,
  taxTreatment,
  gstPercentage,
  deliveryNotes,
  paymentNotes,
  loggedInUser,
}) {
  return {
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
    }),
    enquiryContact: createEnquiryContactSection(loggedInUser),
  };
}
