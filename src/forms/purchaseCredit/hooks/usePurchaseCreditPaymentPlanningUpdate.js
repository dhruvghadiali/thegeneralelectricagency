import { useCallback } from "react";
import _ from "lodash";

import { createPurchaseCreditPaymentPlanningUpdateValidationSchema } from "@Forms/purchaseCredit/purchaseCredit.validation.schema";
import { isPurchaseCreditPaymentAmountAllocated } from "@Forms/purchaseCredit/purchaseCreditForm.utils";

const UPDATE_FIELDS = [
  "remindingDate",
  "amount",
  "paymentType",
  "isPaymentCompleted",
  "notes",
];

const planPath = (index, field) => `paymentPlanning[${index}].${field}`;

export function usePurchaseCreditPaymentPlanningUpdate({
  formik,
  onUpdatePaymentPlanning,
  persistedPurchaseAmount,
}) {
  const clearPlanningErrors = useCallback(
    (index) => {
      _.forEach(UPDATE_FIELDS, (field) => {
        formik.setFieldError(planPath(index, field), undefined);
      });
    },
    [formik],
  );

  const setPlanningValidationErrors = useCallback(
    (index, error) => {
      _.forEach(UPDATE_FIELDS, (field) => {
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

  const savePaymentPlanning = useCallback(
    async (plan, index) => {
      if (!plan?.id || !onUpdatePaymentPlanning) return false;

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
      const otherPlanningTotal = _.sumBy(
        formik.values.paymentPlanning,
        (otherPlan) => {
          if (
            otherPlan.id === plan.id ||
            otherPlan.isPaymentCompleted
          ) {
            return 0;
          }

          const numericAmount = _.toNumber(otherPlan.amount);
          return _.isFinite(numericAmount) ? numericAmount : 0;
        },
      );
      const maximumAmount = _.max([
        0,
        persistedPurchaseAmount -
          allocatedPaymentsTotal -
          otherPlanningTotal,
      ]);
      const schema =
        createPurchaseCreditPaymentPlanningUpdateValidationSchema({
          maximumAmount,
        });

      try {
        await schema.validate(plan, { abortEarly: false });
      } catch (error) {
        setPlanningValidationErrors(index, error);
        return false;
      }

      try {
        await onUpdatePaymentPlanning(plan.id, plan);
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
        clearPlanningErrors(index);
        return true;
      } catch {
        return false;
      }
    },
    [
      clearPlanningErrors,
      formik,
      onUpdatePaymentPlanning,
      persistedPurchaseAmount,
      setPlanningValidationErrors,
    ],
  );

  return { savePaymentPlanning };
}

export default usePurchaseCreditPaymentPlanningUpdate;
