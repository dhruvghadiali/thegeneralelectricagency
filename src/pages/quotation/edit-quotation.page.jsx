import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import EditQuotation from "@screenComponent/quotations/edit";
import { quotationTableSelectors } from "@Redux/quotation/quotation.selector";
import { ROUTES } from "@routes/navigate";

function EditQuotationPage() {
  const { quotationId } = useParams();
  const quotations = useSelector(quotationTableSelectors.selectItems);
  const quotation = quotations.find(
    (item) => String(item.id) === String(quotationId),
  );

  if (!quotation?.isUpdateAvailable) {
    return <Navigate to={ROUTES.QUOTATIONS} replace />;
  }

  return <EditQuotation quotation={quotation} />;
}

export default EditQuotationPage;
