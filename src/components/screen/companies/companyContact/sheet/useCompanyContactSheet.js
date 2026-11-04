import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectSelectedCompanyContact } from "@Redux/companyContact/companyContact.selector";
import { contactDetailsClosed } from "@Redux/companyContact/companyContact.slice";

/** Owns only the contact sheet's visibility and role access. */
export function useCompanyContactSheet() {
  const dispatch = useDispatch();
  const contact = useSelector(selectSelectedCompanyContact);
  const closeSheet = useCallback(
    () => dispatch(contactDetailsClosed()),
    [dispatch],
  );

  return {
    contact,
    closeSheet,
  };
}

export default useCompanyContactSheet;
