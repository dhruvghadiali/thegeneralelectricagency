import _ from "lodash";

import { TABLE_DEFAULTS } from "@Enums";
import { QUOTATION_TABLE_DEFAULTS } from "@screenComponent/quotations/table/quotationTable.defaults";

const fromPersonResponse = (person = {}) => {
  if (_.isString(person)) {
    return { id: null, name: person };
  }

  return {
    id: person?._id ?? person?.id ?? null,
    name:
      person?.name ??
      [person?.first_name ?? person?.firstName, person?.last_name ?? person?.lastName]
        .filter(Boolean)
        .join(" "),
  };
};

const fromQuotationResponse = (quotation = {}) => ({
  id: quotation._id ?? quotation.id ?? null,
  companyName:
    quotation.company_name ??
    quotation.companyName ??
    quotation.company?.company_name ??
    quotation.company?.name ??
    "",
  quotationNumber:
    quotation.quotation_ref_id ??
    quotation.quotationRefId ??
    quotation.quotation_number ??
    quotation.quotationNumber ??
    "",
  createdBy: fromPersonResponse(quotation.created_by ?? quotation.createdBy),
  createdAt: quotation.created_at ?? quotation.createdAt ?? null,
  updatedBy: fromPersonResponse(quotation.updated_by ?? quotation.updatedBy),
  updatedAt: quotation.updated_at ?? quotation.updatedAt ?? null,
});

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
    Number(pagination.limit) ||
    requested.limit ||
    QUOTATION_TABLE_DEFAULTS.limit;
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
