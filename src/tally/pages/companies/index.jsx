import CompaniesTabs from "@Tally/pages/companies/tabs";

function CompaniesScreen() {
  return (
    <main className="flex min-w-0 w-full flex-col gap-4 roomy:h-full roomy:min-h-0">
      <CompaniesTabs />
    </main>
  );
}

export default CompaniesScreen;
