import { createElement, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { getIn, useFormik } from "formik";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  FileText,
  IndianRupee,
  PackageSearch,
  Plus,
  Save,
  WalletCards,
} from "lucide-react";
import { useSelector } from "react-redux";

import {
  PURCHASE_CREDIT_INITIAL_VALUES,
  EMPTY_PURCHASE_CREDIT_PAYMENT,
  EMPTY_PURCHASE_CREDIT_PAYMENT_PLAN,
  EMPTY_PURCHASE_CREDIT_PRODUCT,
} from "@Forms/purchaseCredit/purchaseCredit.initialValues";
import { fromPurchaseCreditResponse } from "@Forms/purchaseCredit/purchaseCredit-frontend.payload";
import { createPurchaseCreditValidationSchema } from "@Forms/purchaseCredit/purchaseCredit.validation.schema";
import {
  PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MAX_LENGTH,
  PURCHASE_CREDIT_AMOUNT_MAX,
  PURCHASE_CREDIT_AMOUNT_MIN,
} from "@Forms/purchaseCredit/purchaseCredit.validation.constants";
import { usePurchaseCreditOptions } from "@Forms/purchaseCredit/hooks/usePurchaseCreditOptions";
import { Badge } from "@shadcnComponent/badge";
import { Button } from "@shadcnComponent/button";
import { Card, CardContent } from "@shadcnComponent/card";
import { Input } from "@shadcnComponent/input";
import PurchaseCreditDatePicker from "@Forms/purchaseCredit/components/purchaseCreditDatePicker";
import PurchaseCreditFileUploader from "@Forms/purchaseCredit/components/purchaseCreditFileUploader";
import PurchaseCreditFormField from "@Forms/purchaseCredit/components/purchaseCreditFormField";
import PurchaseCreditPaymentFields from "@Forms/purchaseCredit/components/purchaseCreditPaymentFields";
import PurchaseCreditPaymentPlanningFields from "@Forms/purchaseCredit/components/purchaseCreditPaymentPlanningFields";
import PurchaseCreditProductFields from "@Forms/purchaseCredit/components/purchaseCreditProductFields";
import PurchaseCreditRemoteSelect from "@Forms/purchaseCredit/components/purchaseCreditRemoteSelect";

function countValidationErrors(error) {
  if (!error) return 0;
  if (typeof error === "string") return 1;
  if (Array.isArray(error)) {
    return error.reduce((total, item) => total + countValidationErrors(item), 0);
  }
  if (typeof error === "object") {
    return Object.values(error).reduce(
      (total, item) => total + countValidationErrors(item),
      0,
    );
  }

  return 0;
}

function FormSection({
  id,
  icon,
  title,
  description,
  isOpen,
  errorCount,
  action,
  disabled = false,
  onOpen,
  children,
}) {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <Button
        type="button"
        variant="ghost"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onOpen}
        className="h-auto w-full justify-start rounded-none px-4 py-4 text-left hover:bg-muted/50 sm:px-6"
      >
        <div className="flex w-full min-w-0 items-center gap-3">
          <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
            {createElement(icon, { className: "size-4", "aria-hidden": true })}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-foreground">{title}</h2>
            <p className="mt-1 whitespace-normal text-sm font-normal text-muted-foreground">
              {description}
            </p>
          </div>
          {!isOpen && errorCount > 0 && (
            <Badge
              variant="destructive"
              className="shrink-0"
              aria-label={`${errorCount} validation ${errorCount === 1 ? "error" : "errors"}`}
            >
              {errorCount} {errorCount === 1 ? "error" : "errors"}
            </Badge>
          )}
          <ChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </div>
      </Button>
      {isOpen && (
        <CardContent
          id={`${id}-panel`}
          role="region"
          aria-label={title}
          className="space-y-5 border-t px-4 py-5 sm:px-6"
        >
          {action && (
            <div className="flex justify-end">
              {action}
            </div>
          )}
          {children}
        </CardContent>
      )}
    </Card>
  );
}

const SECTION_IDS = Object.freeze({
  SUPPLIER_PRODUCTS: "supplier-products",
  PURCHASE_CREDIT_SCHEDULE: "purchase-credit-schedule",
  ACKNOWLEDGEMENT: "acknowledgement",
  PAYMENTS: "payments",
  PAYMENT_PLANNING: "payment-planning",
});

function PurchaseCreditForm({ purchaseCredit, isEditing = false, onSubmit, onCancel, submissionMessage }) {
  const role = useSelector((state) => state.auth.role);
  const today = format(new Date(), "yyyy-MM-dd");
  const [supplierQuery, setSupplierQuery] = useState("");
  const [selectedSupplierLabel, setSelectedSupplierLabel] = useState("");
  const [productQuery, setProductQuery] = useState("");
  const [activeSection, setActiveSection] = useState(
    SECTION_IDS.SUPPLIER_PRODUCTS,
  );

  const initialValues = useMemo(
    () => (isEditing && purchaseCredit ? fromPurchaseCreditResponse(purchaseCredit) : fromPurchaseCreditResponse(PURCHASE_CREDIT_INITIAL_VALUES)),
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
        helpers.setStatus(error?.message ?? "Unable to prepare the purchase credit payload.");
      }
    },
  });

  const { supplierState, productState, availableProductCount } = usePurchaseCreditOptions({
    role,
    supplierId: formik.values.supplier,
    supplierQuery,
    productQuery,
  });

  const supplierOptions = useMemo(
    () =>
      supplierState.items.map((company) => ({
        value: String(company.id),
        label: company.name,
      })),
    [supplierState.items],
  );
  const productOptions = useMemo(
    () =>
      productState.items.map((product) => ({
        value: String(product.id),
        label: [product.name, product.productCode].filter(Boolean).join(" · "),
      })),
    [productState.items],
  );
  const selectedSupplier = supplierOptions.find(
    (option) => option.value === String(formik.values.supplier),
  );
  const numericPurchaseCreditAmount = Number(formik.values.purchaseCreditAmount);
  const canManagePayments =
    formik.values.purchaseCreditAmount !== "" &&
    Number.isFinite(numericPurchaseCreditAmount) &&
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
    if (
      !canManagePayments &&
      [SECTION_IDS.PAYMENTS, SECTION_IDS.PAYMENT_PLANNING].includes(
        activeSection,
      )
    ) {
      setActiveSection(null);
    }
  }, [activeSection, canManagePayments]);

  const errorFor = (field) => {
    const error = getIn(formik.errors, field);
    return getIn(formik.touched, field) && typeof error === "string"
      ? error
      : null;
  };
  const errorCountFor = (fields) =>
    fields.reduce(
      (total, field) => total + countValidationErrors(getIn(formik.errors, field)),
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
    formik.setFieldValue(field, [...formik.values[field], { ...emptyValue }], false);
  };
  const removeItem = (field, index) => {
    formik.setFieldValue(
      field,
      formik.values[field].filter((_, itemIndex) => itemIndex !== index),
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
    if (
      !canManagePayments &&
      [SECTION_IDS.PAYMENTS, SECTION_IDS.PAYMENT_PLANNING].includes(sectionId)
    ) {
      return;
    }

    setActiveSection((currentSection) =>
      currentSection === sectionId ? null : sectionId,
    );
  };

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      {submissionMessage && (
        <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {submissionMessage}
        </div>
      )}
      {formik.status && (
        <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {formik.status}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate className="space-y-3">
        <p className="px-1 text-sm text-muted-foreground">
          Fields marked with an asterisk are required.
        </p>

        <FormSection
          id={SECTION_IDS.SUPPLIER_PRODUCTS}
          icon={PackageSearch}
          title="Supplier and products"
          description="Only active suppliers and their active products are available."
          isOpen={activeSection === SECTION_IDS.SUPPLIER_PRODUCTS}
          errorCount={errorCountFor(["supplier", "products"])}
          onOpen={() => toggleSection(SECTION_IDS.SUPPLIER_PRODUCTS)}
          action={
            <Button
              type="button"
              variant="outline"
              disabled={
                !formik.values.supplier ||
                productState.isLoading ||
                formik.values.products.length >= availableProductCount
              }
              onClick={() => addItem("products", EMPTY_PURCHASE_CREDIT_PRODUCT)}
              className="w-full sm:w-auto"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add product
            </Button>
          }
        >
              <PurchaseCreditFormField
                id="purchase-credit-supplier"
                label="Supplier"
                required
                error={errorFor("supplier")}
              >
                <PurchaseCreditRemoteSelect
                  id="purchase-credit-supplier"
                  label="Supplier"
                  value={String(formik.values.supplier ?? "")}
                  selectedLabel={
                    selectedSupplier?.label ||
                    selectedSupplierLabel ||
                    (formik.values.supplier ? "Selected supplier" : "")
                  }
                  placeholder="Search and select a supplier"
                  searchPlaceholder="Search active suppliers"
                  query={supplierQuery}
                  onQueryChange={setSupplierQuery}
                  options={supplierOptions}
                  isLoading={supplierState.isLoading}
                  error={supplierState.error}
                  fieldError={errorFor("supplier")}
                  allowClear
                  onSelect={chooseSupplier}
                  onBlur={() => formik.setFieldTouched("supplier", true, true)}
                />
              </PurchaseCreditFormField>
              <PurchaseCreditProductFields
                products={formik.values.products}
                supplierSelected={Boolean(formik.values.supplier)}
                productOptions={productOptions}
                productState={productState}
                availableProductCount={availableProductCount}
                productQuery={productQuery}
                onProductQueryChange={setProductQuery}
                formik={formik}
                errorFor={errorFor}
                inputProps={inputProps}
                onRemove={(index) => removeItem("products", index)}
              />
        </FormSection>

        <FormSection
          id={SECTION_IDS.PURCHASE_CREDIT_SCHEDULE}
          icon={CalendarDays}
          title="Purchase credit schedule"
          description="Enter the purchase credit date, value, and expected delivery date."
          isOpen={activeSection === SECTION_IDS.PURCHASE_CREDIT_SCHEDULE}
          errorCount={errorCountFor([
            "purchaseCreditAt",
            "purchaseCreditAmount",
            "expectedDeliveryDate",
          ])}
          onOpen={() => toggleSection(SECTION_IDS.PURCHASE_CREDIT_SCHEDULE)}
        >
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <PurchaseCreditFormField id="purchase-credit-at" label="Purchase credit at" required error={errorFor("purchaseCreditAt")}>
                  <PurchaseCreditDatePicker
                    id="purchase-credit-at"
                    label="Purchase credit at"
                    value={formik.values.purchaseCreditAt}
                    max={today}
                    required
                    error={errorFor("purchaseCreditAt")}
                    onChange={(value) => formik.setFieldValue("purchaseCreditAt", value, true)}
                    onBlur={() => formik.setFieldTouched("purchaseCreditAt", true, true)}
                  />
                </PurchaseCreditFormField>
                <PurchaseCreditFormField id="purchase-credit-amount" label="Purchase credit amount" required error={errorFor("purchaseCreditAmount")}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                    <Input
                      id="purchase-credit-amount"
                      type="number"
                      min={PURCHASE_CREDIT_AMOUNT_MIN}
                      max={PURCHASE_CREDIT_AMOUNT_MAX}
                      inputMode="decimal"
                      className="pl-7"
                      {...inputProps("purchaseCreditAmount", "purchase-credit-amount")}
                    />
                  </div>
                </PurchaseCreditFormField>
                <PurchaseCreditFormField id="purchase-credit-expected-delivery" label="Expected delivery date" error={errorFor("expectedDeliveryDate")}>
                  <PurchaseCreditDatePicker
                    id="purchase-credit-expected-delivery"
                    label="Expected delivery date"
                    value={formik.values.expectedDeliveryDate}
                    min={today}
                    error={errorFor("expectedDeliveryDate")}
                    onChange={(value) => formik.setFieldValue("expectedDeliveryDate", value, true)}
                    onBlur={() => formik.setFieldTouched("expectedDeliveryDate", true, true)}
                  />
                </PurchaseCreditFormField>
              </div>
        </FormSection>

        <FormSection
          id={SECTION_IDS.ACKNOWLEDGEMENT}
          icon={FileText}
          title="Acknowledgement"
          description="Add the optional supplier acknowledgement and receipt files."
          isOpen={activeSection === SECTION_IDS.ACKNOWLEDGEMENT}
          errorCount={errorCountFor([
            "acknowledgementId",
            "acknowledgementReceipts",
          ])}
          onOpen={() => toggleSection(SECTION_IDS.ACKNOWLEDGEMENT)}
        >
              <div className="grid gap-5">
                <PurchaseCreditFormField id="purchase-credit-acknowledgement-id" label="Acknowledgement ID" error={errorFor("acknowledgementId")}>
                  <Input
                    id="purchase-credit-acknowledgement-id"
                    minLength={1}
                    maxLength={PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MAX_LENGTH}
                    placeholder="e.g. CG/PO/2026/8891"
                    {...inputProps("acknowledgementId", "purchase-credit-acknowledgement-id")}
                  />
                </PurchaseCreditFormField>
                <PurchaseCreditFormField id="purchase-credit-acknowledgement-receipts" label="Acknowledgement receipts" error={errorFor("acknowledgementReceipts")}>
                  <PurchaseCreditFileUploader
                    id="purchase-credit-acknowledgement-receipts"
                    value={formik.values.acknowledgementReceipts}
                    error={errorFor("acknowledgementReceipts")}
                    onChange={(value) => formik.setFieldValue("acknowledgementReceipts", value, true)}
                    onBlur={() => formik.setFieldTouched("acknowledgementReceipts", true, true)}
                  />
                </PurchaseCreditFormField>
              </div>
        </FormSection>

        <FormSection
          id={SECTION_IDS.PAYMENTS}
          icon={WalletCards}
          title="Payments"
          description={
            canManagePayments
              ? "Record payment dates, amounts, status, type, and receipts."
              : "Enter a valid purchase credit amount in Purchase credit schedule to unlock payments."
          }
          isOpen={activeSection === SECTION_IDS.PAYMENTS}
          errorCount={errorCountFor(["payments"])}
          disabled={!canManagePayments}
          onOpen={() => toggleSection(SECTION_IDS.PAYMENTS)}
          action={
            <Button
              type="button"
              variant="outline"
              disabled={!canManagePayments}
              onClick={() => addItem("payments", EMPTY_PURCHASE_CREDIT_PAYMENT)}
              className="w-full sm:w-auto"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add payment
            </Button>
          }
        >
              <PurchaseCreditPaymentFields
                payments={formik.values.payments}
                isEditing={isEditing}
                today={today}
                formik={formik}
                errorFor={errorFor}
                inputProps={inputProps}
                onRemove={(index) => removeItem("payments", index)}
              />
        </FormSection>

        <FormSection
          id={SECTION_IDS.PAYMENT_PLANNING}
          icon={IndianRupee}
          title="Payment planning"
          description={
            canManagePayments
              ? "Schedule upcoming payment reminders and track completion."
              : "Enter a valid purchase credit amount in Purchase credit schedule to unlock payment planning."
          }
          isOpen={activeSection === SECTION_IDS.PAYMENT_PLANNING}
          errorCount={errorCountFor(["paymentPlanning"])}
          disabled={!canManagePayments}
          onOpen={() => toggleSection(SECTION_IDS.PAYMENT_PLANNING)}
          action={
            <Button
              type="button"
              variant="outline"
              disabled={!canManagePayments}
              onClick={() =>
                addItem("paymentPlanning", EMPTY_PURCHASE_CREDIT_PAYMENT_PLAN)
              }
              className="w-full sm:w-auto"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add payment plan
            </Button>
          }
        >
              <PurchaseCreditPaymentPlanningFields
                plans={formik.values.paymentPlanning}
                isEditing={isEditing}
                today={today}
                formik={formik}
                errorFor={errorFor}
                inputProps={inputProps}
                onRemove={(index) => removeItem("paymentPlanning", index)}
              />
        </FormSection>

        <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={formik.isSubmitting}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={formik.isSubmitting}>
            <Save className="size-4" aria-hidden="true" />
            {formik.isSubmitting
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
