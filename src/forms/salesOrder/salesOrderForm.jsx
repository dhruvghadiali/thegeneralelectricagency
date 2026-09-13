import { useMemo, useState } from "react";
import { useFormik } from "formik";
import { PackageCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PurchaseOrderFormField from "@Forms/purchaseOrder/components/purchaseOrderFormField";
import PurchaseOrderSectionHeading from "@Forms/purchaseOrder/components/purchaseOrderSectionHeading";
import { SearchableApiSelect } from "@Forms/purchaseOrder/components/purchaseOrderSelectors";
import { useSalesOrderCompanyOptions } from "@Forms/salesOrder/hooks/useSalesOrderCompanyOptions";
import { SALES_ORDER_INITIAL_VALUES } from "@Forms/salesOrder/salesOrder.initialValues";
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

function SalesOrderForm() {
  const navigate = useNavigate();
  const [customerQuery, setCustomerQuery] = useState("");
  const [supplierQuery, setSupplierQuery] = useState("");
  const [selectedCustomerLabel, setSelectedCustomerLabel] = useState("");
  const [selectedSupplierLabel, setSelectedSupplierLabel] = useState("");
  const companyOptions = useSalesOrderCompanyOptions();
  const formik = useFormik({
    initialValues: SALES_ORDER_INITIAL_VALUES,
    validationSchema: salesOrderValidationSchema,
    onSubmit: () => undefined,
  });
  const customerOptions = useMemo(
    () => toSearchableOptions(companyOptions.customers, customerQuery),
    [companyOptions.customers, customerQuery],
  );
  const supplierOptions = useMemo(
    () => toSearchableOptions(companyOptions.suppliers, supplierQuery),
    [companyOptions.suppliers, supplierQuery],
  );
  const customerError =
    formik.touched.customer && formik.errors.customer
      ? formik.errors.customer
      : null;
  const supplierError =
    formik.touched.supplier && formik.errors.supplier
      ? formik.errors.supplier
      : null;

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
                description="Select the customer and supplier for this sales order."
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
                    onSelect={(option) => {
                      formik.setFieldValue("supplier", option.value, true);
                      setSelectedSupplierLabel(option.label);
                    }}
                    onBlur={() =>
                      formik.setFieldTouched("supplier", true, true)
                    }
                  />
                </PurchaseOrderFormField>
              </div>
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
