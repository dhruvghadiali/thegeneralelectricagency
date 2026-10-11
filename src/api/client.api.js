import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  try {
    const stored = JSON.parse(localStorage.getItem("auth") ?? "null");

    if (stored?.token) {
      config.headers.Authorization = `Bearer ${stored.token}`;
    }
  } catch {
    // No stored session - request goes out unauthenticated.
  }

  return config;
});

/**
 * Every response from this API follows { status, message, data }: status is
 * the intended HTTP status (sometimes embedded in an HTTP 200 body), message
 * is a human-readable summary, and data is either the success payload or a
 * dynamic array of errors on failure.
 */
function unwrapEnvelope(rawBody, fallbackStatus) {
  const envelope = rawBody && typeof rawBody === "object" ? rawBody : {};

  return {
    status: envelope.status ?? fallbackStatus,
    message: envelope.message ?? "",
    data: envelope.data ?? null,
  };
}

apiClient.interceptors.response.use(
  (response) => {
    const envelope = unwrapEnvelope(response.data, response.status);

    if (envelope.status >= 400) {
      return Promise.reject(
        Object.assign(new Error(envelope.message || "Request failed."), envelope)
      );
    }

    return envelope;
  },
  (error) => {
    const envelope = unwrapEnvelope(error.response?.data, error.response?.status);
    const message = envelope.message || error.message || "Something went wrong. Please try again.";

    return Promise.reject(Object.assign(new Error(message), envelope));
  }
);

/**
 * Turns a rejected apiClient error into one display-ready string. The `data`
 * array on failure is dynamic (plain strings or { message } objects
 * depending on the endpoint), so both shapes are handled here.
 */
export function extractErrorMessage(error) {
  if (Array.isArray(error?.data) && error.data.length > 0) {
    const messages = error.data
      .map((item) => (typeof item === "string" ? item : item?.message))
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return error?.message || "Something went wrong. Please try again.";
}

export default apiClient;
