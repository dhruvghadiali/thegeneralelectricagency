import { useEffect, useMemo, useState } from "react";
import { getIn, useFormik } from "formik";
import {
  CheckCircle2,
  FileText,
  LoaderCircle,
  PackageCheck,
  Plus,
  Save,
  UserCheck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import PurchaseOrderBillUploader from "@Forms/purchaseOrder/components/purchaseOrderBillUploader";
import PurchaseOrderFormField from "@Forms/purchaseOrder/components/purchaseOrderFormField";
import PurchaseOrderProductFields from "@Forms/purchaseOrder/components/purchaseOrderProductFields";
import PurchaseOrderSectionHeading from "@Forms/purchaseOrder/components/purchaseOrderSectionHeading";
import { SearchableApiSelect } from "@Forms/purchaseOrder/components/purchaseOrderSelectors";
import {
  EMPTY_PURCHASE_PRODUCT,
  PURCHASE_ORDER_INITIAL_VALUES,
} from "@Forms/purchaseOrder/purchaseOrder.initialValues";
import { purchaseOrderValidationSchema } from "@Forms/purchaseOrder/purchaseOrder.validation.schema";
import { calculatePurchaseProductPricing } from "@Forms/purchaseOrder/purchaseOrderForm.utils";
import { usePurchaseOrderOptions } from "@Forms/purchaseOrder/hooks/usePurchaseOrderOptions";
import { useStandaloneStockCounts } from "@Forms/purchaseOrder/hooks/useStandaloneStockCounts";
import { useWarehouseManagerOptions } from "@Forms/purchaseOrder/hooks/useWarehouseManagerOptions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

function PurchaseOrderForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createSucceeded, setCreateSucceeded] = useState(false);
  const [productQuery, setProductQuery] = useState("");
  const [supplierQuery, setSupplierQuery] = useState("");
  const [selectedLabels, setSelectedLabels] = useState({});
  const { isCreating, createError } = useSelector(selectPurchaseCreateState);
  const warehouseManagerState = useWarehouseManagerOptions();
  const {
    getStandaloneStockState,
    loadStandaloneStockCount,
    resetStandaloneStockCounts,
  } = useStandaloneStockCounts();
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
      supplierId: formik.values.supplier,
      supplierQuery,
    });

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
                ...EMPTY_PURCHASE_PRODUCT,
                product: option.value,
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
  const updateProductPricing = (productIndex, field, value) => {
    formik.setValues(
      (current) => ({
        ...current,
        products: current.products.map((product, index) => {
          if (index !== productIndex) return product;

          const updatedProduct = { ...product, [field]: value };
          return {
            ...updatedProduct,
            ...calculatePurchaseProductPricing(updatedProduct),
          };
        }),
      }),
      true,
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

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
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
              <PurchaseOrderSectionHeading
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
              <PurchaseOrderFormField
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
              </PurchaseOrderFormField>
              <PurchaseOrderProductFields
                products={formik.values.products}
                supplierSelected={Boolean(formik.values.supplier)}
                productOptions={productOptions}
                productState={productState}
                productQuery={productQuery}
                selectedLabels={selectedLabels}
                getStandaloneStockState={getStandaloneStockState}
                errorFor={errorFor}
                inputProps={inputProps}
                onProductQueryChange={setProductQuery}
                onProductBlur={(field) =>
                  formik.setFieldTouched(field, true, true)
                }
                onSelect={selectProduct}
                onRemove={removeProduct}
                onPricingChange={updateProductPricing}
              />
            </section>

            <section className="space-y-5">
              <PurchaseOrderSectionHeading
                icon={FileText}
                title="Bills"
                description="Upload one or more PDF bills for this purchase order."
              />
              <PurchaseOrderFormField
                id="purchase-bills"
                label="Bill files"
                hint="You can select multiple PDF files."
                error={errorFor("bills")}
              >
                <PurchaseOrderBillUploader
                  id="purchase-bills"
                  value={formik.values.bills}
                  disabled={isCreating || formik.isSubmitting}
                  error={errorFor("bills")}
                  onChange={(bills) => {
                    setCreateSucceeded(false);
                    formik.setFieldValue("bills", bills, true);
                    formik.setFieldTouched("bills", true, false);
                  }}
                  onBlur={() => formik.setFieldTouched("bills", true, true)}
                />
              </PurchaseOrderFormField>
            </section>

            <section className="space-y-5">
              <PurchaseOrderSectionHeading
                icon={UserCheck}
                title="Warehouse receiving information"
                description="Select the employee who received the products at ware house."
              />
              <PurchaseOrderFormField
                id="purchase-received-or-collected-by"
                label="Received or collected by"
                required
                error={
                  errorFor("receivedOrCollectedBy") ||
                  warehouseManagerState.error
                }
              >
                <>
                  <Select
                    value={formik.values.receivedOrCollectedBy}
                    onValueChange={(value) => {
                      setCreateSucceeded(false);
                      formik.setFieldValue(
                        "receivedOrCollectedBy",
                        value,
                        true,
                      );
                    }}
                    onOpenChange={(open) =>
                      !open &&
                      formik.setFieldTouched(
                        "receivedOrCollectedBy",
                        true,
                        true,
                      )
                    }
                    disabled={
                      isCreating ||
                      formik.isSubmitting ||
                      warehouseManagerState.isLoading ||
                      Boolean(warehouseManagerState.error)
                    }
                  >
                    <SelectTrigger
                      id="purchase-received-or-collected-by"
                      aria-invalid={Boolean(
                        errorFor("receivedOrCollectedBy") ||
                          warehouseManagerState.error,
                      )}
                      aria-describedby={
                        errorFor("receivedOrCollectedBy") ||
                        warehouseManagerState.error
                          ? "purchase-received-or-collected-by-error"
                          : warehouseManagerState.isLoading
                            ? "purchase-received-or-collected-by-loading"
                            : undefined
                      }
                    >
                      <SelectValue
                        placeholder={
                          warehouseManagerState.isLoading
                            ? "Loading warehouse managers..."
                            : "Select a warehouse manager"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouseManagerState.items.length === 0 && (
                        <SelectItem value="no-warehouse-managers" disabled>
                          No warehouse managers available
                        </SelectItem>
                      )}
                      {warehouseManagerState.items.map((employee) => (
                        <SelectItem key={employee.value} value={employee.value}>
                          {employee.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {warehouseManagerState.isLoading && (
                    <p
                      id="purchase-received-or-collected-by-loading"
                      role="status"
                      aria-live="polite"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <LoaderCircle
                        className="size-3.5 animate-spin"
                        aria-hidden="true"
                      />
                      Loading warehouse managers from the server...
                    </p>
                  )}
                </>
              </PurchaseOrderFormField>
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
