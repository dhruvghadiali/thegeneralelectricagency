import { Undo2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Textarea } from "@shadcnComponent/textarea";

import {
  QUOTATION_PRODUCT_DECIMAL_INPUT_PATTERN,
  QUOTATION_PRODUCT_INTEGER_INPUT_PATTERN,
} from "@screenComponent/quotations/form/quotationForm.validation.constants";

import ProductInformationField from "@screenComponent/quotations/form/productInformation/productInformationField";
import QuotationProductSelect from "@screenComponent/quotations/form/productInformation/quotationProductSelect";

function QuotationProductForm({
  formik,
  fieldError,
  fieldRefs,
  keyboard,
  canUndoProductDescription,
  onUndoProductDescription,
  onProductNameChange,
  onProductNameBlur,
  onSellingPriceChange,
  onDiscountPercentageChange,
  onDiscountChange,
  onProductSelect,
  onProductClear,
}) {
  const productError = fieldError("product") || fieldError("productId");
  const fieldProps = (field, id) => {
    const error = field === "product" ? productError : fieldError(field);

    return {
      name: field,
      value: formik.values[field],
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      "aria-invalid": Boolean(error),
      "aria-describedby": error ? `${id}-error` : undefined,
    };
  };
  const handleNumericChange = (field, pattern, onChange) => (event) => {
    if (pattern.test(event.target.value)) {
      if (onChange) {
        onChange(event.target.value);
        return;
      }

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
      <ProductInformationField
        id="quotation-product"
        label="Product"
        error={productError}
      >
        <div className="hidden lg:block">
          <Input
            ref={fieldRefs.productInputRef}
            id="quotation-product"
            type="text"
            {...fieldProps("product", "quotation-product")}
            onChange={onProductNameChange}
            onBlur={onProductNameBlur}
            onFocus={keyboard.handleProductNameFocus}
            onKeyDown={keyboard.handleProductNameKeyDown}
            className="uppercase placeholder:normal-case"
            placeholder="Enter product name"
            autoComplete="off"
            autoFocus
          />
        </div>
        <QuotationProductSelect
          value={formik.values.product}
          onProductSelect={onProductSelect}
          onProductClear={onProductClear}
        />
      </ProductInformationField>

      <div className="grid items-start gap-5 sm:grid-cols-2">
        <ProductInformationField
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
        </ProductInformationField>

        <ProductInformationField
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
              onSellingPriceChange,
            )}
            onKeyDown={keyboard.handleSellingPriceKeyDown}
            placeholder="0.00"
            inputMode="decimal"
          />
        </ProductInformationField>
      </div>

      <div className="grid items-start gap-5 sm:grid-cols-2">
        <ProductInformationField
          id="quotation-discountPercentage"
          label="Discount (%)"
          error={fieldError("discountPercentage")}
        >
          <Input
            ref={fieldRefs.discountPercentageInputRef}
            id="quotation-discountPercentage"
            type="text"
            {...fieldProps(
              "discountPercentage",
              "quotation-discountPercentage",
            )}
            onChange={handleNumericChange(
              "discountPercentage",
              QUOTATION_PRODUCT_DECIMAL_INPUT_PATTERN,
              onDiscountPercentageChange,
            )}
            onKeyDown={keyboard.handleDiscountPercentageKeyDown}
            placeholder="0.00"
            inputMode="decimal"
          />
        </ProductInformationField>

        <ProductInformationField
          id="quotation-discount"
          label="Discount (Rupees)"
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
              onDiscountChange,
            )}
            onKeyDown={keyboard.handleDiscountKeyDown}
            placeholder="0.00"
            inputMode="decimal"
          />
        </ProductInformationField>
      </div>

      <ProductInformationField
        id="quotation-description"
        label="Description"
        error={fieldError("description")}
        action={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!canUndoProductDescription}
            onClick={onUndoProductDescription}
            aria-label="Restore original product description"
            aria-keyshortcuts="Alt+Z"
            title="Restore original product description (Alt+Z)"
            className="h-7 px-2"
          >
            <Undo2 className="size-3.5" aria-hidden="true" />
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted-foreground">
              Alt+Z
            </kbd>
          </Button>
        }
      >
        <Textarea
          ref={fieldRefs.descriptionInputRef}
          id="quotation-description"
          {...fieldProps("description", "quotation-description")}
          onBeforeInput={keyboard.handleDescriptionBeforeInput}
          onKeyDown={keyboard.handleDescriptionKeyDown}
          placeholder="Enter product description"
          rows={4}
          className="min-h-28 resize-y"
        />
      </ProductInformationField>
    </form>
  );
}

export default QuotationProductForm;
