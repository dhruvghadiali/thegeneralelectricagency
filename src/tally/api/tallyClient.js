import axios from "axios";

// TGES-Connector runs on the browser's computer and forwards XML to Tally:9000.
export const TALLY_BASE_URL = import.meta.env.VITE_TALLY_BASE_URL?.trim();

export async function postTallyXml(xml, config = {}) {
  if (!TALLY_BASE_URL) {
    throw new Error("Tally URL is not configured. Set VITE_TALLY_BASE_URL and restart or rebuild the app.");
  }
  const response = await axios.post(TALLY_BASE_URL, xml, {
    // Allow the connector's 30-second upstream timeout to return its error.
    timeout: 35000,
    ...config,
    withCredentials: false,
    headers: {
      "Content-Type": "text/xml; charset=UTF-8",
      ...config.headers,
    },
    responseType: "text",
  });

  return response.data;
}
