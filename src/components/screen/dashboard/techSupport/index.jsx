import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcnComponent/tabs";
import { DASHBOARD_TAB_NAMES } from "@Tally/enum/dashboardTabs.enum";

import DashboardCompanies from "@Tally/pages/dashboard/companies";
import DashboardProducts from "@Tally/pages/dashboard/products";

export default function TechSupportDashboard() {
  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <Tabs
        defaultValue={DASHBOARD_TAB_NAMES.COMPANY}
        className="flex min-w-0 w-full flex-col gap-4 roomy:min-h-0 roomy:flex-1"
      >
        <TabsList
          aria-label="Tech support dashboard sections"
          className="self-start"
        >
          <TabsTrigger value={DASHBOARD_TAB_NAMES.COMPANY}>
            {DASHBOARD_TAB_NAMES.COMPANY}
          </TabsTrigger>
          <TabsTrigger value={DASHBOARD_TAB_NAMES.PRODUCT}>
            {DASHBOARD_TAB_NAMES.PRODUCT}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value={DASHBOARD_TAB_NAMES.COMPANY}
          className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <DashboardCompanies />
        </TabsContent>
        <TabsContent
          value={DASHBOARD_TAB_NAMES.PRODUCT}
          className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
        >
          <DashboardProducts />
        </TabsContent>
      </Tabs>
    </main>
  );
}
