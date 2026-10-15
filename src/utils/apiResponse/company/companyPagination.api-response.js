import _ from "lodash";

export function fromCompanyPaginationApiResponse(
  pagination = {},
  requested = {},
  defaults = {},
) {
  const page = _.toNumber(pagination.page) || requested.page || defaults.page || 1;
  const limit =
    _.toNumber(pagination.limit) || requested.limit || defaults.limit || 1;
  const total = _.toNumber(pagination.total) || 0;

  return {
    page,
    limit,
    total,
    totalPages:
      _.toNumber(pagination.total_pages ?? pagination.totalPages) ||
      Math.ceil(total / limit) ||
      0,
  };
}

export default fromCompanyPaginationApiResponse;
