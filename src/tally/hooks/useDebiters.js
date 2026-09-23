import { useCallback, useEffect, useState } from "react";

import { getDebiters } from "@Tally/get/debiters.api";

function getErrorMessage(error) {
  if (error?.code === "ERR_NETWORK") {
    return "Cannot reach TGES-Connector at localhost:9001. Open TGES-Connector on this computer and allow local network access for this website in your browser.";
  }

  if (error?.response?.status === 502) {
    return "TGES-Connector is reachable, but it cannot read a response from Tally. Make sure Tally is available on localhost:9000 and the company is open.";
  }

  if (error?.code === "ECONNABORTED" || error?.response?.status === 504) {
    return "The Tally request timed out. Keep TGES-Connector running and make sure the company is open in Tally, then retry.";
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
