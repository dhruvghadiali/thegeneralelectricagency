import { COMPANY_INFORMATION_FIELDS } from "@Enums";

export const createCompanyMigrateFormValues = () =>
  Object.fromEntries(COMPANY_INFORMATION_FIELDS.map((field) => [field, ""]));

export const createCompanyMigrateState = () => ({
  tallyCompanyId: null,
  formValues: createCompanyMigrateFormValues(),
  isSubmitting: false,
  error: null,
});

export default createCompanyMigrateState;
