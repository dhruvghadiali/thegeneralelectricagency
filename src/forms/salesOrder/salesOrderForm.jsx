import { useMemo, useState } from "react";
import { useFormik } from "formik";
import { PackageCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PurchaseOrderFormField from "@Forms/purchaseOrder/components/purchaseOrderFormField";
import PurchaseOrderSectionHeading from "@Forms/purchaseOrder/components/purchaseOrderSectionHeading";
import { SearchableApiSelect } from "@Forms/purchaseOrder/components/purchaseOrderSelectors";
import { useSalesOrderCustomerOptions } from "@Forms/salesOrder/hooks/useSalesOrderCustomerOptions";
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

function SalesOrderForm() {
  const navigate = useNavigate();
  const [customerQuery, setCustomerQuery] = useState("");
  const [selectedCustomerLabel, setSelectedCustomerLabel] = useState("");
  const customerState = useSalesOrderCustomerOptions(customerQuery);
  const formik = useFormik({
    initialValues: SALES_ORDER_INITIAL_VALUES,
    validationSchema: salesOrderValidationSchema,
    onSubmit: () => undefined,
  });
  const customerOptions = useMemo(
    () =>
      customerState.items.map((company) => ({
        value: String(company.id),
        label: company.name,
      })),
    [customerState.items],
  );
  const customerError =
    formik.touched.customer && formik.errors.customer
      ? formik.errors.customer
      : null;

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <section className="max-w-3xl">
        <p className="text-sm font-medium text-primary">Sales orders</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Add sales order
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the customer information for the new sales order.
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
                description="Select the customer for this sales order."
              />

              <PurchaseOrderFormField
                id="sales-customer"
                label="Customer"
                required
                hint="Only active Customer and Supplier & customer companies are shown."
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
                  isLoading={customerState.isLoading}
                  error={customerState.error}
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
