import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { companyCreateStateCleared } from "@Redux/company/createCompany/createCompany.slice";
import CompanyFormCard from "@screenComponent/companies/company/form/companyFormCard";

function CompanyFormScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(companyCreateStateCleared());

    return () => dispatch(companyCreateStateCleared());
  }, [dispatch]);

  return (
    <main className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-1 pb-2">
      <CompanyFormCard />
    </main>
  );
}

export default CompanyFormScreen;
