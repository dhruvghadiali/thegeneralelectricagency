import { COMPANY_INFORMATION_FIELDS } from "@Enums";

export const createCompanyUpdateFormValues = () =>
  Object.fromEntries(COMPANY_INFORMATION_FIELDS.map((field) => [field, ""]));

export const createCompanyUpdateState = () => ({
  companyId: null,
  addressId: null,
  formValues: createCompanyUpdateFormValues(),
  isUpdateCompanySubmitting: false,
  updateCompanyError: null,
});

export default createCompanyUpdateState;
