import { fromLocalTallyCompany } from "@Tally/redux/syncCompanies/syncCompanies.api-payload";

function identity(id, code) {
  const parts = [id, code].map((value) => String(value ?? "").trim());
  return parts.some(Boolean) ? JSON.stringify(parts) : null;
}

export function findNewCompanies(tallyCompanies, systemCompanies) {
  const systemKeys = new Set(systemCompanies.map((company) => identity(company.company_id, company.company_code)).filter(Boolean));
  return tallyCompanies
    .filter((company) => !systemKeys.has(identity(company.guid, company.masterId)))
    .map((company) => ({
      _id: identity(company.guid, company.masterId) || company.name,
      ...fromLocalTallyCompany(company),
    }));
}
