import { createElement, useRef } from "react";
import { useFormik } from "formik";
import { Boxes, CircleAlert, IndianRupee, Sparkles } from "lucide-react";

import {
  AGENCY_OPTIONS,
  INDIAN_GST_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS,
} from "@Enums";
import {
  PRODUCT_CODE_MAX_LENGTH,
  PRODUCT_CODE_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DISCOUNT_AMOUNT_MAX,
  PRODUCT_DISCOUNT_PERCENTAGE_MAX,
  PRODUCT_MODEL_NUMBER_MAX_LENGTH,
  PRODUCT_MODEL_NUMBER_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_PURCHASE_PRICE_MAX,
  PRODUCT_SALE_PRICE_MAX,
} from "@Forms/product/product.validation.constants";
import { productValidationSchema } from "@Forms/product/product.validation.schema";
import { Button } from "@shadcnComponent/button";
import { DialogFooter } from "@shadcnComponent/dialog";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";
import { Textarea } from "@shadcnComponent/textarea";
import { generateProductCode } from "@screenComponent/products/product.utils";

const discountRangeValue = (value, boundary) => {
  if (value && typeof value === "object") return value[boundary] ?? "";
  return value ?? "";
};

const toProductFormValues = (product) => ({
  ...product,
  purchasePrice: product.purchasePrice ?? "",
  salePrice: product.salePrice ?? "",
  gstPercentage: product.gstPercentage ?? "",
  discountAmountMin: discountRangeValue(product.discountAmount, "min"),
  discountAmountMax: discountRangeValue(product.discountAmount, "max"),
  discountPercentageMin: discountRangeValue(
    product.discountPercentage,
    "min",
  ),
  discountPercentageMax: discountRangeValue(
    product.discountPercentage,
    "max",
  ),
});

const roundedCommercialValue = (value) =>
  Number.isFinite(value) ? String(Math.round(value * 100) / 100) : "";

function FormField({ id, label, required = false, error, children }) {
  return (
    <div className="grid content-start gap-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
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

function SectionHeading({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3 border-b pb-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        {createElement(icon, { className: "size-4", "aria-hidden": true })}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function ProductSelect({
  id,
  field,
  placeholder,
  options,
  formik,
  error,
  numeric = false,
}) {
  return (
    <Select
      value={
        formik.values[field] === "" || formik.values[field] === undefined
          ? ""
          : String(formik.values[field])
      }
      onValueChange={(value) =>
        formik.setFieldValue(field, numeric ? Number(value) : value, true)
      }
      onOpenChange={(open) =>
        !open && formik.setFieldTouched(field, true, true)
      }
    >
      <SelectTrigger
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="aria-invalid:border-destructive aria-invalid:ring-destructive/20"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ProductForm({
  product,
  onSubmit,
  onCancel,
  submitLabel,
  isSubmitting,
}) {
  const discountSourceRef = useRef({ Min: "amount", Max: "amount" });
  const formik = useFormik({
    initialValues: toProductFormValues(product),
    validationSchema: productValidationSchema,
    onSubmit: (values) => onSubmit(productValidationSchema.cast(values)),
  });
  const isBusy = isSubmitting || formik.isSubmitting;
  const fieldError = (field) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;
  const inputProps = (field, id) => ({
    name: field,
    value: formik.values[field] ?? "",
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    "aria-invalid": Boolean(fieldError(field)),
    "aria-describedby": fieldError(field) ? `${id}-error` : undefined,
  });

  const updateCommercialValues = (field, value) => {
    formik.setValues((current) => {
      const next = { ...current, [field]: value };
      const salePrice = Number(field === "salePrice" ? value : current.salePrice);

      if (field.startsWith("discountAmount")) {
        const boundary = field.endsWith("Min") ? "Min" : "Max";
        discountSourceRef.current[boundary] = "amount";
        const discountAmount = Number(value);
        next[`discountPercentage${boundary}`] =
          value !== "" && salePrice > 0
            ? roundedCommercialValue((discountAmount / salePrice) * 100)
            : "";
      }

      if (field.startsWith("discountPercentage")) {
        const boundary = field.endsWith("Min") ? "Min" : "Max";
        discountSourceRef.current[boundary] = "percentage";
        const discountPercentage = Number(value);
        next[`discountAmount${boundary}`] =
          value !== "" && salePrice > 0
            ? roundedCommercialValue((salePrice * discountPercentage) / 100)
            : "";
      }

      if (field === "salePrice") {
        ["Min", "Max"].forEach((boundary) => {
          if (discountSourceRef.current[boundary] === "percentage") {
            const percentageField = `discountPercentage${boundary}`;
            const discountPercentage = Number(current[percentageField]);
            next[`discountAmount${boundary}`] =
              current[percentageField] !== "" && salePrice > 0
                ? roundedCommercialValue(
                    (salePrice * discountPercentage) / 100,
                  )
                : "";
          } else {
            const amountField = `discountAmount${boundary}`;
            const discountAmount = Number(current[amountField]);
            next[`discountPercentage${boundary}`] =
              current[amountField] !== "" && salePrice > 0
                ? roundedCommercialValue((discountAmount / salePrice) * 100)
                : "";
          }
        });
      }

      return next;
    }, true);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8" noValidate>
      <section className="space-y-5">
        <SectionHeading
          icon={Boxes}
          title="Product information"
          description="Basic information used to identify and classify the product."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="product-code"
            label="Product code"
          required
          error={fieldError("productCode")}
        >
            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
              <Input
                id="product-code"
                {...inputProps("productCode", "product-code")}
                placeholder="e.g. MOT-001"
                minLength={PRODUCT_CODE_MIN_LENGTH}
                maxLength={PRODUCT_CODE_MAX_LENGTH}
              />
              <Button
                type="button"
                variant="outline"
                disabled={Boolean(formik.values.productCode?.trim()) || isBusy}
                onClick={() => {
                  formik.setFieldValue(
                    "productCode",
                    generateProductCode(),
                    true,
                  );
                  formik.setFieldTouched("productCode", true, false);
                }}
              >
                <Sparkles className="size-4" />
                Generate code
              </Button>
            </div>
          </FormField>
          <FormField
            id="product-name"
            label="Product name"
            required
            error={fieldError("name")}
          >
            <Input
              id="product-name"
              {...inputProps("name", "product-name")}
              placeholder="e.g. Industrial motor"
              minLength={PRODUCT_NAME_MIN_LENGTH}
              maxLength={PRODUCT_NAME_MAX_LENGTH}
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="product-category"
            label="Category"
            required
            error={fieldError("category")}
          >
            <ProductSelect
              id="product-category"
              field="category"
              placeholder="Select a category"
              options={PRODUCT_CATEGORY_OPTIONS}
              formik={formik}
              error={fieldError("category")}
            />
          </FormField>
          <FormField
            id="product-agency"
            label="Agency"
            required
            error={fieldError("agency")}
          >
            <ProductSelect
              id="product-agency"
              field="agency"
              placeholder="Select an agency"
              options={AGENCY_OPTIONS}
              formik={formik}
              error={fieldError("agency")}
            />
          </FormField>
        </div>

        <FormField
          id="product-model-number"
          label="Model number"
          error={fieldError("modelNumber")}
        >
          <Input
            id="product-model-number"
            {...inputProps("modelNumber", "product-model-number")}
            placeholder="Optional model number"
            minLength={PRODUCT_MODEL_NUMBER_MIN_LENGTH}
            maxLength={PRODUCT_MODEL_NUMBER_MAX_LENGTH}
          />
        </FormField>

        <FormField
          id="product-description"
          label="Description"
          error={fieldError("description")}
        >
          <Textarea
            id="product-description"
            {...inputProps("description", "product-description")}
            placeholder="Optional product description"
            rows={4}
            minLength={PRODUCT_DESCRIPTION_MIN_LENGTH}
            maxLength={PRODUCT_DESCRIPTION_MAX_LENGTH}
          />
        </FormField>
      </section>

      <section className="space-y-5">
        <SectionHeading
          icon={IndianRupee}
          title="Commercial values"
          description="Set prices, tax, and the available discount range. Amount and percentage update each other using the sale price."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="product-purchase-price"
            label="Purchase price"
            error={fieldError("purchasePrice")}
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ₹
              </span>
              <Input
                id="product-purchase-price"
                type="number"
                min="0"
                max={PRODUCT_PURCHASE_PRICE_MAX}
                step="0.01"
                inputMode="decimal"
                {...inputProps("purchasePrice", "product-purchase-price")}
                className="pl-7"
              />
            </div>
          </FormField>

          <FormField
            id="product-sale-price"
            label="Sale price"
            error={fieldError("salePrice")}
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ₹
              </span>
              <Input
                id="product-sale-price"
                type="number"
                min="0"
                max={PRODUCT_SALE_PRICE_MAX}
                step="0.01"
                inputMode="decimal"
                {...inputProps("salePrice", "product-sale-price")}
                onChange={(event) =>
                  updateCommercialValues("salePrice", event.target.value)
                }
                className="pl-7"
              />
            </div>
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="product-gst-percentage"
            label="GST percentage"
            error={fieldError("gstPercentage")}
          >
            <ProductSelect
              id="product-gst-percentage"
              field="gstPercentage"
              placeholder="Select GST rate"
              options={INDIAN_GST_OPTIONS}
              formik={formik}
              error={fieldError("gstPercentage")}
              numeric
            />
          </FormField>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Discount amount range
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                ["Min", "Minimum"],
                ["Max", "Maximum"],
              ].map(([boundary, label]) => {
                const field = `discountAmount${boundary}`;
                const id = `product-discount-amount-${boundary.toLowerCase()}`;

                return (
                  <FormField
                    key={field}
                    id={id}
                    label={label}
                    error={fieldError(field)}
                  >
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        id={id}
                        type="number"
                        min="0"
                        max={PRODUCT_DISCOUNT_AMOUNT_MAX}
                        step="0.01"
                        inputMode="decimal"
                        {...inputProps(field, id)}
                        onChange={(event) =>
                          updateCommercialValues(field, event.target.value)
                        }
                        className="pl-7"
                      />
                    </div>
                  </FormField>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Discount percentage range
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                ["Min", "Minimum"],
                ["Max", "Maximum"],
              ].map(([boundary, label]) => {
                const field = `discountPercentage${boundary}`;
                const id = `product-discount-percentage-${boundary.toLowerCase()}`;

                return (
                  <FormField
                    key={field}
                    id={id}
                    label={label}
                    error={fieldError(field)}
                  >
                    <div className="relative">
                      <Input
                        id={id}
                        type="number"
                        min="0"
                        max={PRODUCT_DISCOUNT_PERCENTAGE_MAX}
                        step="0.01"
                        inputMode="decimal"
                        {...inputProps(field, id)}
                        onChange={(event) =>
                          updateCommercialValues(field, event.target.value)
                        }
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                  </FormField>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <DialogFooter className="border-t pt-6">
        <Button
          type="button"
          variant="outline"
          disabled={isBusy}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isBusy}>
          {isBusy ? "Saving..." : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default ProductForm;
