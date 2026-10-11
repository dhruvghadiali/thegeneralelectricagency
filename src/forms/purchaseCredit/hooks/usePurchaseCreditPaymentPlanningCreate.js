import { useCallback } from "react";
import _ from "lodash";

import { createPurchaseCreditPaymentPlanningCreateValidationSchema } from "@Forms/purchaseCredit/purchaseCredit.validation.schema";
import { isPurchaseCreditPaymentAmountAllocated } from "@Forms/purchaseCredit/purchaseCreditForm.utils";

const CREATE_FIELDS = [
  "remindingDate",
  "amount",
  "paymentType",
  "isPaymentCompleted",
  "notes",
];

const planPath = (index, field) => `paymentPlanning[${index}].${field}`;

function createdPaymentPlanningId(response = {}) {
  const directPlan =
    (_.isObject(response.payment_planning) &&
    !_.isArray(response.payment_planning)
      ? response.payment_planning
      : null) ??
    response.paymentPlanning ??
    response.created_payment_planning ??
    response.createdPaymentPlanning ??
    response;
  const responsePlans =
    (_.isArray(response.payment_plannings) && response.payment_plannings) ||
    (_.isArray(response.payment_planning) && response.payment_planning) ||
    (_.isArray(response.paymentPlanning) && response.paymentPlanning) ||
    [];

  return (
    directPlan?._id ??
    directPlan?.id ??
    directPlan?.payment_planning_id ??
    directPlan?.paymentPlanningId ??
    _.last(responsePlans)?._id ??
    _.last(responsePlans)?.id ??
    null
  );
}

export function usePurchaseCreditPaymentPlanningCreate({
  formik,
  onCreatePaymentPlanning,
  persistedPurchaseAmount,
}) {
  const clearPlanningErrors = useCallback(
    (index) => {
      _.forEach(CREATE_FIELDS, (field) => {
        formik.setFieldError(planPath(index, field), undefined);
      });
    },
    [formik],
  );

  const setPlanningValidationErrors = useCallback(
    (index, error) => {
      _.forEach(CREATE_FIELDS, (field) => {
        formik.setFieldTouched(planPath(index, field), true, false);
      });
      _.forEach(error?.inner ?? [error], (validationError) => {
        if (!validationError?.path || !validationError?.message) return;

        formik.setFieldError(
          planPath(index, validationError.path),
          validationError.message,
        );
      });
    },
    [formik],
  );

  const saveNewPaymentPlanning = useCallback(
    async (plan, index) => {
      if (plan?.id || !onCreatePaymentPlanning) return false;

      clearPlanningErrors(index);
      const allocatedPaymentsTotal = _.sumBy(
        _.filter(formik.values.payments, (payment) =>
          isPurchaseCreditPaymentAmountAllocated(payment, {
            preferSavedStatus: true,
          }),
        ),
        ({ amount }) => {
          const numericAmount = _.toNumber(amount);
          return _.isFinite(numericAmount) ? numericAmount : 0;
        },
      );
      const savedPlanningTotal = _.sumBy(
        _.filter(
          formik.values.paymentPlanning,
          (plan) => plan.id && !plan.isPaymentCompleted,
        ),
        ({ amount }) => {
          const numericAmount = _.toNumber(amount);
          return _.isFinite(numericAmount) ? numericAmount : 0;
        },
      );
      const maximumAmount = _.max([
        0,
        persistedPurchaseAmount -
          allocatedPaymentsTotal -
          savedPlanningTotal,
      ]);
      const schema =
        createPurchaseCreditPaymentPlanningCreateValidationSchema({
          maximumAmount,
        });

      try {
        await schema.validate(plan, { abortEarly: false });
      } catch (error) {
        setPlanningValidationErrors(index, error);
        return false;
      }

      try {
        const response = await onCreatePaymentPlanning(index, plan);
        const paymentPlanningId = createdPaymentPlanningId(response);

        if (!paymentPlanningId) {
          formik.setStatus(
            "The payment plan was saved, but its identifier was not returned. Reopen the purchase credit before editing this plan.",
          );
          return false;
        }

        await formik.setFieldValue(
          planPath(index, "savedRemindingDate"),
          plan.remindingDate,
          false,
        );
        await formik.setFieldValue(
          planPath(index, "savedAmount"),
          plan.amount,
          false,
        );
        await formik.setFieldValue(
          planPath(index, "savedPaymentType"),
          plan.paymentType,
          false,
        );
        await formik.setFieldValue(
          planPath(index, "savedIsPaymentCompleted"),
          plan.isPaymentCompleted,
          false,
        );
        await formik.setFieldValue(
          planPath(index, "savedNotes"),
          plan.notes,
          false,
        );
        await formik.setFieldValue(
          planPath(index, "id"),
          paymentPlanningId,
          false,
        );
        clearPlanningErrors(index);
        return true;
      } catch {
        return false;
      }
    },
    [
      clearPlanningErrors,
      formik,
      onCreatePaymentPlanning,
      persistedPurchaseAmount,
      setPlanningValidationErrors,
    ],
  );

  return { saveNewPaymentPlanning };
}

export default usePurchaseCreditPaymentPlanningCreate;
