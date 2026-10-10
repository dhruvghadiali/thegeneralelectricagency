import { useFormik } from "formik";

import { QUOTATION_PRODUCT_INITIAL_VALUES } from "@screenComponent/quotations/create/form/createQuotation.initialValues";
import {
  QUOTATION_PRODUCT_DECIMAL_INPUT_PATTERN,
  QUOTATION_PRODUCT_INTEGER_INPUT_PATTERN,
} from "@screenComponent/quotations/create/form/createQuotation.validation.constants";
import { quotationProductValidationSchema } from "@screenComponent/quotations/create/form/createQuotation.validation.schema";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import { Textarea } from "@shadcnComponent/textarea";

function ProductFormField({ id, label, error, children }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function QuotationProductForm() {
  const formik = useFormik({
    initialValues: QUOTATION_PRODUCT_INITIAL_VALUES,
    validationSchema: quotationProductValidationSchema,
    onSubmit: () => undefined,
  });
  const fieldError = (field) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;
  const fieldProps = (field, id) => ({
    name: field,
    value: formik.values[field],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    "aria-invalid": Boolean(fieldError(field)),
    "aria-describedby": fieldError(field) ? `${id}-error` : undefined,
  });
  const handleNumericChange = (field, pattern) => (event) => {
    if (pattern.test(event.target.value)) {
      formik.setFieldValue(field, event.target.value, true);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-5" noValidate>
      <ProductFormField
        id="quotation-product"
        label="Product"
        error={fieldError("product")}
      >
        <Input
          id="quotation-product"
          type="text"
          {...fieldProps("product", "quotation-product")}
          placeholder="Enter product name"
          autoComplete="off"
        />
      </ProductFormField>

      <div className="grid gap-5 sm:grid-cols-3">
        <ProductFormField
          id="quotation-quantity"
          label="Quantity"
          error={fieldError("quantity")}
        >
          <Input
            id="quotation-quantity"
            type="text"
            {...fieldProps("quantity", "quotation-quantity")}
            onChange={handleNumericChange(
              "quantity",
              QUOTATION_PRODUCT_INTEGER_INPUT_PATTERN,
            )}
            placeholder="1"
            inputMode="numeric"
          />
        </ProductFormField>

        <ProductFormField
          id="quotation-sellingPrice"
          label="Sale Price"
          error={fieldError("sellingPrice")}
        >
          <Input
            id="quotation-sellingPrice"
            type="text"
            {...fieldProps("sellingPrice", "quotation-sellingPrice")}
            onChange={handleNumericChange(
              "sellingPrice",
              QUOTATION_PRODUCT_DECIMAL_INPUT_PATTERN,
            )}
            placeholder="0.00"
            inputMode="decimal"
          />
        </ProductFormField>

        <ProductFormField
          id="quotation-discount"
          label="Discount"
          error={fieldError("discount")}
        >
          <Input
            id="quotation-discount"
            type="text"
            {...fieldProps("discount", "quotation-discount")}
            onChange={handleNumericChange(
              "discount",
              QUOTATION_PRODUCT_DECIMAL_INPUT_PATTERN,
            )}
            placeholder="0.00"
            inputMode="decimal"
          />
        </ProductFormField>
      </div>

      <ProductFormField
        id="quotation-description"
        label="Description"
        error={fieldError("description")}
      >
        <Textarea
          id="quotation-description"
          {...fieldProps("description", "quotation-description")}
          placeholder="Enter product description"
          rows={4}
          className="min-h-28 resize-y"
        />
      </ProductFormField>
    </form>
  );
}

export default QuotationProductForm;
