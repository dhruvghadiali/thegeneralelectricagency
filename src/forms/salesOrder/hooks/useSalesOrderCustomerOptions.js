import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSalesOrderCustomers } from "@Redux/salesOrder/salesOrder.action";
import { selectSalesOrderCustomerOptionsState } from "@Redux/salesOrder/salesOrder.selector";

const SEARCH_DELAY_MS = 350;

export function useSalesOrderCustomerOptions(query) {
  const dispatch = useDispatch();
  const state = useSelector(selectSalesOrderCustomerOptionsState);

  useEffect(() => {
    let request;
    const timeout = window.setTimeout(() => {
      request = dispatch(fetchSalesOrderCustomers(query));
    }, SEARCH_DELAY_MS);

    return () => {
      window.clearTimeout(timeout);
      request?.abort();
    };
  }, [dispatch, query]);

  return state;
}
