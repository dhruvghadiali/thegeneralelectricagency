import { useCallback, useEffect, useState } from "react";

import { getDebiters } from "@Tally/get/debiters.api";

function getErrorMessage(error) {
  if (error?.code === "ERR_NETWORK") {
    return "Could not connect to Tally at localhost:9000. Make sure Tally is open and its HTTP server is enabled.";
  }

  return error?.message || "Unable to load debiters from Tally.";
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
