import ProductCommercialSection from "@Forms/product/productDetails/components/productCommercialSection";
import ProductInformationSection from "@Forms/product/productDetails/components/productInformationSection";
import { useProductDetailsForm } from "@Forms/product/productDetails/hooks/useProductDetailsForm";
import { Button } from "@shadcnComponent/button";
import { DialogFooter } from "@shadcnComponent/dialog";

function ProductDetailsForm({
  product,
  onSubmit,
  onCancel,
  submitLabel,
  isSubmitting,
}) {
  const { fieldError, formik, inputProps, isBusy, updateCommercialValues } =
    useProductDetailsForm({ product, onSubmit, isSubmitting });
  const FormContainer = onSubmit ? "form" : "div";

  return (
    <FormContainer
      onSubmit={onSubmit ? formik.handleSubmit : undefined}
      className="space-y-8"
      noValidate={onSubmit ? true : undefined}
    >
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
      {onSubmit && (
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
      )}
    </FormContainer>
  );
}

export default ProductDetailsForm;
