import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@routes/navigate";
import { isEmployeeCanManageCompanies } from "@Redux/company/company.selector";
import { Button } from "@shadcnComponent/button";
import CompanySummaryPopover from "@screenComponent/companies/company/header/companySummaryPopover";
import CompanyTable from "@screenComponent/companies/company/table";

function Companies() {
  const canCreate = useSelector(isEmployeeCanManageCompanies);
  const navigate = useNavigate();

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <h1 className="sr-only">Companies</h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {/* Company and contact person directory tabs temporarily hidden. */}
        <div className="flex flex-col gap-2 sm:flex-row">
          {canCreate && (
            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={() => navigate(ROUTES.COMPANY_NEW)}
            >
              <Plus className="size-4" aria-hidden="true" />
              Add company
            </Button>
          )}
          <CompanySummaryPopover />
        </div>
      </div>

      <CompanyTable />
    </main>
  );
}

export default Companies;
