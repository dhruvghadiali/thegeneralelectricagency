import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { fetchQuotationDetails } from "@Redux/quotation/quotation.action";
import { QUOTATION_TABLE_COLUMNS } from "@screenComponent/quotations/table";
import { quotationTableSelectors } from "@Redux/quotation/quotation.selector";

import ViewQuotationInformation from "@screenComponent/quotations/viewQuotationInformation";

function ViewQuotationPage() {
  const { quotationId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const requestedRef = useRef(false);
  const quotations = useSelector(quotationTableSelectors.selectItems);
  const { isLoading, error } = useSelector(
    quotationTableSelectors.selectStatus,
  );
  const routedQuotation = location.state?.quotation;
  const getQuotationKey = (item) => item?.id ?? item?.quotationNumber;
  const quotation =
    (String(getQuotationKey(routedQuotation)) === String(quotationId)
      ? routedQuotation
      : null) ??
    quotations.find(
      (item) => String(getQuotationKey(item)) === String(quotationId),
    );

  useEffect(() => {
    if (quotation || isLoading || requestedRef.current) return;

    requestedRef.current = true;
    dispatch(fetchQuotationDetails(QUOTATION_TABLE_COLUMNS));
  }, [dispatch, isLoading, quotation]);

  return (
    <ViewQuotationInformation
      quotation={quotation}
      isLoading={!quotation && (isLoading || !requestedRef.current)}
      error={error}
    />
  );
}

export default ViewQuotationPage;
