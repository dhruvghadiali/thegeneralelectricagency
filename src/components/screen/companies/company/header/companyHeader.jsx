import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@routes/navigate";
import { isEmployeeCanManageCompanies } from "@Redux/company/company.selector";
import CompanyAddButton from "@screenComponent/companies/company/header/companyAddButton";
import CompanySummaryPopover from "@screenComponent/companies/company/header/companySummaryPopover";

function CompanyHeader() {
  const canCreate = useSelector(isEmployeeCanManageCompanies);
  const navigate = useNavigate();

  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
      <div className="flex flex-col gap-2 sm:flex-row">
        {canCreate && (
          <CompanyAddButton
            onAddCompany={() => navigate(ROUTES.COMPANY_NEW)}
          />
        )}
        <CompanySummaryPopover />
      </div>
    </header>
  );
}

export default CompanyHeader;
