import { IndianRupee } from "lucide-react";

import { INDIAN_GST_OPTIONS } from "@Enums";
import {
  PRODUCT_PURCHASE_PRICE_MAX,
  PRODUCT_SALE_PRICE_MAX,
} from "@Forms/product/productDetails/productDetails.validation.constants";

import MoneyInput from "@Forms/product/productDetails/components/moneyInput";
import DiscountRange from "@Forms/product/productDetails/components/discountRange";
import ProductSelect from "@Forms/product/productDetails/components/productSelect";
import ProductFormField from "@Forms/product/productDetails/components/productFormField";
import ProductSectionHeading from "@Forms/product/productDetails/components/productSectionHeading";

function ProductCommercialSection({
  formik,
  fieldError,
  inputProps,
  updateCommercialValues,
}) {
  return (
    <section className="space-y-5">
      <ProductSectionHeading
        icon={IndianRupee}
        title="Commercial values"
        description="Set prices, tax, and the available discount range. Amount and percentage update each other using the sale price."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <ProductFormField
          id="product-purchase-price"
          label="Purchase price"
          error={fieldError("purchasePrice")}
        >
          <MoneyInput
            id="product-purchase-price"
            field="purchasePrice"
            max={PRODUCT_PURCHASE_PRICE_MAX}
            inputProps={inputProps}
          />
        </ProductFormField>
        <ProductFormField
          id="product-sale-price"
          label="Sale price"
          error={fieldError("salePrice")}
        >
          <MoneyInput
            id="product-sale-price"
            field="salePrice"
            max={PRODUCT_SALE_PRICE_MAX}
            inputProps={inputProps}
            onChange={(event) =>
              updateCommercialValues("salePrice", event.target.value)
            }
          />
        </ProductFormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <ProductFormField
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
        </ProductFormField>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <DiscountRange
          type="amount"
          title="Discount amount range"
          fieldError={fieldError}
          inputProps={inputProps}
          updateCommercialValues={updateCommercialValues}
        />
        <DiscountRange
          type="percentage"
          title="Discount percentage range"
          fieldError={fieldError}
          inputProps={inputProps}
          updateCommercialValues={updateCommercialValues}
        />
      </div>
    </section>
  );
}

export default ProductCommercialSection;
