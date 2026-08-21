import * as Yup from "yup";

import { COMPANY_ASSIGNMENT_VALIDATION_MESSAGES as MESSAGES } from "@Forms/company/companyAssignment/companyAssignment.validation.messages";

export const companyAssignmentValidationSchema = Yup.object({
  companyId: Yup.string().trim().required(MESSAGES.COMPANY_REQUIRED),
  companyAddressId: Yup.string()
    .trim()
    .required(MESSAGES.COMPANY_ADDRESS_REQUIRED),
});
