import { COMPANY_FORM_TABS } from "@Enums";
import { TabsList, TabsTrigger } from "@shadcnComponent/tabs";

function CompanyFormTabList() {
  return (
    <TabsList className="grid h-auto w-full grid-cols-2 sm:w-fit">
      <TabsTrigger
        value={COMPANY_FORM_TABS.COMPANY_INFORMATION}
        className="h-full whitespace-normal px-2 py-2 text-center sm:px-3"
      >
        Company information
      </TabsTrigger>
      <TabsTrigger
        value={COMPANY_FORM_TABS.COMPANY_CONTACT_PERSONS}
        className="h-full whitespace-normal px-2 py-2 text-center sm:px-3"
      >
        Company contact persons
      </TabsTrigger>
    </TabsList>
  );
}

export default CompanyFormTabList;
