import { PRODUCT_INFORMATION_FIELDS } from "@Enums";

export const createProductUpdateFormValues = () =>
  Object.fromEntries(PRODUCT_INFORMATION_FIELDS.map((field) => [field, ""]));

export const createProductUpdateState = () => ({
  productId: null,
  formValues: createProductUpdateFormValues(),
  isUpdateProductSubmitting: false,
  updateProductError: null,
});

export default createProductUpdateState;
