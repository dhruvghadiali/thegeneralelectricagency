import ProductCommercialSection from "@Forms/product/productDetails/components/productCommercialSection";
import ProductInformationSection from "@Forms/product/productDetails/components/productInformationSection";
import { useProductDetailsForm } from "@Forms/product/productDetails/hooks/useProductDetailsForm";
import { Button } from "@shadcnComponent/button";
import { DialogFooter } from "@shadcnComponent/dialog";

function ProductDetailsForm({ product, onSubmit, onCancel, submitLabel, isSubmitting }) {
  const { fieldError, formik, inputProps, isBusy, updateCommercialValues } =
    useProductDetailsForm({ product, onSubmit, isSubmitting });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8" noValidate>
      <ProductInformationSection
        formik={formik}
        fieldError={fieldError}
        inputProps={inputProps}
        isBusy={isBusy}
      />
      <ProductCommercialSection
        formik={formik}
        fieldError={fieldError}
        inputProps={inputProps}
        updateCommercialValues={updateCommercialValues}
      />
      <DialogFooter className="border-t pt-6">
        <Button type="button" variant="outline" disabled={isBusy} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isBusy}>
          {isBusy ? "Saving..." : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default ProductDetailsForm;
