import { TABLE_DEFAULTS } from "@Enums";
import { TALLY_COMPANIES_TABLE_DEFAULTS } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.defaults";

export function fromTallyCompaniesResponse(response = {}, requested = {}) {
  const pagination = response.pagination ?? {};
  const limit = Number(pagination.limit) || requested.limit || TALLY_COMPANIES_TABLE_DEFAULTS.limit;
  const total = Number(pagination.total) || 0;

  return {
    items: response.tally_companies ?? [],
    pagination: {
      page: Number(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE,
      limit,
      total,
      totalPages: Number(pagination.total_pages) || Math.ceil(total / limit),
    },
  };
}
