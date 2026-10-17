import _ from "lodash";

import { TABLE_DEFAULTS } from "@Enums";

const fromPersonResponse = (person = {}) => {
  if (_.isString(person)) {
    return { id: null, name: person };
  }

  return {
    id: person?._id ?? person?.id ?? null,
    name:
      person?.name ??
      [
        person?.first_name ?? person?.firstName,
        person?.last_name ?? person?.lastName,
      ]
        .filter(Boolean)
        .join(" "),
    phone:
      person?.phone ??
      person?.phone_number ??
      person?.phoneNumber ??
      person?.mobile ??
      person?.mobile_number ??
      person?.mobileNumber ??
      null,
  };
};

const fromCompanyResponse = (quotation = {}) => {
  const companyReferences = [
    quotation.company,
    quotation.company_id,
    quotation.companyId,
    quotation.tally_company,
    quotation.tallyCompany,
    quotation.tally_company_id,
    quotation.tallyCompanyId,
  ];
  const company = companyReferences.find(_.isObject) ?? {};
  const companyId = companyReferences.reduce(
    (resolvedId, reference) =>
      resolvedId ??
      (_.isObject(reference)
        ? reference._id ??
          reference.id ??
          reference.company_id ??
          reference.companyId ??
          null
        : reference ?? null),
    null,
  );

  return {
    id: companyId,
    name:
      company.company_name ??
      company.companyName ??
      company.name ??
      quotation.company_name ??
      quotation.companyName ??
      "",
  };
};

const discountPercentageFromAmount = (discount, sellingPrice) => {
  if (discount === null || discount === undefined || discount === "") {
    return "";
  }

  const numericDiscount = Number(discount);
  const numericSellingPrice = Number(sellingPrice);

  if (
    !Number.isFinite(numericDiscount) ||
    !Number.isFinite(numericSellingPrice) ||
    numericSellingPrice <= 0
  ) {
    return "0";
  }

  return Number(((numericDiscount / numericSellingPrice) * 100).toFixed(2))
    .toString();
};

const fromQuotationProductResponse = (item = {}) => {
  const productReferences = [item.product, item.product_id, item.productId];
  const tallyProductReferences = [
    item.tally_product,
    item.tallyProduct,
    item.tally_product_id,
    item.tallyProductId,
  ];
  const isTallyProduct = tallyProductReferences.some((value) => !_.isNil(value));
  const references = isTallyProduct
    ? tallyProductReferences
    : productReferences;
  const product = references.find(_.isObject) ?? {};
  const productId = references.reduce(
    (resolvedId, reference) =>
      resolvedId ??
      (_.isObject(reference)
        ? reference._id ??
          reference.id ??
          reference.product_id ??
          reference.productId ??
          reference.tally_product_id ??
          reference.tallyProductId ??
          null
        : reference ?? null),
    null,
  );
  const sellingPrice =
    item.unit_price ??
    item.unitPrice ??
    item.selling_price ??
    item.sellingPrice ??
    "";
  const discount = item.discount ?? "";

  return {
    lineId: item._id ?? item.id ?? null,
    quotationVersion:
      item.quotation_version ?? item.quotationVersion ?? null,
    productId,
    productSource: isTallyProduct ? "tallyProduct" : "product",
    product:
      product.name ??
      product.product_name ??
      product.productName ??
      item.product_name ??
      item.productName ??
      item.name ??
      "",
    quantity: String(item.qty ?? item.quantity ?? ""),
    sellingPrice: String(sellingPrice),
    discount: String(discount),
    discountPercentage: discountPercentageFromAmount(discount, sellingPrice),
    description: item.description ?? "",
    finalPrice: String(item.final_price ?? item.finalPrice ?? ""),
    hsnCode:
      product.hsn_code ??
      product.hsnCode ??
      item.hsn_code ??
      item.hsnCode ??
      "",
    productCode:
      product.product_code ?? product.productCode ?? item.product_code ?? "",
    category: product.category ?? item.category ?? "",
    agency: product.agency ?? item.agency ?? "",
    modelNumber:
      product.model_number ?? product.modelNumber ?? item.model_number ?? "",
  };
};

export const fromQuotationResponse = (quotation = {}) => {
  const company = fromCompanyResponse(quotation);
  const quotationProducts =
    quotation.products ?? quotation.productInformation ?? [];
  const productInformation = _.map(
    quotationProducts,
    fromQuotationProductResponse,
  );
  const quotationNumber =
    quotation.quotation_ref_id ??
    quotation.quotationRefId ??
    quotation.quotation_number ??
    quotation.quotationNumber ??
    "";
  const referenceVersion = String(quotationNumber).match(/\/R(\d+)\//i)?.[1];
  const productVersion = productInformation
    .map((product) => product.quotationVersion)
    .find(Boolean);
  const quotationVersion =
    quotation.quotation_version ??
    quotation.quotationVersion ??
    productVersion ??
    (referenceVersion ? `V${referenceVersion}` : "V1");
  const isUpdateAvailable = quotationProducts.every(
    (item) => {
      const references = [
        item.product,
        item.product_id,
        item.productId,
        item.tally_product,
        item.tallyProduct,
        item.tally_product_id,
        item.tallyProductId,
      ];

      return references.some((value) => !_.isNil(value));
    },
  );

  return {
    id: quotation._id ?? quotation.id ?? null,
    company,
    selectedCompany: company,
    companyName: company.name,
    companyInformation: {
      companyName: company.name,
      address: quotation.company_address ?? quotation.companyAddress ?? "",
      email: quotation.company_email ?? quotation.companyEmail ?? "",
      phoneNumber:
        quotation.company_phone_number ?? quotation.companyPhoneNumber ?? "",
      gstNumber:
        quotation.company_gst_number ?? quotation.companyGstNumber ?? "",
    },
    quotationNumber,
    quotationVersion,
    taxTreatment: quotation.tax_type ?? quotation.taxType ?? null,
    gstPercentage: String(
      quotation.gst ??
        quotation.gst_percentage ??
        quotation.gstPercentage ??
        "",
    ),
    deliveryNotes: quotation.delivery_notes ?? quotation.deliveryNotes ?? "",
    paymentNotes: quotation.payment_notes ?? quotation.paymentNotes ?? "",
    notes: quotation.notes ?? "",
    products: productInformation.map(({ productId, product, hsnCode }) => ({
      id: productId,
      name: product,
      hsnCode,
    })),
    productInformation,
    isUpdateAvailable,
    quotationHistory:
      quotation.quotation_history ?? quotation.quotationHistory ?? [],
    createdBy: fromPersonResponse(quotation.created_by ?? quotation.createdBy),
    createdAt: quotation.created_at ?? quotation.createdAt ?? null,
    updatedBy: fromPersonResponse(quotation.updated_by ?? quotation.updatedBy),
    updatedAt: quotation.updated_at ?? quotation.updatedAt ?? null,
  };
};

function getQuotationRecords(response) {
  if (_.isArray(response)) return response;

  return (
    response.quotation_details ??
    response.quotationDetails ??
    response.quotations ??
    response.items ??
    []
  );
}

export function fromQuotationListResponse(response = {}, requested = {}) {
  const pagination = _.isArray(response) ? {} : (response.pagination ?? {});
  const page = Number(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    Number(pagination.limit) || requested.limit || TABLE_DEFAULTS.LIMIT;
  const records = getQuotationRecords(response);
  const total =
    Number(pagination.total) ||
    Number(response?.total) ||
    (_.isArray(response) ? response.length : records.length);

  return {
    items: _.map(records, fromQuotationResponse),
    pagination: {
      page,
      limit,
      total,
      totalPages:
        Number(pagination.total_pages ?? pagination.totalPages) ||
        Math.ceil(total / limit) ||
        0,
    },
  };
}

export default fromQuotationListResponse;
