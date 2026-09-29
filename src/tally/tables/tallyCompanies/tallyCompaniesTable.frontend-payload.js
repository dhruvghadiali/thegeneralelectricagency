import { TALLY_COMPANIES_TABLE_DEFAULTS } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.defaults";

export function fromTallyCompaniesResponse(response = {}) {
  const items = response.tally_companies ?? [];
  const limit = TALLY_COMPANIES_TABLE_DEFAULTS.limit;
  return {
    items,
    pagination: { page: 1, limit, total: items.length, totalPages: Math.ceil(items.length / limit) },
  };
}
