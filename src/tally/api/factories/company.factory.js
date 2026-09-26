import companyLedgersXml from "@Tally/api/get/companies.xml?raw";
import { sendTallyXml } from "@Tally/api/client.api";

export function createTallyCompanyApi() {
  return {
    getCompanyLedgers: (config = {}) =>
      sendTallyXml(companyLedgersXml, config),
  };
}
