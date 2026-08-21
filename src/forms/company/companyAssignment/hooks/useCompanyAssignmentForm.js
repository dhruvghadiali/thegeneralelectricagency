import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAssignmentBlockReason,
  hasAssignmentChanged,
} from "@Forms/company/companyAssignment/companyAssignment.helpers";
import { useCompanyAssignmentActions } from "@Forms/company/companyAssignment/hooks/useCompanyAssignmentActions";
import { useCompanyAssignmentOptions } from "@Forms/company/companyAssignment/hooks/useCompanyAssignmentOptions";
import { useCompanyAssignmentSubmit } from "@Forms/company/companyAssignment/hooks/useCompanyAssignmentSubmit";
import { useCurrentCompanyAssignment } from "@Forms/company/companyAssignment/hooks/useCurrentCompanyAssignment";
import { selectCompanyContactAssignment } from "@Redux/companyContact/companyContact.selector";
import { contactAssignmentChanged } from "@Redux/companyContact/companyContact.slice";

/** Redux-backed controller for searching and reassigning a company contact. */
export function useCompanyAssignmentForm({ contact, onSuccess }) {
  const dispatch = useDispatch();
  const assignment = useSelector(selectCompanyContactAssignment);
  const isInactiveContact = contact?.isActive === false;

  const changeAssignment = useCallback(
    (changes) => dispatch(contactAssignmentChanged(changes)),
    [dispatch],
  );

  const reassignmentBlockReason = useMemo(
    () =>
      getAssignmentBlockReason({
        currentCompany: assignment.currentCompany,
        currentAddress: assignment.currentAddress,
        isInactiveContact,
      }),
    [assignment.currentAddress, assignment.currentCompany, isInactiveContact],
  );

  useCurrentCompanyAssignment({
    contact,
    isInactiveContact,
    changeAssignment,
  });
  useCompanyAssignmentOptions({
    assignment,
    contact,
    reassignmentBlockReason,
    changeAssignment,
  });
  const submitAssignment = useCompanyAssignmentSubmit({
    assignment,
    contact,
    changeAssignment,
    onSuccess,
  });
  const actions = useCompanyAssignmentActions({ assignment, changeAssignment });

  return {
    assignment,
    selectedCompany: assignment.selectedCompanyOption,
    hasChanged: hasAssignmentChanged(assignment),
    reassignmentBlockReason,
    ...actions,
    submitAssignment,
  };
}

export default useCompanyAssignmentForm;
