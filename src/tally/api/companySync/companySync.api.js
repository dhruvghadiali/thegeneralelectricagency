import { ROLE_PATHS } from "@Enums";
import {
  createTallyCompanySyncListApi,
  createTallyCompanySyncMutationApi,
} from "@Tally/api/factories/companySync.factory";

export const tallyCompanySyncApi = {
  ...createTallyCompanySyncListApi(ROLE_PATHS.TECH_SUPPORT),
  ...createTallyCompanySyncMutationApi(ROLE_PATHS.TECH_SUPPORT),
};
