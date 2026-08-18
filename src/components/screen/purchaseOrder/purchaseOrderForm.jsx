import { createElement, useEffect, useMemo, useState } from "react";
import { getIn, useFormik } from "formik";
import {
  CheckCircle2,
  CircleAlert,
  FileText,
  IndianRupee,
  PackageCheck,
  Plus,
  Save,
  WalletCards,
  Warehouse,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import { INDIAN_GST_OPTIONS } from "@Enums";
import {
  EMPTY_PURCHASE_PAYMENT,
  PURCHASE_ORDER_INITIAL_VALUES,
} from "@Forms/purchaseOrder/purchaseOrder.initialValues";
import { purchaseOrderValidationSchema } from "@Forms/purchaseOrder/purchaseOrder.validation.schema";
import {
  PURCHASE_AMOUNT_MAX,
  PURCHASE_AMOUNT_MIN,
  PURCHASE_ORDER_PDF_MAX_LENGTH,
  PURCHASE_ORDER_PDF_MIN_LENGTH,
  PURCHASE_PAYMENTS_MAX,
  PURCHASE_QUANTITY_MAX,
  PURCHASE_QUANTITY_MIN,
} from "@Forms/purchaseOrder/purchaseOrder.validation.constants";
import { fetchStocks } from "@Redux/stock/stock.action";
import { createPurchase } from "@Redux/purchase/purchase.action";
import { selectPurchaseCreateState } from "@Redux/purchase/purchase.selector";
import { purchaseCreateCleared } from "@Redux/purchase/purchase.slice";
import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";
import PurchasePaymentFields from "@screenComponent/purchaseOrder/purchasePaymentFields";
import PurchaseOrderDatePicker from "@screenComponent/purchaseOrder/purchaseOrderDatePicker";
import {
  SearchableApiSelect,
  StockMultiSelect,
} from "@screenComponent/purchaseOrder/purchaseOrderSelectors";
import { usePurchaseOrderOptions } from "@screenComponent/purchaseOrder/usePurchaseOrderOptions";

function FormField({ id, label, required = false, hint, error, children }) {
  return (
    <div className="grid content-start gap-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {hint && !error && (
        <p className="text-xs leading-4 text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-xs font-medium leading-4 text-destructive"
        >
          <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

function SectionHeading({ icon, title, description, action }) {
  return (
    <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          {createElement(icon, { className: "size-4", "aria-hidden": true })}
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

const calculateInclusiveGst = (billAmount, gstPercentage) => {
  const bill = Number(billAmount);
  const rate = Number(gstPercentage);
  if (!Number.isFinite(bill) || bill <= 0 || !Number.isFinite(rate)) return "";
  if (rate === 0) return "0.00";
  return ((bill * rate) / (100 + rate)).toFixed(2);
};

function PurchaseOrderForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createSucceeded, setCreateSucceeded] = useState(false);
  const [productQuery, setProductQuery] = useState("");
  const [supplierQuery, setSupplierQuery] = useState("");
  const [stockQuery, setStockQuery] = useState("");
  const [selectedLabels, setSelectedLabels] = useState({});
  const stocks = useSelector((state) => state.stocks.items ?? []);
  const { isCreating, createError } = useSelector(selectPurchaseCreateState);
  const { productState, supplierState } = usePurchaseOrderOptions(
    productQuery,
    supplierQuery,
  );

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(purchaseCreateCleared());

    return () => dispatch(purchaseCreateCleared());
  }, [dispatch]);

  const productOptions = useMemo(
    () =>
      productState.items.map((product) => ({
        value: String(product.id),
        label: [product.name, product.productCode].filter(Boolean).join(" · "),
        supplierId: product.agency ? String(product.agency) : "",
        supplierName:
          product.agencyName &&
          String(product.agencyName) !== String(product.agency)
            ? product.agencyName
            : "",
      })),
    [productState.items],
  );
  const supplierOptions = useMemo(
    () =>
      supplierState.items.map((company) => ({
        value: String(company.id),
        label: company.name,
      })),
    [supplierState.items],
  );

  const formik = useFormik({
    initialValues: PURCHASE_ORDER_INITIAL_VALUES,
    validationSchema: purchaseOrderValidationSchema,
    onSubmit: async (values, helpers) => {
      setCreateSucceeded(false);

      try {
        const purchase = purchaseOrderValidationSchema.cast(values);
        await dispatch(createPurchase(purchase)).unwrap();
        helpers.resetForm({ values: PURCHASE_ORDER_INITIAL_VALUES });
        setSelectedLabels({});
        setProductQuery("");
        setSupplierQuery("");
        setStockQuery("");
        setCreateSucceeded(true);
      } catch {
        // The purchases slice exposes the request error above the form.
      }
    },
  });
  const errorFor = (field) => {
    const error = getIn(formik.errors, field);
    return getIn(formik.touched, field) && typeof error === "string"
      ? error
      : null;
  };
  const inputProps = (field, id) => ({
    name: field,
    value: getIn(formik.values, field) ?? "",
    onChange: (event) => {
      setCreateSucceeded(false);
      formik.handleChange(event);
    },
    onBlur: formik.handleBlur,
    "aria-invalid": Boolean(errorFor(field)),
    "aria-describedby": errorFor(field) ? `${id}-error` : undefined,
  });

  const updateCommercialField = (field, value) => {
    const billAmount =
      field === "billAmount" ? value : formik.values.billAmount;
    const gstPercentage =
      field === "gstPercentage" ? value : formik.values.gstPercentage;

    formik.setValues(
      (current) => ({
        ...current,
        [field]: value,
        gstAmount: calculateInclusiveGst(billAmount, gstPercentage),
      }),
      true,
    );
    setCreateSucceeded(false);
  };
  const selectRemoteOption = (field, option) => {
    formik.setFieldValue(field, option.value, true);
    setSelectedLabels((current) => ({ ...current, [field]: option.label }));
    setCreateSucceeded(false);
  };
  const selectProductOption = (option) => {
    const matchedSupplier = supplierOptions.find(
      (supplier) => supplier.value === option.supplierId,
    );
    const supplierName = option.supplierName || matchedSupplier?.label || "";

    formik.setValues(
      (current) => ({
        ...current,
        product: option.value,
        supplier: option.supplierId,
      }),
      true,
    );
    setSelectedLabels((current) => ({
      ...current,
      product: option.label,
      supplier: supplierName,
    }));
    setSupplierQuery(supplierName);
    setCreateSucceeded(false);
  };

  useEffect(() => {
    if (!formik.values.supplier || selectedLabels.supplier) return;

    const matchedSupplier = supplierOptions.find(
      (supplier) => supplier.value === formik.values.supplier,
    );
    if (!matchedSupplier) return;

    setSelectedLabels((current) => ({
      ...current,
      supplier: matchedSupplier.label,
    }));
  }, [formik.values.supplier, selectedLabels.supplier, supplierOptions]);
  const addPayment = () => {
    formik.setFieldValue(
      "payments",
      [...formik.values.payments, { ...EMPTY_PURCHASE_PAYMENT }],
      false,
    );
    setCreateSucceeded(false);
  };
  const removePayment = (paymentIndex) => {
    formik.setFieldValue(
      "payments",
      formik.values.payments.filter((_, index) => index !== paymentIndex),
      true,
    );
    setCreateSucceeded(false);
  };

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <section className="max-w-3xl">
        <p className="text-sm font-medium text-primary">Purchase management</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Add purchase order
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Record supplier, delivery, stock, GST-inclusive billing, and payment
          details.
        </p>
      </section>

      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle>Purchase details</CardTitle>
          <CardDescription>
            Fields marked with an asterisk must be completed before saving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormErrorAlert message={createError} />
          {createSucceeded && (
            <div
              role="status"
              className="mb-6 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-800"
            >
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              Purchase order created successfully.
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-8" noValidate>
            <section className="space-y-5">
              <SectionHeading
                icon={PackageCheck}
                title="Order information"
                description="Search active products and suppliers, then set the order and delivery dates."
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  id="purchase-product"
                  label="Product"
                  required
                  error={errorFor("product")}
                >
                  <SearchableApiSelect
                    id="purchase-product"
                    label="Product"
                    value={formik.values.product}
                    selectedLabel={selectedLabels.product}
                    placeholder="Search and select a product"
                    searchPlaceholder="Search products"
                    query={productQuery}
                    onQueryChange={setProductQuery}
                    options={productOptions}
                    isLoading={productState.isLoading}
                    error={productState.error}
                    fieldError={errorFor("product")}
                    onSelect={selectProductOption}
                    onBlur={() =>
                      formik.setFieldTouched("product", true, true)
                    }
                  />
                </FormField>
                <FormField
                  id="purchase-supplier"
                  label="Supplier"
                  required
                  hint="Automatically selected from the product, or search for another active company."
                  error={errorFor("supplier")}
                >
                  <SearchableApiSelect
                    id="purchase-supplier"
                    label="Supplier"
                    value={formik.values.supplier}
                    selectedLabel={selectedLabels.supplier}
                    placeholder="Search and select a supplier"
                    searchPlaceholder="Search suppliers"
                    query={supplierQuery}
                    onQueryChange={setSupplierQuery}
                    options={supplierOptions}
                    isLoading={supplierState.isLoading}
                    error={supplierState.error}
                    fieldError={errorFor("supplier")}
                    onSelect={(option) =>
                      selectRemoteOption("supplier", option)
                    }
                    onBlur={() =>
                      formik.setFieldTouched("supplier", true, true)
                    }
                  />
                </FormField>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <FormField
                  id="purchase-date"
                  label="Purchase date"
                  required
                  error={errorFor("purchaseDate")}
                >
                  <PurchaseOrderDatePicker
                    id="purchase-date"
                    label="Purchase date"
                    value={formik.values.purchaseDate}
                    error={errorFor("purchaseDate")}
                    onChange={(value) => {
                      formik.setFieldValue("purchaseDate", value, true);
                      setCreateSucceeded(false);
                    }}
                    onBlur={() =>
                      formik.setFieldTouched("purchaseDate", true, true)
                    }
                  />
                </FormField>
                <FormField
                  id="expected-delivery-date"
                  label="Expected delivery date"
                  required
                  error={errorFor("expectedDeliveryDate")}
                >
                  <PurchaseOrderDatePicker
                    id="expected-delivery-date"
                    label="Expected delivery date"
                    value={formik.values.expectedDeliveryDate}
                    min={formik.values.purchaseDate || undefined}
                    error={errorFor("expectedDeliveryDate")}
                    onChange={(value) => {
                      formik.setFieldValue(
                        "expectedDeliveryDate",
                        value,
                        true,
                      );
                      setCreateSucceeded(false);
                    }}
                    onBlur={() =>
                      formik.setFieldTouched(
                        "expectedDeliveryDate",
                        true,
                        true,
                      )
                    }
                  />
                </FormField>
                <FormField
                  id="actual-delivery-date"
                  label="Actual delivery date"
                  hint="Available after the purchase is created."
                  error={errorFor("actualDeliveryDate")}
                >
                  <PurchaseOrderDatePicker
                    id="actual-delivery-date"
                    label="Actual delivery date"
                    value={formik.values.actualDeliveryDate}
                    disabled
                    min={formik.values.purchaseDate || undefined}
                    error={errorFor("actualDeliveryDate")}
                    onChange={(value) => {
                      formik.setFieldValue("actualDeliveryDate", value, true);
                      setCreateSucceeded(false);
                    }}
                    onBlur={() =>
                      formik.setFieldTouched("actualDeliveryDate", true, true)
                    }
                  />
                </FormField>
              </div>
            </section>

            <section className="space-y-5">
              <SectionHeading
                icon={Warehouse}
                title="Stock allocation"
                description="Stock records can be linked after the purchase is created."
              />
              <FormField
                id="purchase-stocks"
                label="Stock records"
                hint="Available after the purchase is created."
                error={errorFor("stocks")}
              >
                <StockMultiSelect
                  stocks={stocks}
                  disabled
                  selected={formik.values.stocks}
                  query={stockQuery}
                  onQueryChange={setStockQuery}
                  onChange={(value) => {
                    formik.setFieldValue("stocks", value, true);
                    setCreateSucceeded(false);
                  }}
                />
              </FormField>
            </section>

            <section className="space-y-5">
              <SectionHeading
                icon={IndianRupee}
                title="Quantity and billing"
                description="Enter GST-inclusive values. GST is calculated from the bill total and selected slab."
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <FormField
                  id="quantity-purchased"
                  label="Quantity purchased"
                  required
                  error={errorFor("quantityPurchased")}
                >
                  <Input
                    id="quantity-purchased"
                    type="number"
                    min={PURCHASE_QUANTITY_MIN}
                    max={PURCHASE_QUANTITY_MAX}
                    step="1"
                    inputMode="numeric"
                    placeholder="e.g. 10"
                    {...inputProps("quantityPurchased", "quantity-purchased")}
                  />
                </FormField>
                <CurrencyField
                  id="bill-amount"
                  label="Bill amount"
                  hint="Total amount including GST."
                  inputProps={{
                    ...inputProps("billAmount", "bill-amount"),
                    onChange: (event) =>
                      updateCommercialField("billAmount", event.target.value),
                  }}
                  error={errorFor("billAmount")}
                />
                <CurrencyField
                  id="actual-paid-amount"
                  label="Amount paid"
                  hint="Updated through the payment workflow after creation."
                  max={formik.values.billAmount || PURCHASE_AMOUNT_MAX}
                  inputProps={inputProps(
                    "actualPaidAmount",
                    "actual-paid-amount",
                  )}
                  error={errorFor("actualPaidAmount")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  id="gst-percentage"
                  label="GST rate"
                  required
                  error={errorFor("gstPercentage")}
                >
                  <Select
                    value={String(formik.values.gstPercentage ?? "")}
                    onValueChange={(value) =>
                      updateCommercialField("gstPercentage", Number(value))
                    }
                    onOpenChange={(open) =>
                      !open &&
                      formik.setFieldTouched("gstPercentage", true, true)
                    }
                  >
                    <SelectTrigger
                      id="gst-percentage"
                      aria-invalid={Boolean(errorFor("gstPercentage"))}
                      aria-describedby={
                        errorFor("gstPercentage")
                          ? "gst-percentage-error"
                          : undefined
                      }
                    >
                      <SelectValue placeholder="Select GST rate" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_GST_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField
                  id="gst-amount"
                  label="GST amount"
                  required
                  hint="Calculated from the GST-inclusive bill amount."
                  error={errorFor("gstAmount")}
                >
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      ₹
                    </span>
                    <Input
                      id="gst-amount"
                      type="number"
                      value={formik.values.gstAmount}
                      readOnly
                      aria-readonly="true"
                      className="bg-muted/50 pl-7"
                    />
                  </div>
                </FormField>
              </div>
            </section>

            <section className="space-y-5">
              <SectionHeading
                icon={WalletCards}
                title="Payments"
                description={`Add up to ${PURCHASE_PAYMENTS_MAX} payment records for this purchase.`}
                action={
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addPayment}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    Add payment
                  </Button>
                }
              />
              <PurchasePaymentFields
                payments={formik.values.payments}
                formik={formik}
                errorFor={errorFor}
                inputProps={inputProps}
                onRemove={removePayment}
              />
            </section>

            <section className="space-y-5">
              <SectionHeading
                icon={FileText}
                title="Purchase order document"
                description="Attach the hosted PDF address supplied for this purchase order."
              />
              <FormField
                id="purchase-order-pdf"
                label="Purchase order PDF URL"
                required
                hint="Use an absolute http(s) URL."
                error={errorFor("purchaseOrderPdf")}
              >
                <Input
                  id="purchase-order-pdf"
                  type="url"
                  placeholder="https://example.com/purchase-orders/PO-001.pdf"
                  minLength={PURCHASE_ORDER_PDF_MIN_LENGTH}
                  maxLength={PURCHASE_ORDER_PDF_MAX_LENGTH}
                  {...inputProps("purchaseOrderPdf", "purchase-order-pdf")}
                />
              </FormField>
            </section>

            <div className="flex flex-col-reverse gap-2 border-t pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/purchases")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating || formik.isSubmitting}>
                <Save className="size-4" aria-hidden="true" />
                {isCreating ? "Creating purchase..." : "Create purchase order"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

function CurrencyField({
  id,
  label,
  hint,
  max = PURCHASE_AMOUNT_MAX,
  inputProps,
  error,
  disabled = false,
}) {
  return (
    <FormField id={id} label={label} required hint={hint} error={error}>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          ₹
        </span>
        <Input
          id={id}
          type="number"
          min={PURCHASE_AMOUNT_MIN}
          max={max}
          step="0.01"
          inputMode="decimal"
          disabled={disabled}
          {...inputProps}
          className="pl-7"
        />
      </div>
    </FormField>
  );
}

export default PurchaseOrderForm;
