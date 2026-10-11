import { useDispatch } from "react-redux";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { toCompanyAssignmentUpdatePayload } from "@Forms/company/companyAssignment/companyAssignment-api.payload";
import {
  getAssignmentValues,
  yupFieldErrors,
} from "@Forms/company/companyAssignment/companyAssignment.helpers";
import { companyAssignmentValidationSchema } from "@Forms/company/companyAssignment/companyAssignment.validation.schema";
import { fetchCompanyContacts } from "@Redux/companyContact/companyContact.action";
import { COMPANY_CONTACT_TABLE_COLUMNS } from "@Tables/companyContact";

export function useCompanyAssignmentSubmit({
  assignment,
  contact,
  changeAssignment,
  onSuccess,
}) {
  const dispatch = useDispatch();

  return async function submitAssignment() {
    try {
      const validValues = await companyAssignmentValidationSchema.validate(
        getAssignmentValues(assignment),
        { abortEarly: false },
      );
      changeAssignment({ isSaving: true, saveError: null, fieldErrors: {} });
      await employeeCompanyApi.reassignCompanyContact(
        contact.id,
        toCompanyAssignmentUpdatePayload(validValues),
      );
      await dispatch(fetchCompanyContacts(COMPANY_CONTACT_TABLE_COLUMNS));
      onSuccess();
    } catch (error) {
      changeAssignment({
        fieldErrors: yupFieldErrors(error),
        saveError: error?.errors?.[0] ?? extractErrorMessage(error),
      });
    } finally {
      changeAssignment({ isSaving: false });
    }
  };
}
