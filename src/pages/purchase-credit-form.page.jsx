import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PurchaseCreditForm from "@Forms/purchaseCredit/purchaseCreditForm";
import { toPurchaseCreditUpdatePayload } from "@Forms/purchaseCredit/purchaseCredit-api.payload";
import { createPurchaseCredit } from "@Redux/purchaseCredit/purchaseCredit.action";
import { selectPurchaseCreditCreateState } from "@Redux/purchaseCredit/purchaseCredit.selector";
import { purchaseCreditCreateCleared } from "@Redux/purchaseCredit/purchaseCredit.slice";

function PurchaseCreditFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isCreating, createError, createdPurchaseCredit } = useSelector(
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

    return dispatch(createPurchaseCredit(values)).unwrap();
  };

  return (
    <PurchaseCreditForm
      purchaseCredit={purchaseCredit}
      isEditing={isEditing}
      onSubmit={submitPurchaseCredit}
      onCancel={() => navigate("/purchase-credit")}
      isSubmitting={isCreating}
      submissionError={createError}
      submissionMessage={
        createdPurchaseCredit ? "Purchase credit added successfully." : null
      }
    />
  );
}

export default PurchaseCreditFormPage;
