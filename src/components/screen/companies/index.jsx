import { Building2, ContactRound, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@shadcnComponent/button";
import { ROLE_PATHS } from "@Enums";
import { selectCompanyDirectoryView } from "@Redux/company/company.selector";
import { companyDirectoryViewChanged } from "@Redux/company/company.slice";

import CompanyContactDirectory from "@screenComponent/companies/companyContact/companyContactDirectory";
import CompanyDirectory from "@screenComponent/companies/company/companyDirectory";

const DIRECTORY_VIEWS = Object.freeze({
  COMPANIES: "companies",
  CONTACTS: "contacts",
});

function DirectorySwitcher({ value, onChange }) {
  return (
    <div className="flex w-full gap-1 rounded-lg border bg-muted/30 p-1 sm:w-fit">
      <Button
        type="button"
        size="sm"
        variant={value === DIRECTORY_VIEWS.COMPANIES ? "default" : "ghost"}
        onClick={() => onChange(DIRECTORY_VIEWS.COMPANIES)}
        className="flex-1 shadow-none sm:flex-none"
      >
        <Building2 className="size-4" />
        Company directory
      </Button>
      <Button
        type="button"
        size="sm"
        variant={value === DIRECTORY_VIEWS.CONTACTS ? "default" : "ghost"}
        onClick={() => onChange(DIRECTORY_VIEWS.CONTACTS)}
        className="flex-1 shadow-none sm:flex-none"
      >
        <ContactRound className="size-4" />
        Contact person directory
      </Button>
    </div>
  );
}

function Companies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const directoryView = useSelector(selectCompanyDirectoryView);
  const canAddCompany = role === ROLE_PATHS.EMPLOYEE;
  const canViewContactDirectory = [
    ROLE_PATHS.EMPLOYEE,
    ROLE_PATHS.SUPER_ADMIN,
  ].includes(role);

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <h1 className="sr-only">Companies</h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {canViewContactDirectory && (
          <DirectorySwitcher
            value={directoryView}
            onChange={(view) => dispatch(companyDirectoryViewChanged(view))}
          />
        )}

        {canAddCompany && (
          <Button
            onClick={() => navigate("/companies/new")}
            className="w-full sm:w-auto"
          >
            <Plus className="size-4" />
            Add company
          </Button>
        )}
      </div>

      {directoryView === DIRECTORY_VIEWS.CONTACTS && canViewContactDirectory ? (
        <CompanyContactDirectory />
      ) : (
        <CompanyDirectory />
      )}
    </main>
  );
}

export default Companies;
