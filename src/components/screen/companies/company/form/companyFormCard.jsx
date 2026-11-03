import { COMPANY_FORM_TABS } from "@Enums";
import { Card, CardContent, CardHeader } from "@shadcnComponent/card";
import { Tabs } from "@shadcnComponent/tabs";

import CompanyFormTabs from "@screenComponent/companies/company/form/tab";
import CompanyFormTabList from "@screenComponent/companies/company/form/tab/companyFormTabList";

function CompanyFormCard() {
  return (
    <Tabs
      defaultValue={COMPANY_FORM_TABS.COMPANY_INFORMATION}
      className="flex min-h-0 w-full flex-1"
    >
      <Card className="min-h-0 w-full flex-1 gap-0 overflow-hidden py-0 shadow-none">
        <CardHeader className="grid-rows-[auto] gap-0 px-4 py-2 sm:px-6 sm:py-2">
          <CompanyFormTabList />
        </CardHeader>
        <div className="border-b" aria-hidden="true" />
        <CardContent className="flex min-h-0 flex-1 overflow-hidden px-4 pb-4 pt-2 sm:px-6 sm:pb-6 sm:pt-3">
          <CompanyFormTabs />
        </CardContent>
      </Card>
    </Tabs>
  );
}

export default CompanyFormCard;
