import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCompanyDetailsFormState } from "@Redux/company/company.selector";
import {
  companyDetailsFormChanged,
  companyDetailsFormReset,
} from "@Redux/company/company.slice";

/** Redux-backed UI state shared by the company form operation hooks. */
export function useCompanyFormWorkflow() {
  const dispatch = useDispatch();
  const formState = useSelector(selectCompanyDetailsFormState);

  const changeFormState = useCallback(
    (changes) => dispatch(companyDetailsFormChanged(changes)),
    [dispatch],
  );

  const setSaveError = useCallback(
    (saveError) => changeFormState({ saveError }),
    [changeFormState],
  );

  useEffect(() => {
    dispatch(companyDetailsFormReset());
    return () => dispatch(companyDetailsFormReset());
  }, [dispatch]);

  return { formState, changeFormState, setSaveError };
}

export default useCompanyFormWorkflow;
