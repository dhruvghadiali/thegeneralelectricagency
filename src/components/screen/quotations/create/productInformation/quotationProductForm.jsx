import {
  QUOTATION_PRODUCT_DECIMAL_INPUT_PATTERN,
  QUOTATION_PRODUCT_INTEGER_INPUT_PATTERN,
} from "@screenComponent/quotations/create/form/createQuotation.validation.constants";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import { Textarea } from "@shadcnComponent/textarea";

function ProductFormField({ id, label, error, children }) {
  return (
    <div className="grid content-start gap-2 self-start">
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

function QuotationProductForm({
  formik,
  fieldError,
  fieldRefs,
  keyboard,
  onProductNameChange,
}) {
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
    <form
      id="quotation-product-form"
      onSubmit={formik.handleSubmit}
      className="grid gap-5"
      noValidate
    >
      <ProductFormField
        id="quotation-product"
        label="Product"
        error={fieldError("product")}
      >
        <Input
          ref={fieldRefs.productInputRef}
          id="quotation-product"
          type="text"
          {...fieldProps("product", "quotation-product")}
          onChange={onProductNameChange}
          onFocus={keyboard.handleProductNameFocus}
          onKeyDown={keyboard.handleProductNameKeyDown}
          placeholder="Enter product name"
          autoComplete="off"
          autoFocus
        />
      </ProductFormField>

      <div className="grid items-start gap-5 sm:grid-cols-3">
        <ProductFormField
          id="quotation-quantity"
          label="Quantity"
          error={fieldError("quantity")}
        >
          <Input
            ref={fieldRefs.quantityInputRef}
            id="quotation-quantity"
            type="text"
            {...fieldProps("quantity", "quotation-quantity")}
            onChange={handleNumericChange(
              "quantity",
              QUOTATION_PRODUCT_INTEGER_INPUT_PATTERN,
            )}
            onKeyDown={keyboard.handleQuantityKeyDown}
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
            ref={fieldRefs.sellingPriceInputRef}
            id="quotation-sellingPrice"
            type="text"
            {...fieldProps("sellingPrice", "quotation-sellingPrice")}
            onChange={handleNumericChange(
              "sellingPrice",
              QUOTATION_PRODUCT_DECIMAL_INPUT_PATTERN,
            )}
            onKeyDown={keyboard.handleSellingPriceKeyDown}
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
            ref={fieldRefs.discountInputRef}
            id="quotation-discount"
            type="text"
            {...fieldProps("discount", "quotation-discount")}
            onChange={handleNumericChange(
              "discount",
              QUOTATION_PRODUCT_DECIMAL_INPUT_PATTERN,
            )}
            onKeyDown={keyboard.handleDiscountKeyDown}
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
          ref={fieldRefs.descriptionInputRef}
          id="quotation-description"
          {...fieldProps("description", "quotation-description")}
          onKeyDown={keyboard.handleDescriptionKeyDown}
          placeholder="Enter product description"
          rows={4}
          className="min-h-28 resize-y"
        />
      </ProductFormField>
    </form>
  );
}

export default QuotationProductForm;
