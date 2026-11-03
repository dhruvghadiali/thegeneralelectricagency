import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import ProductCompanySelect from "@screenComponent/products/form/productInformation/productCompanySelect";
import ProductCategorySelect from "@screenComponent/products/form/productInformation/productCategorySelect";
import ProductInformationField from "@screenComponent/products/form/productInformation/productInformationField";
import GenerateProductCodeButton from "@screenComponent/products/form/productInformation/generateProductCodeButton";

import { ROUTES } from "@routes/navigate";
import { Input } from "@shadcnComponent/input";
import { Button } from "@shadcnComponent/button";
import { Textarea } from "@shadcnComponent/textarea";
import { createProduct } from "@Redux/product/createProduct/createProduct.action";
import { selectProductCreateSubmitState } from "@Redux/product/createProduct/createProduct.selector";
import { migrateProductFromTally } from "@Redux/product/migrateFromTally/migrateFromTally.action";
import { updateProductInformation } from "@Redux/product/productInformation/productInformation.action";
import { productInformationValidationSchema } from "@screenComponent/products/form/productInformation/productInformation.validation.schema";
import {
  selectProductInformationFormValues,
  selectProductInformationSubmitState,
} from "@Redux/product/productInformation/productInformation.selector";
import {
  selectMigrateFromTallyFormValues,
  selectMigrateFromTallySubmitState,
} from "@Redux/product/migrateFromTally/migrateFromTally.selector";
import {
  PRODUCT_INFORMATION_CODE_MAX_LENGTH,
  PRODUCT_INFORMATION_CODE_MIN_LENGTH,
  PRODUCT_INFORMATION_DESCRIPTION_MAX_LENGTH,
  PRODUCT_INFORMATION_DESCRIPTION_MIN_LENGTH,
  PRODUCT_INFORMATION_HSN_CODE_MAX_LENGTH,
  PRODUCT_INFORMATION_HSN_CODE_MIN_LENGTH,
  PRODUCT_INFORMATION_MODEL_NUMBER_MAX_LENGTH,
  PRODUCT_INFORMATION_MODEL_NUMBER_MIN_LENGTH,
  PRODUCT_INFORMATION_NAME_MAX_LENGTH,
  PRODUCT_INFORMATION_NAME_MIN_LENGTH,
} from "@screenComponent/products/form/productInformation/productInformation.validation.constants";

function ProductInformation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const migrateFromTallyFormValues = useSelector(
    selectMigrateFromTallyFormValues,
  );
  const standardProductFormValues = useSelector(
    selectProductInformationFormValues,
  );
  const {
    tallyProductId,
    isSubmitting: isMigrating,
    error: migrationError,
  } = useSelector(selectMigrateFromTallySubmitState);
  const {
    productId,
    isSubmitting: isUpdating,
    error: updateError,
  } = useSelector(selectProductInformationSubmitState);
  const { isCreateProductSubmitting, createProductError } = useSelector(
    selectProductCreateSubmitState,
  );
  const productInformationFormValues = tallyProductId
    ? migrateFromTallyFormValues
    : standardProductFormValues;
  const isNewProduct = !tallyProductId && !productId;

  const formik = useFormik({
    initialValues: productInformationFormValues,
    enableReinitialize: true,
    validationSchema: productInformationValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const saveAction = tallyProductId
          ? migrateProductFromTally(values)
          : productId
            ? updateProductInformation(values)
            : createProduct(values);

        await dispatch(saveAction).unwrap();
        navigate(ROUTES.PRODUCTS, { replace: true });
      } catch {
        // The active product slice exposes the display-ready request error.
      } finally {
        setSubmitting(false);
      }
    },
  });

  const isSubmitting =
    formik.isSubmitting ||
    isCreateProductSubmitting ||
    isMigrating ||
    isUpdating;
  const submitError = tallyProductId
    ? migrationError
    : productId
      ? updateError
      : createProductError;

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
    <form
      onSubmit={formik.handleSubmit}
      className="flex h-full min-h-0 flex-col pl-1"
      noValidate
    >
      <FormErrorAlert message={submitError} />

      <section className="min-h-0 flex-1 space-y-5 overflow-y-auto pb-4 pr-1 pl-1">
        <div className="grid gap-5 sm:grid-cols-2">
          <ProductInformationField
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
                minLength={PRODUCT_INFORMATION_CODE_MIN_LENGTH}
                maxLength={PRODUCT_INFORMATION_CODE_MAX_LENGTH}
              />
              <GenerateProductCodeButton formik={formik} />
            </div>
          </ProductInformationField>

          <ProductInformationField
            id="product-name"
            label="Product name"
            required
            error={fieldError("name")}
          >
            <Input
              id="product-name"
              {...inputProps("name", "product-name")}
              placeholder="e.g. Industrial motor"
              minLength={PRODUCT_INFORMATION_NAME_MIN_LENGTH}
              maxLength={PRODUCT_INFORMATION_NAME_MAX_LENGTH}
            />
          </ProductInformationField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <ProductInformationField
            id="product-category"
            label="Category"
            required
            error={fieldError("category")}
          >
            <ProductCategorySelect
              formik={formik}
              error={fieldError("category")}
            />
          </ProductInformationField>

          <ProductInformationField
            id="product-agency"
            label="Company"
            required
            error={fieldError("agency")}
          >
            <ProductCompanySelect
              formik={formik}
              error={fieldError("agency")}
            />
          </ProductInformationField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <ProductInformationField
            id="product-model-number"
            label="Model number"
            error={fieldError("modelNumber")}
          >
            <Input
              id="product-model-number"
              {...inputProps("modelNumber", "product-model-number")}
              placeholder="Optional model number"
              minLength={PRODUCT_INFORMATION_MODEL_NUMBER_MIN_LENGTH}
              maxLength={PRODUCT_INFORMATION_MODEL_NUMBER_MAX_LENGTH}
            />
          </ProductInformationField>

          <ProductInformationField
            id="product-hsn-code"
            label="HSN code"
            required
            error={fieldError("hsnCode")}
          >
            <Input
              id="product-hsn-code"
              {...inputProps("hsnCode", "product-hsn-code")}
              placeholder="e.g. 85015290"
              minLength={PRODUCT_INFORMATION_HSN_CODE_MIN_LENGTH}
              maxLength={PRODUCT_INFORMATION_HSN_CODE_MAX_LENGTH}
            />
          </ProductInformationField>
        </div>

        <ProductInformationField
          id="product-description"
          label="Description"
          error={fieldError("description")}
        >
          <Textarea
            id="product-description"
            {...inputProps("description", "product-description")}
            placeholder="Optional product description"
            rows={4}
            minLength={PRODUCT_INFORMATION_DESCRIPTION_MIN_LENGTH}
            maxLength={PRODUCT_INFORMATION_DESCRIPTION_MAX_LENGTH}
          />
        </ProductInformationField>
      </section>

      <div className="flex shrink-0 flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
          onClick={() => navigate(ROUTES.PRODUCTS)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isNewProduct
              ? "Adding..."
              : "Saving..."
            : isNewProduct
              ? "Add product"
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

export default ProductInformation;
