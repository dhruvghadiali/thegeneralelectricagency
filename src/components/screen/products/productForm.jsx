import { useFormik } from "formik";
import { CircleAlert, Sparkles } from "lucide-react";

import { AGENCY_OPTIONS, PRODUCT_CATEGORY_OPTIONS } from "@Enums";
import {
  PRODUCT_CODE_MAX_LENGTH,
  PRODUCT_CODE_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_MODEL_NUMBER_MAX_LENGTH,
  PRODUCT_MODEL_NUMBER_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_NAME_MIN_LENGTH,
} from "@Forms/product/product.validation.constants";
import { productValidationSchema } from "@Forms/product/product.validation.schema";
import { Button } from "@shadcnComponent/button";
import { DialogClose, DialogFooter } from "@shadcnComponent/dialog";
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

function ProductSelect({ id, field, placeholder, options, formik, error }) {
  return (
    <Select
      value={formik.values[field]}
      onValueChange={(value) => formik.setFieldValue(field, value, true)}
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

function ProductForm({ product, onSubmit, submitLabel, isSubmitting }) {
  const formik = useFormik({
    initialValues: product,
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

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="product-code"
          label="Product code"
          required
          error={fieldError("productCode")}
        >
          <Input
            id="product-code"
            {...inputProps("productCode", "product-code")}
            placeholder="e.g. MOT-001"
            minLength={PRODUCT_CODE_MIN_LENGTH}
            maxLength={PRODUCT_CODE_MAX_LENGTH}
          />
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

      <div className="grid gap-4 sm:grid-cols-2">
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

      <DialogFooter className="mt-2">
        <Button
          type="button"
          variant="outline"
          disabled={Boolean(formik.values.productCode?.trim()) || isBusy}
          onClick={() => {
            formik.setFieldValue("productCode", generateProductCode(), true);
            formik.setFieldTouched("productCode", true, false);
          }}
        >
          <Sparkles className="size-4" />
          Generate code
        </Button>
        <DialogClose asChild>
          <Button type="button" variant="outline" disabled={isBusy}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isBusy}>
          {isBusy ? "Saving..." : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default ProductForm;
