import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSalesOrderProducts } from "@Redux/salesOrder/salesOrder.action";
import { selectSalesOrderProductOptionsState } from "@Redux/salesOrder/salesOrder.selector";
import { salesOrderProductsCleared } from "@Redux/salesOrder/salesOrder.slice";

export function useSalesOrderProductOptions(supplierId) {
  const dispatch = useDispatch();
  const state = useSelector(selectSalesOrderProductOptionsState);

  useEffect(() => {
    if (!supplierId) {
      dispatch(salesOrderProductsCleared());
      return undefined;
    }

    const request = dispatch(fetchSalesOrderProducts(supplierId));
    return () => request.abort();
  }, [dispatch, supplierId]);

  return state;
}
