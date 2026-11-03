import { COMPANY_FORM_TABS } from "@Enums";
import { TabsContent } from "@shadcnComponent/tabs";

import CompanyContactPersons from "@screenComponent/companies/company/form/companyContactPersons";
import CompanyInformation from "@screenComponent/companies/company/form/companyInformation";

function CompanyFormTabs() {
  return (
    <>
      <TabsContent
        value={COMPANY_FORM_TABS.COMPANY_INFORMATION}
        className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
      >
        <CompanyInformation />
      </TabsContent>
      <TabsContent
        value={COMPANY_FORM_TABS.COMPANY_CONTACT_PERSONS}
        className="mt-0 min-h-0 flex-1 data-[state=active]:flex data-[state=active]:flex-col"
      >
        <CompanyContactPersons />
      </TabsContent>
    </>
  );
}

export default CompanyFormTabs;
