import { useCallback } from "react";
import _ from "lodash";

import { PURCHASE_CREDIT_PAYMENT_STATUSES } from "@Enums";
import {
  createPurchaseCreditPaymentCreateValidationSchema,
  createPurchaseCreditPaymentUpdateValidationSchema,
} from "@Forms/purchaseCredit/purchaseCredit.validation.schema";
import {
  getPurchaseCreditCreatedPaymentId,
  isPurchaseCreditPaymentAmountAllocated,
} from "@Forms/purchaseCredit/purchaseCreditForm.utils";

const UPDATE_FIELDS = ["paymentStatus", "receivedPaymentDate", "notes"];
const CREATE_FIELDS = [
  "paymentStatus",
  "amount",
  "paymentType",
  "referenceId",
  "paymentDate",
  "notes",
  "paymentReceipts",
];

const paymentPath = (index, field) => `payments[${index}].${field}`;
export function usePurchaseCreditPaymentUpdate({
  formik,
  onCreatePayment,
  onUpdatePayment,
  persistedPurchaseAmount,
  persistedPaymentPlanningAmount,
}) {
  const clearPaymentErrors = useCallback(
    (index, fields = UPDATE_FIELDS) => {
      _.forEach(fields, (field) => {
        formik.setFieldError(paymentPath(index, field), undefined);
      });
    },
    [formik],
  );

  const setPaymentValidationErrors = useCallback(
    (index, fields, error) => {
      _.forEach(fields, (field) => {
        formik.setFieldTouched(paymentPath(index, field), true, false);
      });
      _.forEach(error?.inner ?? [error], (validationError) => {
        if (!validationError?.path || !validationError?.message) return;

        formik.setFieldError(
          paymentPath(index, validationError.path),
          validationError.message,
        );
      });
    },
    [formik],
  );

  const changePaymentStatus = useCallback(
    (index, paymentStatus) => {
      clearPaymentErrors(index);
      const payment = formik.values.payments[index];
      formik.setFieldTouched(
        paymentPath(index, "paymentStatus"),
        true,
        false,
      );
      formik.setFieldValue(
        paymentPath(index, "paymentStatus"),
        paymentStatus,
        false,
      );

      if (paymentStatus === payment.savedPaymentStatus) {
        formik.setFieldValue(
          paymentPath(index, "receivedPaymentDate"),
          payment.savedReceivedPaymentDate,
          false,
        );
        formik.setFieldValue(
          paymentPath(index, "notes"),
          payment.savedNotes,
          false,
        );
        return;
      }

      if (paymentStatus !== PURCHASE_CREDIT_PAYMENT_STATUSES.PAID) {
        formik.setFieldValue(
          paymentPath(index, "receivedPaymentDate"),
          "",
          false,
        );
      }
    },
    [clearPaymentErrors, formik],
  );

  const savePayment = useCallback(
    async (payment, index) => {
      if (!payment?.id || !onUpdatePayment) return false;

      clearPaymentErrors(index);
      const schema = createPurchaseCreditPaymentUpdateValidationSchema({
        currentStatus: payment.savedPaymentStatus,
      });

      try {
        await schema.validate(payment, { abortEarly: false });
      } catch (error) {
        setPaymentValidationErrors(index, UPDATE_FIELDS, error);
        return false;
      }

      try {
        await onUpdatePayment(payment.id, payment);
        await formik.setFieldValue(
          paymentPath(index, "savedPaymentStatus"),
          payment.paymentStatus,
          false,
        );
        await formik.setFieldValue(
          paymentPath(index, "savedReceivedPaymentDate"),
          payment.receivedPaymentDate,
          false,
        );
        await formik.setFieldValue(
          paymentPath(index, "savedNotes"),
          payment.notes,
          false,
        );
        clearPaymentErrors(index);
        return true;
      } catch {
        return false;
      }
    },
    [
      clearPaymentErrors,
      formik,
      onUpdatePayment,
      setPaymentValidationErrors,
    ],
  );

  const saveNewPayment = useCallback(
    async (payment, index) => {
      if (payment?.id || !onCreatePayment) return false;

      clearPaymentErrors(index, CREATE_FIELDS);
      const savedPaymentsTotal = _.sumBy(
        _.filter(
          formik.values.payments,
          (savedPayment) =>
            savedPayment.id &&
            isPurchaseCreditPaymentAmountAllocated(savedPayment, {
              preferSavedStatus: true,
            }),
        ),
        ({ amount }) => {
          const numericAmount = _.toNumber(amount);
          return _.isFinite(numericAmount) ? numericAmount : 0;
        },
      );
      const maximumAmount = _.max([
        0,
        persistedPurchaseAmount -
          savedPaymentsTotal -
          persistedPaymentPlanningAmount,
      ]);
      const schema = createPurchaseCreditPaymentCreateValidationSchema({
        purchaseCreditAt: formik.values.purchaseCreditAt,
        maximumAmount,
      });

      try {
        await schema.validate(payment, { abortEarly: false });
      } catch (error) {
        setPaymentValidationErrors(index, CREATE_FIELDS, error);
        return false;
      }

      try {
        const response = await onCreatePayment(index, payment);
        const paymentId = getPurchaseCreditCreatedPaymentId(response);

        if (!paymentId) {
          formik.setStatus(
            "The payment was saved, but its identifier was not returned. Reopen the purchase credit before editing this payment.",
          );
          return false;
        }

        await formik.setFieldValue(
          paymentPath(index, "id"),
          paymentId,
          false,
        );
        await formik.setFieldValue(
          paymentPath(index, "savedPaymentStatus"),
          PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS,
          false,
        );
        await formik.setFieldValue(
          paymentPath(index, "savedReceivedPaymentDate"),
          "",
          false,
        );
        await formik.setFieldValue(
          paymentPath(index, "savedNotes"),
          payment.notes,
          false,
        );
        clearPaymentErrors(index, CREATE_FIELDS);
        return true;
      } catch {
        return false;
      }
    },
    [
      clearPaymentErrors,
      formik,
      onCreatePayment,
      persistedPaymentPlanningAmount,
      persistedPurchaseAmount,
      setPaymentValidationErrors,
    ],
  );

  return { changePaymentStatus, saveNewPayment, savePayment };
}

export default usePurchaseCreditPaymentUpdate;
