import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSalesOrderCompanies } from "@Redux/salesOrder/salesOrder.action";
import { selectSalesOrderCompanyOptionsState } from "@Redux/salesOrder/salesOrder.selector";

export function useSalesOrderCompanyOptions() {
  const dispatch = useDispatch();
  const state = useSelector(selectSalesOrderCompanyOptionsState);

  useEffect(() => {
    const request = dispatch(fetchSalesOrderCompanies());

    return () => request.abort();
  }, [dispatch]);

  return state;
}
