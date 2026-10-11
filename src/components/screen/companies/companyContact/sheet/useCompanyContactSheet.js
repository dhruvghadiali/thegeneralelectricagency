import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ROLE_PATHS } from "@Enums";
import { selectSelectedCompanyContact } from "@Redux/companyContact/companyContact.selector";
import { contactDetailsClosed } from "@Redux/companyContact/companyContact.slice";

/** Owns only the contact sheet's visibility and role access. */
export function useCompanyContactSheet() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const contact = useSelector(selectSelectedCompanyContact);
  const closeSheet = useCallback(
    () => dispatch(contactDetailsClosed()),
    [dispatch],
  );

  return {
    contact,
    canManage: role === ROLE_PATHS.EMPLOYEE,
    closeSheet,
  };
}

export default useCompanyContactSheet;
