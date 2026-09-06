import { useEffect, useMemo, useState } from "react";
import { getIn, useFormik } from "formik";
import {
  CheckCircle2,
  FileText,
  IndianRupee,
  LoaderCircle,
  PackageCheck,
  Plus,
  Save,
  Trash2,
  WalletCards,
  Warehouse,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import { INDIAN_GST_OPTIONS } from "@Enums";
import {
  EMPTY_PURCHASE_PRODUCT,
  EMPTY_PURCHASE_PAYMENT,
  PURCHASE_ORDER_INITIAL_VALUES,
} from "@Forms/purchaseOrder/purchaseOrder.initialValues";
import { purchaseOrderValidationSchema } from "@Forms/purchaseOrder/purchaseOrder.validation.schema";
import {
  PURCHASE_AMOUNT_MAX,
  PURCHASE_ORDER_PDF_MAX_LENGTH,
  PURCHASE_ORDER_PDF_MIN_LENGTH,
  PURCHASE_PAYMENTS_MAX,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";
import PurchasePaymentFields from "@Forms/purchaseOrder/components/purchasePaymentFields";
import CurrencyField from "@Forms/purchaseOrder/components/purchaseOrderCurrencyField";
import PurchaseOrderDatePicker from "@Forms/purchaseOrder/components/purchaseOrderDatePicker";
import FormField from "@Forms/purchaseOrder/components/purchaseOrderFormField";
import SectionHeading from "@Forms/purchaseOrder/components/purchaseOrderSectionHeading";
import {
  SearchableApiSelect,
  StockMultiSelect,
} from "@Forms/purchaseOrder/components/purchaseOrderSelectors";
import { usePurchaseOrderOptions } from "@Forms/purchaseOrder/hooks/usePurchaseOrderOptions";
import { useStandaloneStockCounts } from "@Forms/purchaseOrder/hooks/useStandaloneStockCounts";

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
        resetStandaloneStockCounts();
        setCreateSucceeded(true);
      } catch {
        // The purchases slice exposes the request error above the form.
      }
    },
  });
  const { availableProductCount, productState, supplierState } =
    usePurchaseOrderOptions({
      productQuery,
      supplierId: formik?.values.supplier,
      supplierQuery,
    });
  const {
    getStandaloneStockState,
    loadStandaloneStockCount,
    resetStandaloneStockCounts,
  } = useStandaloneStockCounts();

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
  const selectSupplier = (option) => {
    formik.setValues(
      (current) => ({
        ...current,
        supplier: option.value,
        products: [{ ...EMPTY_PURCHASE_PRODUCT }],
      }),
      true,
    );
    setSelectedLabels({ supplier: option.label });
    setSupplierQuery(option.label);
    setProductQuery("");
    resetStandaloneStockCounts();
    setCreateSucceeded(false);
  };
  const selectProduct = async (productIndex, option) => {
    formik.setValues(
      (current) => ({
        ...current,
        products: current.products.map((product, index) =>
          index === productIndex
            ? {
                ...product,
                product: option.value,
                quantityPurchased: "",
                standaloneStock: "",
              }
            : product,
        ),
      }),
      true,
    );
    setSelectedLabels((current) => ({
      ...current,
      [`product-${productIndex}`]: option.label,
    }));
    setProductQuery("");
    setCreateSucceeded(false);

    const standaloneStock = await loadStandaloneStockCount(option.value);
    if (standaloneStock === undefined) return;

    formik.setValues(
      (current) => ({
        ...current,
        products: current.products.map((product, index) =>
          index === productIndex &&
          String(product.product) === String(option.value)
            ? {
                ...product,
                quantityPurchased: String(standaloneStock),
                standaloneStock,
              }
            : product,
        ),
      }),
      true,
    );
  };
  const addProduct = () => {
    formik.setFieldValue(
      "products",
      [...formik.values.products, { ...EMPTY_PURCHASE_PRODUCT }],
      false,
    );
    setCreateSucceeded(false);
  };
  const removeProduct = (productIndex) => {
    formik.setFieldValue(
      "products",
      formik.values.products.filter((_, index) => index !== productIndex),
      true,
    );
    setSelectedLabels((current) => {
      const nextLabels = { supplier: current.supplier };
      formik.values.products.forEach((_, index) => {
        if (index === productIndex) return;
        const nextIndex = index > productIndex ? index - 1 : index;
        nextLabels[`product-${nextIndex}`] = current[`product-${index}`];
      });
      return nextLabels;
    });
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
  const selectedProductValues = new Set(
    formik.values.products.map((item) => String(item.product || "")).filter(Boolean),
  );

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <section className="max-w-3xl">
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
                description="Select a supplier first, then add one or more of its active products."
                action={
                  <Button
                    type="button"
                    variant="outline"
                    disabled={
                      !formik.values.supplier ||
                      productState.isLoading ||
                      formik.values.products.length >= availableProductCount
                    }
                    onClick={addProduct}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    Add product
                  </Button>
                }
              />
              <div>
                <FormField
                  id="purchase-supplier"
                  label="Supplier"
                  required
                  hint="Changing the supplier clears the selected products."
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
                    onSelect={selectSupplier}
                    onBlur={() =>
                      formik.setFieldTouched("supplier", true, true)
                    }
                  />
                </FormField>
              </div>

              <div className="space-y-4">
                {formik.values.products.map((item, index) => {
                  const productPath = `products[${index}].product`;
                  const standaloneStockPath =
                    `products[${index}].standaloneStock`;
                  const quantityPath = `products[${index}].quantityPurchased`;
                  const standaloneStockState = getStandaloneStockState(
                    item.product,
                  );
                  const availableOptions = productOptions.filter(
                    (option) =>
                      option.value === String(item.product) ||
                      !selectedProductValues.has(option.value),
                  );

                  return (
                    <div
                      key={index}
                      className="rounded-xl border bg-muted/10 p-4 sm:p-5"
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="font-medium">Product {index + 1}</p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={formik.values.products.length === 1}
                          aria-label={`Remove product ${index + 1}`}
                          onClick={() => removeProduct(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </Button>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <FormField
                          id={`purchase-product-${index}`}
                          label="Product"
                          required
                          hint={
                            !formik.values.supplier
                              ? "Select a supplier first."
                              : undefined
                          }
                          error={errorFor(productPath)}
                        >
                          <SearchableApiSelect
                            id={`purchase-product-${index}`}
                            label={`Product ${index + 1}`}
                            value={String(item.product ?? "")}
                            selectedLabel={selectedLabels[`product-${index}`]}
                            placeholder="Search and select a product"
                            searchPlaceholder="Search active products"
                            query={productQuery}
                            disabled={!formik.values.supplier}
                            onQueryChange={setProductQuery}
                            options={availableOptions}
                            isLoading={productState.isLoading}
                            error={productState.error}
                            fieldError={errorFor(productPath)}
                            onSelect={(option) => selectProduct(index, option)}
                            onBlur={() =>
                              formik.setFieldTouched(productPath, true, true)
                            }
                          />
                        </FormField>
                        <FormField
                          id={`standalone-stock-${index}`}
                          label="Standalone stock"
                          error={
                            standaloneStockState.error ||
                            errorFor(standaloneStockPath)
                          }
                        >
                          <div className="relative">
                            <Input
                              id={`standalone-stock-${index}`}
                              type="text"
                              value={
                                standaloneStockState.isLoading
                                  ? "Loading..."
                                  : standaloneStockState.count
                              }
                              placeholder={
                                item.product
                                  ? "Stock count unavailable"
                                  : "Select a product first"
                              }
                              disabled
                              aria-busy={standaloneStockState.isLoading}
                              className={
                                standaloneStockState.isLoading
                                  ? "pr-9"
                                  : undefined
                              }
                            />
                            {standaloneStockState.isLoading && (
                              <LoaderCircle
                                className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </FormField>
                        <FormField
                          id={`quantity-purchased-${index}`}
                          label="Quantity purchased"
                          required
                          error={errorFor(quantityPath)}
                        >
                          <Input
                            id={`quantity-purchased-${index}`}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="e.g. 10"
                            {...inputProps(
                              quantityPath,
                              `quantity-purchased-${index}`,
                            )}
                          />
                        </FormField>
                      </div>
                    </div>
                  );
                })}
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
              <div className="grid gap-5 sm:grid-cols-2">
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

export default PurchaseOrderForm;
