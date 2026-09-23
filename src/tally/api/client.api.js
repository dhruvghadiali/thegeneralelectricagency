import axios from "axios";
import { convertTallyResponse } from "@Tally/api/response.converter";

// This URL points to the connector on the visitor's computer, not the Render server.
export const TALLY_BASE_URL =
  import.meta.env.VITE_TALLY_BASE_URL?.trim() || "http://localhost:9001/tally";

export const tallyClient = axios.create({
  timeout: 35000,
  responseType: "text",
  withCredentials: false,
});

export async function sendTallyXml(xml, config = {}) {
  if (typeof xml !== "string" || !xml.trim()) {
    throw new Error("A Tally XML request is required.");
  }

  try {
    const { data } = await tallyClient.post(TALLY_BASE_URL, xml, {
      ...config,
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        ...config.headers,
      },
    });

    return convertTallyResponse(data);
  } catch (error) {
    if (error.code === "ERR_CANCELED") {
      throw error;
    }

    if (error.response) {
      const message =
        typeof error.response.data === "string" && error.response.data.trim();
      throw new Error(
        message || `Tally request failed (HTTP ${error.response.status}).`,
        { cause: error },
      );
    }

    if (error.code === "ECONNABORTED") {
      throw new Error("The Tally request timed out.", { cause: error });
    }

    throw new Error(
      "Cannot reach the local Tally Connector. Check that it is running and allow local network access in your browser.",
      { cause: error },
    );
  }
}

export async function getTallyConnectorStatus(config = {}) {
  const healthUrl = new URL("/health", TALLY_BASE_URL);
  const { data } = await tallyClient.get(healthUrl.href, {
    timeout: 5000,
    responseType: "json",
    ...config,
  });

  return data;
}
