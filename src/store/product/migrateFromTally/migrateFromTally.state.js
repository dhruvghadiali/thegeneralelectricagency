import { PRODUCT_INFORMATION_FIELDS } from "@Enums";

export const createMigrateFromTallyFormValues = () =>
  Object.fromEntries(PRODUCT_INFORMATION_FIELDS.map((field) => [field, ""]));

export const createMigrateFromTallyState = () => ({
  formValues: createMigrateFromTallyFormValues(),
});

export default createMigrateFromTallyState;
