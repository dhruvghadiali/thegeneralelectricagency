import { PackageSearch, Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { PURCHASE_CREDIT_SECTION_IDS } from "@Forms/purchaseCredit/purchaseCreditForm.constants";
import { EMPTY_PURCHASE_CREDIT_PRODUCT } from "@Forms/purchaseCredit/purchaseCredit.initialValues";

import FormSection from "@Forms/purchaseCredit/components/sections/formSection";
import PurchaseCreditFormField from "@Forms/purchaseCredit/components/purchaseCreditFormField";
import PurchaseCreditRemoteSelect from "@Forms/purchaseCredit/components/purchaseCreditRemoteSelect";
import PurchaseCreditProductFields from "@Forms/purchaseCredit/components/purchaseCreditProductFields";

function SupplierProductsSection({
  activeSection,
  toggleSection,
  errorCount,
  formik,
  supplierOptions,
  selectedSupplier,
  selectedSupplierLabel,
  supplierQuery,
  setSupplierQuery,
  chooseSupplier,
  productOptions,
  supplierState,
  productState,
  availableProductCount,
  productQuery,
  setProductQuery,
  errorFor,
  inputProps,
  addItem,
  removeItem,
}) {
  const sectionId = PURCHASE_CREDIT_SECTION_IDS.SUPPLIER_PRODUCTS;

  return (
    <FormSection
      id={sectionId}
      icon={PackageSearch}
      title="Supplier and products"
      description="Only active suppliers and their active products are available."
      isOpen={activeSection === sectionId}
      errorCount={errorCount}
      onOpen={() => toggleSection(sectionId)}
      action={
        <Button
          type="button"
          variant="outline"
          disabled={
            !formik.values.supplier ||
            productState.isLoading ||
            formik.values.products.length >= availableProductCount
          }
          onClick={() => addItem("products", EMPTY_PURCHASE_CREDIT_PRODUCT)}
          className="w-full sm:w-auto"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add product
        </Button>
      }
    >
      <PurchaseCreditFormField
        id="purchase-credit-supplier"
        label="Supplier"
        required
        error={errorFor("supplier")}
      >
        <PurchaseCreditRemoteSelect
          id="purchase-credit-supplier"
          label="Supplier"
          value={String(formik.values.supplier ?? "")}
          selectedLabel={
            selectedSupplier?.label ||
            selectedSupplierLabel ||
            (formik.values.supplier ? "Selected supplier" : "")
          }
          placeholder="Search and select a supplier"
          searchPlaceholder="Search active suppliers"
          query={supplierQuery}
          onQueryChange={setSupplierQuery}
          options={supplierOptions}
          isLoading={supplierState.isLoading}
          error={supplierState.error}
          fieldError={errorFor("supplier")}
          allowClear
          onSelect={chooseSupplier}
          onBlur={() => formik.setFieldTouched("supplier", true, true)}
        />
      </PurchaseCreditFormField>
      <PurchaseCreditProductFields
        products={formik.values.products}
        supplierSelected={Boolean(formik.values.supplier)}
        productOptions={productOptions}
        productState={productState}
        availableProductCount={availableProductCount}
        productQuery={productQuery}
        onProductQueryChange={setProductQuery}
        formik={formik}
        errorFor={errorFor}
        inputProps={inputProps}
        onRemove={(index) => removeItem("products", index)}
      />
    </FormSection>
  );
}

export default SupplierProductsSection;
