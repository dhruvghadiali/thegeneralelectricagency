import { useCallback, useEffect, useState } from "react";

import { getDebiters } from "@Tally/get/debiters.api";

function getErrorMessage(error) {
  if (error?.code === "ERR_NETWORK") {
    return "Cannot access Tally at localhost:9000. Make sure Tally is available on this computer and allow local network access in your browser. Tally must also allow this website's requests through CORS.";
  }

  if (error?.code === "ECONNABORTED" || [502, 504].includes(error?.response?.status)) {
    return "The Tally connection failed or timed out. Make sure Tally is open on this computer with its HTTP server enabled on port 9000, then retry.";
  }

  return error?.message || "Unable to load ledgers from Tally.";
}

export function useDebiters() {
  const [debiters, setDebiters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);

  const refresh = useCallback(() => {
    setRequestVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDebiters() {
      setIsLoading(true);
      setError("");

      try {
        const records = await getDebiters({ signal: controller.signal });
        setDebiters(records);
      } catch (requestError) {
        if (requestError?.code !== "ERR_CANCELED") {
          setError(getErrorMessage(requestError));
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadDebiters();

    return () => controller.abort();
  }, [requestVersion]);

  return { debiters, error, isLoading, refresh };
}
