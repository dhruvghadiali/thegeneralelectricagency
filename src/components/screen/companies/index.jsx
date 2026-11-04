import CompanyHeader from "@screenComponent/companies/company/header/companyHeader";
import CompanyTable from "@screenComponent/companies/company/table";

function Companies() {
  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <CompanyHeader />
      <CompanyTable />
    </main>
  );
}

export default Companies;
