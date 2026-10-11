import { ROLE_PATHS } from "@Enums";
import { createTallyCompaniesListApi, createTallyCompaniesMutationApi } from "@Tally/api/factories/tallyCompanies.factory";

export const tallyCompaniesApi = {
  ...createTallyCompaniesListApi(ROLE_PATHS.TECH_SUPPORT),
  ...createTallyCompaniesMutationApi(ROLE_PATHS.TECH_SUPPORT),
};
