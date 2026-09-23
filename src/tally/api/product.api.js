import stockItemsXml from "@Tally/api/get/products.xml?raw";
import { sendTallyXml } from "@Tally/api/client.api";

export function getStockItems(config = {}) {
  return sendTallyXml(stockItemsXml, config);
}
