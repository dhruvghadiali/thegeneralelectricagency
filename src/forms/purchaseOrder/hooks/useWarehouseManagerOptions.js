import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPurchaseWarehouseManagers } from "@Redux/purchase/purchase.action";
import { selectPurchaseWarehouseManagerOptionsState } from "@Redux/purchase/purchase.selector";

export function useWarehouseManagerOptions() {
  const dispatch = useDispatch();
  const state = useSelector(selectPurchaseWarehouseManagerOptionsState);

  useEffect(() => {
    const request = dispatch(fetchPurchaseWarehouseManagers());
    return () => request.abort();
  }, [dispatch]);

  return state;
}
