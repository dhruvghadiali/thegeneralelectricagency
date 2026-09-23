import companyLedgersXml from "@Tally/api/get/companies.xml?raw";
import { sendTallyXml } from "@Tally/api/client.api";

export function getCompanyLedgers(config = {}) {
  return sendTallyXml(companyLedgersXml, config);
}
