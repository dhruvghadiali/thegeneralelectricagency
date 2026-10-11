import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPurchaseStandaloneStockCount } from "@Redux/purchase/purchase.action";
import { selectPurchaseStandaloneStockStates } from "@Redux/purchase/purchase.selector";
import { purchaseStandaloneStockCountsCleared } from "@Redux/purchase/purchase.slice";

const EMPTY_STOCK_STATE = Object.freeze({
  count: "",
  error: null,
  isLoading: false,
});

export function useStandaloneStockCounts() {
  const dispatch = useDispatch();
  const stockStateByProduct = useSelector(
    selectPurchaseStandaloneStockStates,
  );
  const requestsRef = useRef(new Map());

  const loadStandaloneStockCount = useCallback(
    async (productId) => {
      const key = String(productId);
      requestsRef.current.get(key)?.abort();

      const request = dispatch(fetchPurchaseStandaloneStockCount(key));
      requestsRef.current.set(key, request);

      try {
        const result = await request.unwrap();
        return result.totalStandaloneStocks;
      } catch {
        return undefined;
      } finally {
        if (requestsRef.current.get(key) === request) {
          requestsRef.current.delete(key);
        }
      }
    },
    [dispatch],
  );

  const resetStandaloneStockCounts = useCallback(() => {
    requestsRef.current.forEach((request) => request.abort());
    requestsRef.current.clear();
    dispatch(purchaseStandaloneStockCountsCleared());
  }, [dispatch]);

  const getStandaloneStockState = useCallback(
    (productId) =>
      stockStateByProduct[String(productId)] ?? EMPTY_STOCK_STATE,
    [stockStateByProduct],
  );

  useEffect(
    () => () => {
      requestsRef.current.forEach((request) => request.abort());
      requestsRef.current.clear();
    },
    [],
  );

  return {
    getStandaloneStockState,
    loadStandaloneStockCount,
    resetStandaloneStockCounts,
  };
}
