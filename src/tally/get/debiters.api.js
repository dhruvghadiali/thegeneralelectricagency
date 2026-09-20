import debitersRequestXml from "@Tally/get/debiters.xml?raw";
import { postTallyXml } from "@Tally/api/tallyClient";
import { parseDebitersXml } from "@Tally/get/debiters.parser";

export async function getDebiters(config = {}) {
  const responseXml = await postTallyXml(debitersRequestXml, config);

  return parseDebitersXml(responseXml);
}
