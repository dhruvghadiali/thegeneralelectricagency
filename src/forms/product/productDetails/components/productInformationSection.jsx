import { Boxes, Sparkles } from "lucide-react";

import { Input } from "@shadcnComponent/input";
import { Button } from "@shadcnComponent/button";
import { PRODUCT_CATEGORY_OPTIONS } from "@Enums";
import { Textarea } from "@shadcnComponent/textarea";
import { generateProductCode } from "@Forms/product/productDetails/productDetails.helpers";
import {
  PRODUCT_CODE_MAX_LENGTH,
  PRODUCT_CODE_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_MODEL_NUMBER_MAX_LENGTH,
  PRODUCT_MODEL_NUMBER_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_NAME_MIN_LENGTH,
} from "@Forms/product/productDetails/productDetails.validation.constants";

import ProductSelect from "@Forms/product/productDetails/components/productSelect";
import ProductFormField from "@Forms/product/productDetails/components/productFormField";
import CompanySearchSelect from "@Forms/product/productDetails/components/companySearchSelect";
import ProductSectionHeading from "@Forms/product/productDetails/components/productSectionHeading";

function ProductInformationSection({ formik, fieldError, inputProps, isBusy }) {
  return (
    <section className="space-y-5">
      <ProductSectionHeading
        icon={Boxes}
        title="Product information"
        description="Basic information used to identify and classify the product."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <ProductFormField
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
        </ProductFormField>
        <ProductFormField
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
        </ProductFormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <ProductFormField
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
        </ProductFormField>
        <ProductFormField
          id="product-agency"
          label="Company"
          required
          error={fieldError("agency")}
        >
          <CompanySearchSelect
            formik={formik}
            error={fieldError("agency")}
            isBusy={isBusy}
          />
        </ProductFormField>
      </div>
      <ProductFormField
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
      </ProductFormField>
      <ProductFormField
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
      </ProductFormField>
    </section>
  );
}

export default ProductInformationSection;
