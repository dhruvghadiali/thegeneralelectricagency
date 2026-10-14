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
  };
};

const fromCompanyResponse = (quotation = {}) => {
  const company =
    quotation.company ??
    quotation.tally_company ??
    quotation.tallyCompany ??
    {};

  return {
    id:
      company._id ??
      company.id ??
      company.company_id ??
      company.companyId ??
      null,
    name:
      company.company_name ??
      company.companyName ??
      company.name ??
      quotation.company_name ??
      quotation.companyName ??
      "",
  };
};

const fromQuotationProductResponse = (item = {}) => {
  const product = item.product ?? item.tally_product ?? item.tallyProduct ?? {};

  return {
    lineId: item._id ?? item.id ?? null,
    productId:
      product._id ??
      product.id ??
      product.product_id ??
      product.productId ??
      null,
    product: product.name ?? product.product_name ?? product.productName ?? "",
    quantity: String(item.qty ?? item.quantity ?? ""),
    sellingPrice: String(
      item.unit_price ??
        item.unitPrice ??
        item.selling_price ??
        item.sellingPrice ??
        "",
    ),
    discount: String(item.discount ?? "0"),
    description: item.description ?? "",
    hsnCode:
      product.hsn_code ??
      product.hsnCode ??
      item.hsn_code ??
      item.hsnCode ??
      "",
  };
};

const fromQuotationResponse = (quotation = {}) => {
  const company = fromCompanyResponse(quotation);
  const quotationProducts =
    quotation.products ?? quotation.productInformation ?? [];
  const productInformation = _.map(
    quotationProducts,
    fromQuotationProductResponse,
  );
  const isUpdateAvailable = quotationProducts.every(
    (item) =>
      !_.isNil(item.product) ||
      !_.isNil(item.tally_product ?? item.tallyProduct),
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
    quotationNumber:
      quotation.quotation_ref_id ??
      quotation.quotationRefId ??
      quotation.quotation_number ??
      quotation.quotationNumber ??
      "",
    taxTreatment: quotation.tax_type ?? quotation.taxType ?? null,
    gstPercentage: String(
      quotation.gst ??
        quotation.gst_percentage ??
        quotation.gstPercentage ??
        "",
    ),
    deliveryNotes: quotation.delivery_notes ?? quotation.deliveryNotes ?? "",
    paymentNotes: quotation.payment_notes ?? quotation.paymentNotes ?? "",
    products: productInformation.map(({ productId, product }) => ({
      id: productId,
      name: product,
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
