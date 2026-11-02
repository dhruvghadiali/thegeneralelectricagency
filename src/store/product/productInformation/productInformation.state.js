import { PRODUCT_INFORMATION_FIELDS } from "@Enums";

export const createProductInformationFormValues = () =>
  Object.fromEntries(PRODUCT_INFORMATION_FIELDS.map((field) => [field, ""]));

export const createProductInformationState = () => ({
  formValues: createProductInformationFormValues(),
});

export default createProductInformationState;
