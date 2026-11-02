import { PRODUCT_INFORMATION_FIELDS } from "@Enums";

export const createProductInformationFormValues = () =>
  Object.fromEntries(PRODUCT_INFORMATION_FIELDS.map((field) => [field, ""]));

export const createProductInformationState = () => ({
  productId: null,
  formValues: createProductInformationFormValues(),
  isSubmitting: false,
  error: null,
});

export default createProductInformationState;
