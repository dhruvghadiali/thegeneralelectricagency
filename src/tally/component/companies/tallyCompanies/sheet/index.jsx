import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";
import { useDispatch, useSelector } from "react-redux";

import { COMPANY_DETAILS } from "@Tally/component/companies/tallyCompanies/sheet/companyDetails";
import { companyDetailsClosed } from "@Tally/redux/tallyCompanies/tallyCompanies.slice";
import { selectSelectedTallyCompany } from "@Tally/redux/tallyCompanies/tallyCompanies.selector";

function CompanyDetails() {
  const dispatch = useDispatch();
  const company = useSelector(selectSelectedTallyCompany);

  return (
    <Sheet
      open={Boolean(company)}
      onOpenChange={(open) => !open && dispatch(companyDetailsClosed())}
    >
      <SheetContent className="w-full gap-0 sm:max-w-xl">
        <SheetHeader className="border-b pr-12">
          <SheetTitle className="break-words">
            {company?.name ?? "Company details"}
          </SheetTitle>
          <SheetDescription>Company information received from Tally.</SheetDescription>
        </SheetHeader>
        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto p-4">
          <dl className="divide-y">
            {COMPANY_DETAILS.map(([label, field, format]) => {
              const value = company?.[field];
              const display = format
                ? format(value)
                : value == null || value === "" ? "—" : String(value);

              return (
                <div key={field} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="min-w-0 whitespace-pre-wrap break-words text-sm font-medium">
                    {display}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CompanyDetails;
