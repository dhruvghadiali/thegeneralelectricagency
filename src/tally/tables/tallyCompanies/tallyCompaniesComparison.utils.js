import { fromLocalTallyCompany } from "@Tally/tables/tallyCompanies/tallyCompaniesCreate.api-payload";

function identity(id, code) {
  const parts = [id, code].map((value) => String(value ?? "").trim());
  return parts.some(Boolean) ? JSON.stringify(parts) : null;
}

export function compareTallyCompanies(systemCompanies, tallyCompanies) {
  const systemKeys = new Set(systemCompanies.map((company) => identity(company.company_id, company.company_code)).filter(Boolean));
  const tallyKeys = new Set(tallyCompanies.map((company) => identity(company.guid, company.masterId)).filter(Boolean));
  return {
    newRecords: tallyCompanies
      .filter((company) => !systemKeys.has(identity(company.guid, company.masterId)))
      .map((company) => ({
        _id: identity(company.guid, company.masterId) || company.name,
        ...fromLocalTallyCompany(company),
      })),
    deletedRecords: systemCompanies.filter((company) => !tallyKeys.has(identity(company.company_id, company.company_code))),
  };
}
