import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";

import { ROUTES } from "@routes/navigate";
import { companyCreateStateCleared } from "@Redux/company/createCompany/createCompany.slice";
import { companyTableSelectors } from "@Redux/company/getCompanyList/getCompanyList.selector";
import {
  checkIsTallyCollectionCompany,
  toMigrateFromTallyCompanyFormValues,
  toMigrateFromTallyCompanyId,
} from "@Redux/company/migrateFromTally/migrateFromTally.form-payload";
import {
  companyMigrateFromTallyFormValuesSet,
  companyMigrateFromTallyIdSet,
  companyMigrateFromTallyStateCleared,
} from "@Redux/company/migrateFromTally/migrateFromTally.slice";
import {
  toCompanyInformationAddressId,
  toCompanyInformationCompanyId,
  toCompanyInformationUpdateFormValues,
} from "@Redux/company/updateCompany/updateCompany.form-payload";
import {
  companyUpdateAddressIdSet,
  companyUpdateCompanyIdSet,
  companyUpdateFormValuesSet,
  companyUpdateStateCleared,
} from "@Redux/company/updateCompany/updateCompany.slice";
import CompanyFormCard from "@screenComponent/companies/company/form/companyFormCard";

function CompanyFormScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { companyId: routeCompanyId } = useParams();
  const companies = useSelector(companyTableSelectors.selectItems);
  const company = routeCompanyId
    ? (location.state?.company ??
      companies.find((item) => String(item.id) === String(routeCompanyId)))
    : null;
  const isTallyCollectionCompany = company
    ? checkIsTallyCollectionCompany(company)
    : false;

  useEffect(() => {
    dispatch(companyCreateStateCleared());

    if (isTallyCollectionCompany) {
      dispatch(companyUpdateStateCleared());
      dispatch(
        companyMigrateFromTallyIdSet(toMigrateFromTallyCompanyId(company)),
      );
      dispatch(
        companyMigrateFromTallyFormValuesSet(
          toMigrateFromTallyCompanyFormValues(company),
        ),
      );
    } else {
      dispatch(companyMigrateFromTallyStateCleared());
      dispatch(
        companyUpdateCompanyIdSet(
          company
            ? toCompanyInformationCompanyId(company)
            : routeCompanyId ?? null,
        ),
      );
      dispatch(
        companyUpdateAddressIdSet(
          company ? toCompanyInformationAddressId(company) : null,
        ),
      );
      dispatch(
        companyUpdateFormValuesSet(
          company ? toCompanyInformationUpdateFormValues(company) : {},
        ),
      );
    }

    return () => {
      dispatch(companyCreateStateCleared());
      dispatch(companyMigrateFromTallyStateCleared());
      dispatch(companyUpdateStateCleared());
    };
  }, [company, dispatch, isTallyCollectionCompany, routeCompanyId]);

  if (routeCompanyId && !company) {
    return <Navigate to={ROUTES.COMPANIES} replace />;
  }

  return (
    <main className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-1 pb-2">
      <CompanyFormCard />
    </main>
  );
}

export default CompanyFormScreen;
