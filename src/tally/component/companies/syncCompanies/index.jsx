import { useDispatch, useSelector } from "react-redux";

import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcnComponent/tabs";
import SaveSyncCompaniesButton from "@Tally/component/companies/saveSyncCompaniesButton";
import NewCompanies from "@Tally/component/companies/syncCompanies/newCompanies";
import { SYNC_COMPANY_TABS } from "@Tally/enum/syncCompaniesTabs.enum";
import { activeTabChanged } from "@Tally/redux/syncCompanies/syncCompanies.slice";
import {
  selectSyncCompaniesActiveTab,
  selectSyncCompaniesSaveState,
} from "@Tally/redux/syncCompanies/syncCompanies.selector";

function SyncCompanies() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectSyncCompaniesActiveTab);
  const { error: saveError, alertVisible: saveAlertVisible, savedCount } =
    useSelector(selectSyncCompaniesSaveState);

  return (
    <Tabs value={activeTab} onValueChange={(value) => dispatch(activeTabChanged(value))} className="flex min-w-0 flex-col gap-4 roomy:min-h-0 roomy:flex-1">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
        <div className="max-w-full overflow-x-auto">
          <TabsList aria-label="Sync company sections">
            <TabsTrigger value={SYNC_COMPANY_TABS.NEW_COMPANIES}>{SYNC_COMPANY_TABS.NEW_COMPANIES}</TabsTrigger>
            <TabsTrigger value={SYNC_COMPANY_TABS.DELETED_COMPANIES}>{SYNC_COMPANY_TABS.DELETED_COMPANIES}</TabsTrigger>
          </TabsList>
        </div>
        <SaveSyncCompaniesButton />
      </div>

      {saveAlertVisible && saveError && <FormErrorAlert message={saveError} />}
      {savedCount > 0 && <p role="status" className="shrink-0 text-sm text-muted-foreground">{savedCount} companies saved.</p>}

      <TabsContent value={SYNC_COMPANY_TABS.NEW_COMPANIES} className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col">
        <NewCompanies />
      </TabsContent>
      <TabsContent value={SYNC_COMPANY_TABS.DELETED_COMPANIES}>
        {SYNC_COMPANY_TABS.DELETED_COMPANIES}
      </TabsContent>
    </Tabs>
  );
}

export default SyncCompanies;
