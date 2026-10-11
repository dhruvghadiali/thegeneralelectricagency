import _ from "lodash";
import moment from "moment";
import * as Yup from "yup";

import {
  PURCHASE_CREDIT_PAYMENT_STATUSES,
  PURCHASE_CREDIT_PAYMENT_STATUS_TRANSITIONS,
  PURCHASE_CREDIT_PAYMENT_TYPES,
} from "@Enums";
import {
  PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MAX_LENGTH,
  PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MIN_LENGTH,
  PURCHASE_CREDIT_AMOUNT_MAX,
  PURCHASE_CREDIT_AMOUNT_MIN,
  PURCHASE_CREDIT_NOTES_MAX_LENGTH,
  PURCHASE_CREDIT_NOTES_MIN_LENGTH,
  PURCHASE_CREDIT_REFERENCE_ID_MAX_LENGTH,
  PURCHASE_CREDIT_REFERENCE_ID_MIN_LENGTH,
  PURCHASE_CREDIT_STOCK_MAX,
  PURCHASE_CREDIT_STOCK_MIN,
  PURCHASE_CREDIT_SUPPORTED_PAYMENT_STATUSES,
  PURCHASE_CREDIT_SUPPORTED_PAYMENT_TYPES,
} from "@Forms/purchaseCredit/purchaseCredit.validation.constants";
import { PURCHASE_CREDIT_VALIDATION_MESSAGES as MESSAGES } from "@Forms/purchaseCredit/purchaseCredit.validation.messages";
import { isPurchaseCreditPaymentAmountAllocated } from "@Forms/purchaseCredit/purchaseCreditForm.utils";

const emptyToUndefined = (value, originalValue) =>
  originalValue === "" || originalValue === null ? undefined : value;

const optionalText = (min, max, minMessage, maxMessage) =>
  Yup.string()
    .trim()
    .transform((value) => value || undefined)
    .min(min, minMessage)
    .max(max, maxMessage)
    .optional();

const requiredAmount = Yup.number()
  .transform(emptyToUndefined)
  .typeError(MESSAGES.PAYMENT_AMOUNT_NUMBER)
  .min(PURCHASE_CREDIT_AMOUNT_MIN, MESSAGES.PAYMENT_AMOUNT_MIN)
  .max(PURCHASE_CREDIT_AMOUNT_MAX, MESSAGES.PAYMENT_AMOUNT_MAX)
  .required(MESSAGES.PAYMENT_AMOUNT_REQUIRED);

const referenceIdSchema = Yup.string()
  .trim()
  .transform((value) => value || undefined)
  .when("paymentType", {
    is: (paymentType) =>
      Boolean(paymentType) &&
      paymentType !== PURCHASE_CREDIT_PAYMENT_TYPES.CASH,
    then: (schema) =>
      schema
        .min(PURCHASE_CREDIT_REFERENCE_ID_MIN_LENGTH, MESSAGES.REFERENCE_ID_MIN)
        .max(PURCHASE_CREDIT_REFERENCE_ID_MAX_LENGTH, MESSAGES.REFERENCE_ID_MAX)
        .required(MESSAGES.REFERENCE_ID_REQUIRED),
    otherwise: (schema) => schema.optional(),
  });

const dateIsTodayOrEarlier = (value) => {
  if (!value) return true;
  const parsed = moment(value);
  return parsed.isValid() && parsed.isSameOrBefore(moment(), "day");
};

const dateIsTodayOrLater = (value) => {
  if (!value) return true;
  const parsed = moment(value);
  return parsed.isValid() && parsed.isSameOrAfter(moment(), "day");
};

const pastOrTodayDate = (invalid, future, required = null) => {
  const schema = Yup.date()
    .transform(emptyToUndefined)
    .typeError(invalid)
    .test("not-in-future", future, dateIsTodayOrEarlier);

  return required ? schema.required(required) : schema.optional();
};

const todayOrFutureDate = (invalid, past, required = null) => {
  const schema = Yup.date()
    .transform(emptyToUndefined)
    .typeError(invalid)
    .test("not-in-past", past, dateIsTodayOrLater);

  return required ? schema.required(required) : schema.optional();
};

const updateRemindingDateSchema = Yup.date()
  .transform(emptyToUndefined)
  .typeError(MESSAGES.REMINDING_DATE_INVALID)
  .test(
    "not-in-past-unless-unchanged",
    MESSAGES.REMINDING_DATE_PAST,
    function remindingDateIsValidForUpdate(value) {
      if (!value) return true;

      const remindingDate = moment(value);
      const savedRemindingDate = moment(this.parent?.savedRemindingDate);

      if (
        remindingDate.isValid() &&
        savedRemindingDate.isValid() &&
        remindingDate.isSame(savedRemindingDate, "day")
      ) {
        return true;
      }

      return (
        remindingDate.isValid() &&
        remindingDate.isSameOrAfter(moment(), "day")
      );
    },
  )
  .optional();

const settlementDateSchema = ({ required = false } = {}) =>
  pastOrTodayDate(
    MESSAGES.RECEIVED_PAYMENT_DATE_INVALID,
    MESSAGES.RECEIVED_PAYMENT_DATE_FUTURE,
    required ? MESSAGES.RECEIVED_PAYMENT_DATE_REQUIRED : null,
  ).test(
    "on-or-after-payment-date",
    MESSAGES.RECEIVED_PAYMENT_DATE_BEFORE_PAYMENT_DATE,
    function settlementDateIsOnOrAfterPaymentDate(value) {
      const paymentDate = moment(this.parent?.paymentDate);
      const settlementDate = moment(value);

      if (
        !value ||
        !this.parent?.paymentDate ||
        !paymentDate.isValid() ||
        !settlementDate.isValid()
      ) {
        return true;
      }

      return settlementDate.isSameOrAfter(paymentDate, "day");
    },
  );

const notesSchema = optionalText(
  PURCHASE_CREDIT_NOTES_MIN_LENGTH,
  PURCHASE_CREDIT_NOTES_MAX_LENGTH,
  MESSAGES.NOTES_MIN,
  MESSAGES.NOTES_MAX,
);

const filesSchema = Yup.array().of(Yup.mixed()).default([]);

const parseDate = (value) => (value ? moment(value) : moment.invalid());

function paymentsAreOnOrAfterPurchaseCredit(payments = []) {
  const purchaseCreditAt = parseDate(this.parent?.purchaseCreditAt);

  if (!purchaseCreditAt.isValid()) return true;

  const invalidPaymentIndex = _.findIndex(payments, (payment) => {
    const paymentDate = parseDate(payment?.paymentDate);
    return (
      paymentDate.isValid() && paymentDate.isBefore(purchaseCreditAt, "day")
    );
  });

  if (invalidPaymentIndex === -1) return true;

  return this.createError({
    path: `${this.path}[${invalidPaymentIndex}].paymentDate`,
    message: MESSAGES.PAYMENT_DATE_ON_OR_AFTER_PURCHASE_CREDIT,
  });
}

const sumAmounts = (items = []) =>
  _.sumBy(items, (item) => {
    const amount = _.toNumber(item?.amount);
    return _.isFinite(amount) ? amount : 0;
  });

function paymentAmountsAreWithinPurchaseCredit(values = {}) {
  const purchaseCreditAmount = _.toNumber(values.purchaseCreditAmount);

  if (!_.isFinite(purchaseCreditAmount)) return true;

  const payments = values.payments ?? [];
  const validationErrors = [];
  let cumulativeAmount = 0;

  _.forEach(payments, (payment, index) => {
    if (!isPurchaseCreditPaymentAmountAllocated(payment)) return;

    const paymentAmount = _.toNumber(payment?.amount);
    if (!_.isFinite(paymentAmount)) return;

    cumulativeAmount += paymentAmount;

    if (paymentAmount > purchaseCreditAmount) {
      validationErrors.push(
        this.createError({
          path: `payments[${index}].amount`,
          message: MESSAGES.PAYMENT_AMOUNT_EXCEEDS_PURCHASE_CREDIT,
        }),
      );
      return;
    }

    if (cumulativeAmount > purchaseCreditAmount) {
      validationErrors.push(
        this.createError({
          path: `payments[${index}].amount`,
          message: MESSAGES.TOTAL_PAYMENT_AMOUNT_EXCEEDS_PURCHASE_CREDIT,
        }),
      );
    }
  });

  return validationErrors.length
    ? new Yup.ValidationError(validationErrors)
    : true;
}

function paymentPlanningIsWithinAvailableCredit(values = {}) {
  const purchaseCreditAmount = _.toNumber(values.purchaseCreditAmount);

  if (!_.isFinite(purchaseCreditAmount)) return true;

  const validationErrors = [];
  const allocatedPayments = _.filter(values.payments, (payment) =>
    isPurchaseCreditPaymentAmountAllocated(payment),
  );
  let allocatedAmount = sumAmounts(allocatedPayments);

  _.forEach(values.paymentPlanning ?? [], (plan, index) => {
    if (plan?.isPaymentCompleted) return;

    const planAmount = _.toNumber(plan?.amount);
    if (!_.isFinite(planAmount)) return;

    allocatedAmount += planAmount;

    if (planAmount > purchaseCreditAmount) {
      validationErrors.push(
        this.createError({
          path: `paymentPlanning[${index}].amount`,
          message: MESSAGES.PAYMENT_PLAN_AMOUNT_EXCEEDS_PURCHASE_CREDIT,
        }),
      );
      return;
    }

    if (allocatedAmount > purchaseCreditAmount) {
      validationErrors.push(
        this.createError({
          path: `paymentPlanning[${index}].amount`,
          message: MESSAGES.PAYMENT_ALLOCATION_EXCEEDS_PURCHASE_CREDIT,
        }),
      );
    }
  });

  return validationErrors.length
    ? new Yup.ValidationError(validationErrors)
    : true;
}

export const createPurchaseCreditPaymentUpdateValidationSchema = ({
  currentStatus,
} = {}) => {
  const allowedStatuses =
    PURCHASE_CREDIT_PAYMENT_STATUS_TRANSITIONS[currentStatus] ?? [];

  return Yup.object({
    paymentStatus: Yup.string()
      .oneOf(
        _.uniq([currentStatus, ...allowedStatuses]),
        MESSAGES.PAYMENT_STATUS_TRANSITION_INVALID,
      )
      .required(MESSAGES.PAYMENT_STATUS_REQUIRED),
    receivedPaymentDate: Yup.mixed().when("paymentStatus", {
      is: PURCHASE_CREDIT_PAYMENT_STATUSES.PAID,
      then: () => settlementDateSchema({ required: true }),
      otherwise: (schema) => schema.optional(),
    }),
    notes: notesSchema.when("paymentStatus", {
      is: PURCHASE_CREDIT_PAYMENT_STATUSES.REFUND,
      then: (schema) => schema.required(MESSAGES.REFUND_NOTES_REQUIRED),
      otherwise: (schema) => schema.optional(),
    }),
  });
};

export const createPurchaseCreditPaymentCreateValidationSchema = ({
  purchaseCreditAt,
  maximumAmount = PURCHASE_CREDIT_AMOUNT_MAX,
} = {}) =>
  Yup.object({
    paymentStatus: Yup.string()
      .oneOf(
        [PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS],
        MESSAGES.PAYMENT_STATUS_INVALID,
      )
      .required(MESSAGES.PAYMENT_STATUS_REQUIRED),
    amount: requiredAmount.max(
      maximumAmount,
      MESSAGES.PAYMENT_AMOUNT_EXCEEDS_AVAILABLE_CREDIT,
    ),
    paymentType: Yup.string()
      .oneOf(
        PURCHASE_CREDIT_SUPPORTED_PAYMENT_TYPES,
        MESSAGES.PAYMENT_TYPE_INVALID,
      )
      .required(MESSAGES.PAYMENT_TYPE_REQUIRED),
    referenceId: referenceIdSchema,
    paymentDate: pastOrTodayDate(
      MESSAGES.PAYMENT_DATE_INVALID,
      MESSAGES.PAYMENT_DATE_FUTURE,
      MESSAGES.PAYMENT_DATE_REQUIRED,
    ).test(
      "on-or-after-purchase-credit",
      MESSAGES.PAYMENT_DATE_ON_OR_AFTER_PURCHASE_CREDIT,
      (value) => {
        if (!value || !purchaseCreditAt) return true;

        const paymentDate = moment(value);
        const purchaseDate = moment(purchaseCreditAt);
        return (
          !paymentDate.isValid() ||
          !purchaseDate.isValid() ||
          paymentDate.isSameOrAfter(purchaseDate, "day")
        );
      },
    ),
    notes: notesSchema,
    paymentReceipts: filesSchema,
  });

export const plannedPaymentCompletionValidationSchema = Yup.object({
  paymentStatus: Yup.string()
    .oneOf(
      [PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS],
      MESSAGES.PAYMENT_STATUS_INVALID,
    )
    .required(MESSAGES.PAYMENT_STATUS_REQUIRED),
  amount: requiredAmount,
  paymentType: Yup.string()
    .oneOf(
      PURCHASE_CREDIT_SUPPORTED_PAYMENT_TYPES,
      MESSAGES.PAYMENT_TYPE_INVALID,
    )
    .required(MESSAGES.PAYMENT_TYPE_REQUIRED),
  referenceId: referenceIdSchema,
  paymentDate: pastOrTodayDate(
    MESSAGES.PAYMENT_DATE_INVALID,
    MESSAGES.PAYMENT_DATE_FUTURE,
    MESSAGES.PAYMENT_DATE_REQUIRED,
  ),
  receivedPaymentDate: settlementDateSchema(),
  notes: notesSchema,
  paymentReceipts: filesSchema,
});

export const createPurchaseCreditPaymentPlanningCreateValidationSchema = ({
  maximumAmount = PURCHASE_CREDIT_AMOUNT_MAX,
} = {}) =>
  Yup.object({
    remindingDate: todayOrFutureDate(
      MESSAGES.REMINDING_DATE_INVALID,
      MESSAGES.REMINDING_DATE_PAST,
    ),
    amount: requiredAmount.max(
      maximumAmount,
      MESSAGES.PAYMENT_PLAN_AMOUNT_EXCEEDS_AVAILABLE_CREDIT,
    ),
    paymentType: Yup.string()
      .oneOf(
        PURCHASE_CREDIT_SUPPORTED_PAYMENT_TYPES,
        MESSAGES.PAYMENT_TYPE_INVALID,
      )
      .required(MESSAGES.PAYMENT_TYPE_REQUIRED),
    isPaymentCompleted: Yup.boolean()
      .oneOf([false], MESSAGES.PAYMENT_COMPLETION_REQUIRED)
      .required(MESSAGES.PAYMENT_COMPLETION_REQUIRED),
    notes: notesSchema,
  });

export const createPurchaseCreditPaymentPlanningUpdateValidationSchema = ({
  maximumAmount = PURCHASE_CREDIT_AMOUNT_MAX,
} = {}) =>
  Yup.object({
    remindingDate: updateRemindingDateSchema,
    amount: requiredAmount.max(
      maximumAmount,
      MESSAGES.PAYMENT_PLAN_AMOUNT_EXCEEDS_AVAILABLE_CREDIT,
    ),
    paymentType: Yup.string()
      .oneOf(
        PURCHASE_CREDIT_SUPPORTED_PAYMENT_TYPES,
        MESSAGES.PAYMENT_TYPE_INVALID,
      )
      .required(MESSAGES.PAYMENT_TYPE_REQUIRED),
    isPaymentCompleted: Yup.boolean().required(
      MESSAGES.PAYMENT_COMPLETION_REQUIRED,
    ),
    notes: notesSchema,
  });

export const createPurchaseCreditValidationSchema = ({
  isEditing = false,
} = {}) => {
  const schema = Yup.object({
    supplier: Yup.string().trim().required(MESSAGES.SUPPLIER_REQUIRED),
    products: Yup.array()
      .of(
        Yup.object({
          product: Yup.string().trim().required(MESSAGES.PRODUCT_REQUIRED),
          stock: Yup.number()
            .transform(emptyToUndefined)
            .typeError(MESSAGES.STOCK_NUMBER)
            .integer(MESSAGES.STOCK_INTEGER)
            .min(PURCHASE_CREDIT_STOCK_MIN, MESSAGES.STOCK_MIN)
            .max(PURCHASE_CREDIT_STOCK_MAX, MESSAGES.STOCK_MAX)
            .required(MESSAGES.STOCK_REQUIRED),
        }),
      )
      .min(1, MESSAGES.PRODUCTS_REQUIRED)
      .test("unique-products", MESSAGES.PRODUCTS_UNIQUE, (products = []) => {
        const selectedProducts = _.compact(
          _.map(products, (item) => item.product),
        );
        return _.uniq(selectedProducts).length === selectedProducts.length;
      }),
    purchaseCreditAt: pastOrTodayDate(
      MESSAGES.PURCHASE_CREDIT_AT_INVALID,
      MESSAGES.PURCHASE_CREDIT_AT_FUTURE,
      MESSAGES.PURCHASE_CREDIT_AT_REQUIRED,
    ),
    purchaseCreditAmount: Yup.number()
      .transform(emptyToUndefined)
      .typeError(MESSAGES.PURCHASE_CREDIT_AMOUNT_NUMBER)
      .min(PURCHASE_CREDIT_AMOUNT_MIN, MESSAGES.PURCHASE_CREDIT_AMOUNT_MIN)
      .max(PURCHASE_CREDIT_AMOUNT_MAX, MESSAGES.PURCHASE_CREDIT_AMOUNT_MAX)
      .test(
        "not-below-allocated-payment-amount",
        MESSAGES.PURCHASE_CREDIT_AMOUNT_BELOW_PAID,
        function purchaseAmountIsNotBelowAllocatedPayments(value) {
          if (!isEditing || !_.isFinite(value)) return true;

          const allocatedSavedPayments = _.filter(
            this.parent?.payments ?? [],
            (payment) =>
              payment?.id &&
              isPurchaseCreditPaymentAmountAllocated(payment, {
                preferSavedStatus: true,
              }),
          );

          return value >= sumAmounts(allocatedSavedPayments);
        },
      )
      .required(MESSAGES.PURCHASE_CREDIT_AMOUNT_REQUIRED),
    expectedDeliveryDate: todayOrFutureDate(
      MESSAGES.EXPECTED_DELIVERY_DATE_INVALID,
      MESSAGES.EXPECTED_DELIVERY_DATE_PAST,
      MESSAGES.EXPECTED_DELIVERY_DATE_REQUIRED,
    ),
    acknowledgementId: optionalText(
      PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MIN_LENGTH,
      PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MAX_LENGTH,
      MESSAGES.ACKNOWLEDGEMENT_ID_MIN,
      MESSAGES.ACKNOWLEDGEMENT_ID_MAX,
    ),
    acknowledgementReceipts: filesSchema,
    payments: isEditing
      ? Yup.mixed().optional()
      : Yup.array()
          .of(
            Yup.object({
              id: Yup.string().nullable(),
              paymentStatus: Yup.string()
                .oneOf(
                  PURCHASE_CREDIT_SUPPORTED_PAYMENT_STATUSES,
                  MESSAGES.PAYMENT_STATUS_INVALID,
                )
                .required(MESSAGES.PAYMENT_STATUS_REQUIRED),
              amount: requiredAmount,
              paymentType: Yup.string()
                .oneOf(
                  PURCHASE_CREDIT_SUPPORTED_PAYMENT_TYPES,
                  MESSAGES.PAYMENT_TYPE_INVALID,
                )
                .required(MESSAGES.PAYMENT_TYPE_REQUIRED),
              referenceId: referenceIdSchema,
              paymentDate: pastOrTodayDate(
                MESSAGES.PAYMENT_DATE_INVALID,
                MESSAGES.PAYMENT_DATE_FUTURE,
                MESSAGES.PAYMENT_DATE_REQUIRED,
              ),
              receivedPaymentDate: settlementDateSchema(),
              notes: notesSchema,
              paymentReceipts: filesSchema,
            }),
          )
          .min(1, MESSAGES.PAYMENTS_REQUIRED)
          .test(
            "payments-on-or-after-purchase-credit",
            MESSAGES.PAYMENT_DATE_ON_OR_AFTER_PURCHASE_CREDIT,
            paymentsAreOnOrAfterPurchaseCredit,
          ),
    paymentPlanning: isEditing
      ? Yup.mixed().optional()
      : Yup.array().of(
          Yup.object({
            remindingDate: todayOrFutureDate(
              MESSAGES.REMINDING_DATE_INVALID,
              MESSAGES.REMINDING_DATE_PAST,
            ),
            amount: requiredAmount,
            paymentType: Yup.string()
              .oneOf(
                PURCHASE_CREDIT_SUPPORTED_PAYMENT_TYPES,
                MESSAGES.PAYMENT_TYPE_INVALID,
              )
              .required(MESSAGES.PAYMENT_TYPE_REQUIRED),
            isPaymentCompleted: Yup.boolean().required(
              MESSAGES.PAYMENT_COMPLETION_REQUIRED,
            ),
            notes: notesSchema,
          }),
        ),
  });

  if (isEditing) return schema;

  return schema
    .test(
      "payment-amounts-within-purchase-credit",
      MESSAGES.TOTAL_PAYMENT_AMOUNT_EXCEEDS_PURCHASE_CREDIT,
      paymentAmountsAreWithinPurchaseCredit,
    )
    .test(
      "payment-planning-within-available-credit",
      MESSAGES.PAYMENT_ALLOCATION_EXCEEDS_PURCHASE_CREDIT,
      paymentPlanningIsWithinAvailableCredit,
    );
};

export const purchaseCreditValidationSchema =
  createPurchaseCreditValidationSchema();
