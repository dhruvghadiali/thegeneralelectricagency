export function fromProductPaginationApiResponse(
  pagination = {},
  requested = {},
  defaults = {},
) {
  const page = Number(pagination.page) || requested.page || defaults.page || 1;
  const limit =
    Number(pagination.limit) || requested.limit || defaults.limit || 1;
  const total = Number(pagination.total) || 0;

  return {
    page,
    limit,
    total,
    totalPages:
      Number(pagination.total_pages ?? pagination.totalPages) ||
      Math.ceil(total / limit) ||
      0,
  };
}

export default fromProductPaginationApiResponse;
