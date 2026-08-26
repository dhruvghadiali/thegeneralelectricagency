import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PurchaseCreditForm from "@Forms/purchaseCredit/purchaseCreditForm";
import { createPurchaseCredit } from "@Redux/purchaseCredit/purchaseCredit.action";
import { selectPurchaseCreditCreateState } from "@Redux/purchaseCredit/purchaseCredit.selector";
import { toPurchaseCreditUpdatePayload } from "@Forms/purchaseCredit/purchaseCredit-api.payload";
import {
  filtersCleared,
  purchaseCreditCreateCleared,
} from "@Redux/purchaseCredit/purchaseCredit.slice";

function PurchaseCreditFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isCreating, createError } = useSelector(
    selectPurchaseCreditCreateState,
  );
  const { purchaseCreditId } = useParams();
  const isEditing = Boolean(purchaseCreditId);
  const purchaseCredit = location.state?.purchaseCredit;

  useEffect(() => {
    dispatch(purchaseCreditCreateCleared());

    return () => dispatch(purchaseCreditCreateCleared());
  }, [dispatch]);

  const submitPurchaseCredit = async (values) => {
    if (isEditing) {
      return toPurchaseCreditUpdatePayload(values);
    }

    const createdPurchaseCredit = await dispatch(
      createPurchaseCredit(values),
    ).unwrap();

    // Return to the first, unfiltered, latest-first page so the list request
    // made on mount includes the record that was just created.
    dispatch(filtersCleared());
    navigate("/purchase-credit", { replace: true });

    return createdPurchaseCredit;
  };

  return (
    <PurchaseCreditForm
      purchaseCredit={purchaseCredit}
      isEditing={isEditing}
      onSubmit={submitPurchaseCredit}
      onCancel={() => navigate("/purchase-credit")}
      isSubmitting={isCreating}
      submissionError={createError}
    />
  );
}

export default PurchaseCreditFormPage;
