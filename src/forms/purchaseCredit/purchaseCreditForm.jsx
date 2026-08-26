import { useEffect, useMemo, useState } from "react";
import { getIn, useFormik } from "formik";
import _ from "lodash";
import { CheckCircle2, Save } from "lucide-react";
import moment from "moment";
import { useSelector } from "react-redux";

import {
  EMPTY_PURCHASE_CREDIT_PRODUCT,
  PURCHASE_CREDIT_INITIAL_VALUES,
} from "@Forms/purchaseCredit/purchaseCredit.initialValues";
import { fromPurchaseCreditResponse } from "@Forms/purchaseCredit/purchaseCredit-frontend.payload";
import {
  PURCHASE_CREDIT_AMOUNT_MAX,
  PURCHASE_CREDIT_AMOUNT_MIN,
} from "@Forms/purchaseCredit/purchaseCredit.validation.constants";
import { createPurchaseCreditValidationSchema } from "@Forms/purchaseCredit/purchaseCredit.validation.schema";
import { PURCHASE_CREDIT_SECTION_IDS } from "@Forms/purchaseCredit/purchaseCreditForm.constants";
import { countPurchaseCreditValidationErrors } from "@Forms/purchaseCredit/purchaseCreditForm.utils";
import { usePurchaseCreditOptions } from "@Forms/purchaseCredit/hooks/usePurchaseCreditOptions";
import {
  AcknowledgementSection,
  PaymentPlanningSection,
  PaymentsSection,
  PurchaseCreditScheduleSection,
  SupplierProductsSection,
} from "@Forms/purchaseCredit/components/sections";
import { Button } from "@shadcnComponent/button";

function PurchaseCreditForm({
  purchaseCredit,
  isEditing = false,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submissionError,
  submissionMessage,
}) {
  const role = useSelector((state) => state.auth.role);
  const today = moment().format("YYYY-MM-DD");
  const [supplierQuery, setSupplierQuery] = useState("");
  const [selectedSupplierLabel, setSelectedSupplierLabel] = useState("");
  const [productQuery, setProductQuery] = useState("");
  const [activeSection, setActiveSection] = useState(
    PURCHASE_CREDIT_SECTION_IDS.SUPPLIER_PRODUCTS,
  );

  const initialValues = useMemo(
    () =>
      isEditing && purchaseCredit
        ? fromPurchaseCreditResponse(purchaseCredit)
        : fromPurchaseCreditResponse(PURCHASE_CREDIT_INITIAL_VALUES),
    [purchaseCredit, isEditing],
  );
  const validationSchema = useMemo(
    () => createPurchaseCreditValidationSchema({ isEditing }),
    [isEditing],
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema,
    onSubmit: async (values, helpers) => {
      helpers.setStatus(null);

      try {
        await onSubmit(validationSchema.cast(values));
      } catch (error) {
        helpers.setStatus(
          error?.message ?? "Unable to prepare the purchase credit payload.",
        );
      }
    },
  });

  const { supplierState, productState, availableProductCount } =
    usePurchaseCreditOptions({
      role,
      supplierId: formik.values.supplier,
      supplierQuery,
      productQuery,
    });

  const supplierOptions = useMemo(
    () =>
      _.map(supplierState.items, (company) => ({
        value: String(company.id),
        label: company.name,
      })),
    [supplierState.items],
  );
  const productOptions = useMemo(
    () =>
      _.map(productState.items, (product) => ({
        value: String(product.id),
        label: _.compact([product.name, product.productCode]).join(" · "),
      })),
    [productState.items],
  );
  const selectedSupplier = _.find(
    supplierOptions,
    (option) => option.value === String(formik.values.supplier),
  );
  const numericPurchaseCreditAmount = _.toNumber(
    formik.values.purchaseCreditAmount,
  );
  const purchaseCreditAt = moment(
    formik.values.purchaseCreditAt,
    "YYYY-MM-DD",
    true,
  );
  const hasValidPurchaseCreditDate =
    purchaseCreditAt.isValid() &&
    purchaseCreditAt.isSameOrBefore(moment(), "day");
  const canManagePayments =
    hasValidPurchaseCreditDate &&
    formik.values.purchaseCreditAmount !== "" &&
    _.isFinite(numericPurchaseCreditAmount) &&
    numericPurchaseCreditAmount >= PURCHASE_CREDIT_AMOUNT_MIN &&
    numericPurchaseCreditAmount <= PURCHASE_CREDIT_AMOUNT_MAX;

  useEffect(() => {
    if (selectedSupplier) {
      setSelectedSupplierLabel(selectedSupplier.label);

      if (!supplierQuery) {
        setSupplierQuery(selectedSupplier.label);
      }
    } else if (!formik.values.supplier) {
      setSelectedSupplierLabel("");
    }
  }, [formik.values.supplier, selectedSupplier, supplierQuery]);

  useEffect(() => {
    const paymentSections = [
      PURCHASE_CREDIT_SECTION_IDS.PAYMENTS,
      PURCHASE_CREDIT_SECTION_IDS.PAYMENT_PLANNING,
    ];

    if (!canManagePayments && _.includes(paymentSections, activeSection)) {
      setActiveSection(null);
    }
  }, [activeSection, canManagePayments]);

  const errorFor = (field) => {
    const error = getIn(formik.errors, field);
    return getIn(formik.touched, field) && _.isString(error)
      ? error
      : null;
  };
  const errorCountFor = (fields) =>
    _.reduce(
      fields,
      (total, field) =>
        total +
        countPurchaseCreditValidationErrors(getIn(formik.errors, field)),
      0,
    );
  const inputProps = (field, id) => ({
    name: field,
    value: getIn(formik.values, field) ?? "",
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    "aria-invalid": Boolean(errorFor(field)),
    "aria-describedby": errorFor(field) ? `${id}-error` : undefined,
  });

  const addItem = (field, emptyValue) => {
    formik.setFieldValue(
      field,
      _.concat(formik.values[field], { ...emptyValue }),
      false,
    );
  };
  const removeItem = (field, index) => {
    formik.setFieldValue(
      field,
      _.filter(formik.values[field], (_, itemIndex) => itemIndex !== index),
      true,
    );
  };
  const chooseSupplier = (option) => {
    formik.setValues(
      (current) => ({
        ...current,
        supplier: option?.value ?? "",
        products: [{ ...EMPTY_PURCHASE_CREDIT_PRODUCT }],
      }),
      true,
    );
    setSelectedSupplierLabel(option?.label ?? "");
    setSupplierQuery(option?.label ?? "");
    setProductQuery("");
  };
  const toggleSection = (sectionId) => {
    const lockedPaymentSections = [
      PURCHASE_CREDIT_SECTION_IDS.PAYMENTS,
      PURCHASE_CREDIT_SECTION_IDS.PAYMENT_PLANNING,
    ];

    if (!canManagePayments && _.includes(lockedPaymentSections, sectionId)) return;

    setActiveSection((currentSection) =>
      currentSection === sectionId ? null : sectionId,
    );
  };

  const sectionControlProps = { activeSection, toggleSection };
  const fieldProps = { formik, errorFor, inputProps };
  const collectionProps = { addItem, removeItem };
  const isBusy = isSubmitting || formik.isSubmitting;

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      {submissionMessage && (
        <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {submissionMessage}
        </div>
      )}
      {(submissionError || formik.status) && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {submissionError || formik.status}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate className="space-y-3">
        <p className="px-1 text-sm text-muted-foreground">
          Fields marked with an asterisk are required.
        </p>

        <SupplierProductsSection
          {...sectionControlProps}
          {...fieldProps}
          {...collectionProps}
          errorCount={errorCountFor(["supplier", "products"])}
          supplierOptions={supplierOptions}
          selectedSupplier={selectedSupplier}
          selectedSupplierLabel={selectedSupplierLabel}
          supplierQuery={supplierQuery}
          setSupplierQuery={setSupplierQuery}
          chooseSupplier={chooseSupplier}
          productOptions={productOptions}
          supplierState={supplierState}
          productState={productState}
          availableProductCount={availableProductCount}
          productQuery={productQuery}
          setProductQuery={setProductQuery}
        />
        <PurchaseCreditScheduleSection
          {...sectionControlProps}
          {...fieldProps}
          errorCount={errorCountFor([
            "purchaseCreditAt",
            "purchaseCreditAmount",
            "expectedDeliveryDate",
          ])}
          today={today}
        />
        <AcknowledgementSection
          {...sectionControlProps}
          {...fieldProps}
          errorCount={errorCountFor([
            "acknowledgementId",
            "acknowledgementReceipts",
          ])}
        />
        <PaymentsSection
          {...sectionControlProps}
          {...fieldProps}
          {...collectionProps}
          errorCount={errorCountFor(["payments"])}
          canManagePayments={canManagePayments}
          isEditing={isEditing}
          today={today}
        />
        <PaymentPlanningSection
          {...sectionControlProps}
          {...fieldProps}
          {...collectionProps}
          errorCount={errorCountFor(["paymentPlanning"])}
          canManagePayments={canManagePayments}
          isEditing={isEditing}
          today={today}
        />

        <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isBusy}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isBusy}>
            <Save className="size-4" aria-hidden="true" />
            {isBusy
              ? "Saving…"
              : isEditing
                ? "Update purchase credit"
                : "Add purchase credit"}
          </Button>
        </div>
      </form>
    </main>
  );
}

export default PurchaseCreditForm;
