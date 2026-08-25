import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import PurchaseCreditForm from "@Forms/purchaseCredit/purchaseCreditForm";
import {
  toPurchaseCreditCreatePayload,
  toPurchaseCreditUpdatePayload,
} from "@Forms/purchaseCredit/purchaseCredit-api.payload";

function PurchaseCreditFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { purchaseCreditId } = useParams();
  const [preparedPayload, setPreparedPayload] = useState(null);
  const isEditing = Boolean(purchaseCreditId);
  const purchaseCredit = location.state?.purchaseCredit;

  const preparePurchaseCreditPayload = async (values) => {
    const payload = isEditing
      ? toPurchaseCreditUpdatePayload(values)
      : toPurchaseCreditCreatePayload(values);

    setPreparedPayload(payload);
    return payload;
  };

  return (
    <PurchaseCreditForm
      purchaseCredit={purchaseCredit}
      isEditing={isEditing}
      onSubmit={preparePurchaseCreditPayload}
      onCancel={() => navigate("/purchase-credit")}
      submissionMessage={
        preparedPayload
          ? `${isEditing ? "Update" : "Create"} payload validated and ready for backend integration.`
          : null
      }
    />
  );
}

export default PurchaseCreditFormPage;
