import { ROLE_PATHS } from "@Enums";
import { createTallyCompaniesListApi } from "@Tally/api/factories/tallyCompanies.factory";

export const tallyCompaniesApi = createTallyCompaniesListApi(ROLE_PATHS.TECH_SUPPORT);
