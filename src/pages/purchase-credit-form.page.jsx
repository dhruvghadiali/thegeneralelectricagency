import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "@routes/navigate";

import PurchaseCreditForm from "@Forms/purchaseCredit/purchaseCreditForm";
import {
  completePurchaseCreditPaymentPlanning,
  createPurchaseCredit,
  createPurchaseCreditPayment,
  createPurchaseCreditPaymentPlanning,
  updatePurchaseCredit,
  updatePurchaseCreditPayment,
  updatePurchaseCreditPaymentPlanning,
} from "@Redux/purchaseCredit/purchaseCredit.action";
import {
  selectPurchaseCreditCreateState,
  selectPurchaseCreditPaymentCreateState,
  selectPurchaseCreditPaymentPlanningCreateState,
  selectPurchaseCreditPaymentPlanningCompletionState,
  selectPurchaseCreditPaymentPlanningUpdateState,
  selectPurchaseCreditPaymentUpdateState,
  selectPurchaseCreditUpdateState,
} from "@Redux/purchaseCredit/purchaseCredit.selector";
import {
  filtersCleared,
  purchaseCreditCreateCleared,
  purchaseCreditPaymentCreateCleared,
  purchaseCreditPaymentPlanningCreateCleared,
  purchaseCreditPaymentPlanningCompletionCleared,
  purchaseCreditPaymentPlanningUpdateCleared,
  purchaseCreditPaymentUpdateCleared,
  purchaseCreditUpdateCleared,
} from "@Redux/purchaseCredit/purchaseCredit.slice";

function PurchaseCreditFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isCreating, createError } = useSelector(
    selectPurchaseCreditCreateState,
  );
  const { isUpdating, updateError } = useSelector(
    selectPurchaseCreditUpdateState,
  );
  const { updatingPaymentId, paymentUpdateError } = useSelector(
    selectPurchaseCreditPaymentUpdateState,
  );
  const { creatingPaymentIndex, paymentCreateError } = useSelector(
    selectPurchaseCreditPaymentCreateState,
  );
  const {
    creatingPaymentPlanningIndex,
    paymentPlanningCreateError,
  } = useSelector(selectPurchaseCreditPaymentPlanningCreateState);
  const {
    updatingPaymentPlanningId,
    paymentPlanningUpdateError,
  } = useSelector(selectPurchaseCreditPaymentPlanningUpdateState);
  const {
    completingPaymentPlanningId,
    paymentPlanningCompletionError,
  } = useSelector(selectPurchaseCreditPaymentPlanningCompletionState);
  const { purchaseCreditId } = useParams();
  const isEditing = Boolean(purchaseCreditId);
  const purchaseCredit = location.state?.purchaseCredit;

  useEffect(() => {
    dispatch(purchaseCreditCreateCleared());
    dispatch(purchaseCreditPaymentCreateCleared());
    dispatch(purchaseCreditPaymentPlanningCreateCleared());
    dispatch(purchaseCreditPaymentPlanningCompletionCleared());
    dispatch(purchaseCreditPaymentPlanningUpdateCleared());
    dispatch(purchaseCreditPaymentUpdateCleared());
    dispatch(purchaseCreditUpdateCleared());

    return () => {
      dispatch(purchaseCreditCreateCleared());
      dispatch(purchaseCreditPaymentCreateCleared());
      dispatch(purchaseCreditPaymentPlanningCreateCleared());
      dispatch(purchaseCreditPaymentPlanningCompletionCleared());
      dispatch(purchaseCreditPaymentPlanningUpdateCleared());
      dispatch(purchaseCreditPaymentUpdateCleared());
      dispatch(purchaseCreditUpdateCleared());
    };
  }, [dispatch]);

  const submitPurchaseCredit = async (values) => {
    if (isEditing) {
      const updatedPurchaseCredit = await dispatch(
        updatePurchaseCredit({ id: purchaseCreditId, values }),
      ).unwrap();

      dispatch(filtersCleared());
      navigate(ROUTES.PURCHASE_CREDITS, { replace: true });

      return updatedPurchaseCredit;
    }

    const createdPurchaseCredit = await dispatch(
      createPurchaseCredit(values),
    ).unwrap();

    // Return to the first, unfiltered, latest-first page so the list request
    // made on mount includes the record that was just created.
    dispatch(filtersCleared());
    navigate(ROUTES.PURCHASE_CREDITS, { replace: true });

    return createdPurchaseCredit;
  };

  const submitPaymentUpdate = (paymentId, values) =>
    dispatch(
      updatePurchaseCreditPayment({
        purchaseCreditId,
        paymentId,
        values,
      }),
    ).unwrap();

  const submitNewPayment = (paymentIndex, values) =>
    dispatch(
      createPurchaseCreditPayment({
        purchaseCreditId,
        paymentIndex,
        values,
      }),
    ).unwrap();

  const submitNewPaymentPlanning = (paymentPlanningIndex, values) =>
    dispatch(
      createPurchaseCreditPaymentPlanning({
        purchaseCreditId,
        paymentPlanningIndex,
        values,
      }),
    ).unwrap();

  const submitPaymentPlanningUpdate = (paymentPlanningId, values) =>
    dispatch(
      updatePurchaseCreditPaymentPlanning({
        purchaseCreditId,
        paymentPlanningId,
        values,
      }),
    ).unwrap();

  const submitPaymentPlanningCompletion = (
    paymentPlanningId,
    paymentPlanningValues,
    paymentValues,
  ) =>
    dispatch(
      completePurchaseCreditPaymentPlanning({
        purchaseCreditId,
        paymentPlanningId,
        paymentPlanningValues,
        paymentValues,
      }),
    ).unwrap();

  return (
    <PurchaseCreditForm
      purchaseCredit={purchaseCredit}
      isEditing={isEditing}
      onSubmit={submitPurchaseCredit}
      onCreatePayment={submitNewPayment}
      onCreatePaymentPlanning={submitNewPaymentPlanning}
      onUpdatePaymentPlanning={submitPaymentPlanningUpdate}
      onCompletePaymentPlanning={submitPaymentPlanningCompletion}
      onUpdatePayment={submitPaymentUpdate}
      onCancel={() => navigate(ROUTES.PURCHASE_CREDITS)}
      isSubmitting={isEditing ? isUpdating : isCreating}
      submissionError={isEditing ? updateError : createError}
      updatingPaymentId={updatingPaymentId}
      paymentUpdateError={paymentUpdateError}
      creatingPaymentIndex={creatingPaymentIndex}
      paymentCreateError={paymentCreateError}
      creatingPaymentPlanningIndex={creatingPaymentPlanningIndex}
      paymentPlanningCreateError={paymentPlanningCreateError}
      updatingPaymentPlanningId={updatingPaymentPlanningId}
      paymentPlanningUpdateError={paymentPlanningUpdateError}
      completingPaymentPlanningId={completingPaymentPlanningId}
      paymentPlanningCompletionError={paymentPlanningCompletionError}
    />
  );
}

export default PurchaseCreditFormPage;
