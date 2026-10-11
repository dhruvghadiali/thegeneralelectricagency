import CompanyDirectory from "@screenComponent/companies/company/companyDirectory";
import CompanySummaryPopover from "@screenComponent/companies/company/header/companySummaryPopover";

function Companies() {
  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <h1 className="sr-only">Companies</h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {/* Company and contact person directory tabs temporarily hidden. */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <CompanySummaryPopover />
          {/* Add company action temporarily hidden. */}
        </div>
      </div>

      <CompanyDirectory />
    </main>
  );
}

export default Companies;
