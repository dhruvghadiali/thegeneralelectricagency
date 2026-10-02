import { useState } from "react";
import { useSelector } from "react-redux";

import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import { Badge } from "@shadcnComponent/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcnComponent/tabs";
import SyncTallyCompaniesButton from "@Tally/component/companies/syncTallyCompaniesButton";
import { COMPANY_TAB_NAMES } from "@Tally/enum/companiesTabs.enum";
import {
  selectTallyCompanies,
  selectTallyCompanyCount,
} from "@Tally/redux/tallyCompanies/tallyCompanies.selector";
import { selectSystemCompanyCount } from "@Tally/redux/systemCompanies/systemCompanies.selector";
import SystemCompanies from "@Tally/pages/companies/tabs/systemCompanies";
import TallyCompanies from "@Tally/pages/companies/tabs/tallyCompanies";
import SyncCompanies from "@Tally/pages/companies/tabs/syncCompanies";

function CompaniesTabs() {
  const [activeTab, setActiveTab] = useState(COMPANY_TAB_NAMES.SYSTEM_COMPANIES);
  const { status, error, errorTab, alertVisible } = useSelector(selectTallyCompanies);
  const systemCount = useSelector(selectSystemCompanyCount);
  const tallyCount = useSelector(selectTallyCompanyCount);

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex min-w-0 w-full flex-col gap-4 roomy:min-h-0 roomy:flex-1"
    >
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
        <div className="max-w-full overflow-x-auto">
          <TabsList aria-label="Company sections">
            <TabsTrigger value={COMPANY_TAB_NAMES.SYSTEM_COMPANIES}>
              {COMPANY_TAB_NAMES.SYSTEM_COMPANIES}
              <Badge variant="secondary" className="ml-2 tabular-nums">
                {systemCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value={COMPANY_TAB_NAMES.TALLY_COMPANIES}>
              {COMPANY_TAB_NAMES.TALLY_COMPANIES}
              <Badge variant="secondary" className="ml-2 tabular-nums">
                {tallyCount ?? 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value={COMPANY_TAB_NAMES.SYNC_COMPANIES}>
              {COMPANY_TAB_NAMES.SYNC_COMPANIES}
            </TabsTrigger>
          </TabsList>
        </div>
        <SyncTallyCompaniesButton
          errorTab={activeTab}
          onSuccess={() => setActiveTab(COMPANY_TAB_NAMES.TALLY_COMPANIES)}
        />
      </div>

      {alertVisible && status === "failed" && activeTab === errorTab && (
        <FormErrorAlert message={error} />
      )}

      <TabsContent
        value={COMPANY_TAB_NAMES.SYSTEM_COMPANIES}
        className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
      >
        <SystemCompanies />
      </TabsContent>
      <TabsContent
        value={COMPANY_TAB_NAMES.TALLY_COMPANIES}
        className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
      >
        <TallyCompanies />
      </TabsContent>
      <TabsContent
        value={COMPANY_TAB_NAMES.SYNC_COMPANIES}
        className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
      >
        <SyncCompanies />
      </TabsContent>
    </Tabs>
  );
}

export default CompaniesTabs;
