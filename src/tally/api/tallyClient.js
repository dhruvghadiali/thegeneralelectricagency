import axios from "axios";

// Requests go to the computer running the browser, including on the deployed site.
export const TALLY_BASE_URL = "http://localhost:9000";

export async function postTallyXml(xml, config = {}) {
  const response = await axios.post(TALLY_BASE_URL, xml, {
    timeout: 15000,
    ...config,
    headers: {
      "Content-Type": "text/xml; charset=UTF-8",
      ...config.headers,
    },
    responseType: "text",
  });

  return response.data;
}
