import axios from "axios";

export const TALLY_BASE_URL =
  import.meta.env.VITE_TALLY_BASE_URL || "http://localhost:9000";

export async function postTallyXml(xml, config = {}) {
  const response = await axios.post(TALLY_BASE_URL, xml, {
    ...config,
    headers: {
      "Content-Type": "text/xml; charset=UTF-8",
      ...config.headers,
    },
    responseType: "text",
  });

  return response.data;
}
