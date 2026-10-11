import { useMemo, useState } from "react";
import { getIn, useFormik } from "formik";
import { PackageCheck, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PurchaseOrderFormField from "@Forms/purchaseOrder/components/purchaseOrderFormField";
import PurchaseOrderSectionHeading from "@Forms/purchaseOrder/components/purchaseOrderSectionHeading";
import { SearchableApiSelect } from "@Forms/purchaseOrder/components/purchaseOrderSelectors";
import SalesOrderProductFields from "@Forms/salesOrder/components/salesOrderProductFields";
import { useSalesOrderCompanyOptions } from "@Forms/salesOrder/hooks/useSalesOrderCompanyOptions";
import { useSalesOrderProductOptions } from "@Forms/salesOrder/hooks/useSalesOrderProductOptions";
import {
  EMPTY_SALES_ORDER_PRODUCT,
  SALES_ORDER_INITIAL_VALUES,
} from "@Forms/salesOrder/salesOrder.initialValues";
import {
  salesOrderProductValues,
  updateSalesOrderProductValue,
} from "@Forms/salesOrder/salesOrderForm.utils";
import { salesOrderValidationSchema } from "@Forms/salesOrder/salesOrder.validation.schema";
import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";
import { ROUTES } from "@routes/navigate";

function toSearchableOptions(companies, query) {
  const normalizedQuery = query.trim().toLowerCase();

  return companies
    .filter(
      (company) =>
        !normalizedQuery ||
        company.name.toLowerCase().includes(normalizedQuery),
    )
    .map((company) => ({
      value: String(company.id),
      label: company.name,
    }));
}

function toProductOptions(products, query) {
  const normalizedQuery = query.trim().toLowerCase();

  return products
    .filter((product) => {
      const searchableValue = [product.name, product.productCode]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return !normalizedQuery || searchableValue.includes(normalizedQuery);
    })
    .map((product) => ({
      value: String(product.id),
      label: [product.name, product.productCode].filter(Boolean).join(" · "),
      product,
    }));
}

function SalesOrderForm() {
  const navigate = useNavigate();
  const [customerQuery, setCustomerQuery] = useState("");
  const [supplierQuery, setSupplierQuery] = useState("");
  const [productQuery, setProductQuery] = useState("");
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [selectedCustomerLabel, setSelectedCustomerLabel] = useState("");
  const [selectedSupplierLabel, setSelectedSupplierLabel] = useState("");
  const [selectedProductLabels, setSelectedProductLabels] = useState({});
  const companyOptions = useSalesOrderCompanyOptions();
  const formik = useFormik({
    initialValues: SALES_ORDER_INITIAL_VALUES,
    validationSchema: salesOrderValidationSchema,
    onSubmit: () => undefined,
  });
  const productState = useSalesOrderProductOptions(formik.values.supplier);
  const customerOptions = useMemo(
    () => toSearchableOptions(companyOptions.customers, customerQuery),
    [companyOptions.customers, customerQuery],
  );
  const supplierOptions = useMemo(
    () => toSearchableOptions(companyOptions.suppliers, supplierQuery),
    [companyOptions.suppliers, supplierQuery],
  );
  const productOptions = useMemo(
    () => toProductOptions(productState.items, productQuery),
    [productQuery, productState.items],
  );
  const errorFor = (field) => {
    const error = getIn(formik.errors, field);
    return getIn(formik.touched, field) && typeof error === "string"
      ? error
      : null;
  };
  const customerError =
    formik.touched.customer && formik.errors.customer
      ? formik.errors.customer
      : null;
  const supplierError =
    formik.touched.supplier && formik.errors.supplier
      ? formik.errors.supplier
      : null;
  const selectSupplier = (option) => {
    formik.setValues(
      (current) => ({
        ...current,
        supplier: option.value,
        products: [{ ...EMPTY_SALES_ORDER_PRODUCT }],
      }),
      true,
    );
    setSelectedSupplierLabel(option.label);
    setSelectedProductLabels({});
    setProductQuery("");
    setActiveProductIndex(0);
  };
  const addProduct = () => {
    const nextIndex = formik.values.products.length;
    formik.setFieldValue(
      "products",
      [...formik.values.products, { ...EMPTY_SALES_ORDER_PRODUCT }],
      false,
    );
    setProductQuery("");
    setActiveProductIndex(nextIndex);
  };
  const selectProduct = (index, option) => {
    formik.setFieldValue(
      `products[${index}]`,
      salesOrderProductValues(option.product),
      true,
    );
    setSelectedProductLabels((current) => ({
      ...current,
      [index]: option.label,
    }));
    setProductQuery("");
  };
  const updateProductValue = (index, field, value) => {
    formik.setValues(
      (current) => ({
        ...current,
        products: current.products.map((product, productIndex) =>
          productIndex === index
            ? updateSalesOrderProductValue(product, field, value)
            : product,
        ),
      }),
      true,
    );
  };
  const removeProduct = (removedIndex) => {
    const nextProducts = formik.values.products.filter(
      (_, index) => index !== removedIndex,
    );
    formik.setFieldValue("products", nextProducts, true);
    setSelectedProductLabels((current) => {
      const nextLabels = {};

      formik.values.products.forEach((_, index) => {
        if (index === removedIndex) return;
        nextLabels[index > removedIndex ? index - 1 : index] = current[index];
      });

      return nextLabels;
    });
    setActiveProductIndex((current) => {
      if (current > removedIndex) return current - 1;
      if (current === removedIndex) {
        return Math.min(removedIndex, nextProducts.length - 1);
      }
      return current;
    });
    setProductQuery("");
  };

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <section className="max-w-3xl">
        <p className="text-sm font-medium text-primary">Sales orders</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Add sales order
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the customer and supplier information for the new sales order.
        </p>
      </section>

      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle>Sales details</CardTitle>
          <CardDescription>
            Fields marked with an asterisk must be completed before saving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-8" noValidate>
            <section className="space-y-5">
              <PurchaseOrderSectionHeading
                icon={PackageCheck}
                title="Order information"
                description="Select the customer and supplier, then add one or more active products."
                action={
                  <Button
                    type="button"
                    variant="outline"
                    disabled={
                      !formik.values.supplier ||
                      productState.isLoading ||
                      Boolean(productState.error) ||
                      formik.values.products.length >= productState.items.length
                    }
                    onClick={addProduct}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    Add product
                  </Button>
                }
              />

              <div className="grid gap-4 md:grid-cols-2">
                <PurchaseOrderFormField
                  id="sales-customer"
                  label="Customer"
                  required
                  hint="Shows active Customer and Supplier & customer companies."
                  error={customerError}
                >
                  <SearchableApiSelect
                    id="sales-customer"
                    label="Customer"
                    value={formik.values.customer}
                    selectedLabel={selectedCustomerLabel}
                    placeholder="Search and select a customer"
                    searchPlaceholder="Search customers"
                    query={customerQuery}
                    onQueryChange={setCustomerQuery}
                    options={customerOptions}
                    isLoading={companyOptions.isLoading}
                    error={companyOptions.error}
                    fieldError={customerError}
                    onSelect={(option) => {
                      formik.setFieldValue("customer", option.value, true);
                      setSelectedCustomerLabel(option.label);
                    }}
                    onBlur={() =>
                      formik.setFieldTouched("customer", true, true)
                    }
                  />
                </PurchaseOrderFormField>

                <PurchaseOrderFormField
                  id="sales-supplier"
                  label="Supplier"
                  required
                  hint="Shows active Supplier and Supplier & customer companies."
                  error={supplierError}
                >
                  <SearchableApiSelect
                    id="sales-supplier"
                    label="Supplier"
                    value={formik.values.supplier}
                    selectedLabel={selectedSupplierLabel}
                    placeholder="Search and select a supplier"
                    searchPlaceholder="Search suppliers"
                    query={supplierQuery}
                    onQueryChange={setSupplierQuery}
                    options={supplierOptions}
                    isLoading={companyOptions.isLoading}
                    error={companyOptions.error}
                    fieldError={supplierError}
                    onSelect={selectSupplier}
                    onBlur={() =>
                      formik.setFieldTouched("supplier", true, true)
                    }
                  />
                </PurchaseOrderFormField>
              </div>

              <SalesOrderProductFields
                activeIndex={activeProductIndex}
                products={formik.values.products}
                supplierSelected={Boolean(formik.values.supplier)}
                productOptions={productOptions}
                productState={productState}
                productQuery={productQuery}
                selectedLabels={selectedProductLabels}
                errorFor={errorFor}
                onActiveIndexChange={(index) => {
                  setActiveProductIndex(index);
                  setProductQuery("");
                }}
                onProductQueryChange={setProductQuery}
                onProductBlur={(field) =>
                  formik.setFieldTouched(field, true, true)
                }
                onSelect={selectProduct}
                onRemove={removeProduct}
                onFieldChange={updateProductValue}
                onFieldBlur={(field) =>
                  formik.setFieldTouched(field, true, true)
                }
              />
            </section>

            <div className="flex border-t pt-6 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => navigate(ROUTES.SALES)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default SalesOrderForm;
