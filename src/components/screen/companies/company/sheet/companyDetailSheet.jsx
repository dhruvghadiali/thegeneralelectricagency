import { useDispatch, useSelector } from "react-redux";

import { Sheet, SheetContent } from "@shadcnComponent/sheet";
import { selectSelectedCompany } from "@Redux/company/company.selector";
import { companyDetailsClosed } from "@Redux/company/company.slice";
import CompanyAddressesSection from "@screenComponent/companies/company/sheet/companyAddressesSection";
import CompanySheetHeader from "@screenComponent/companies/company/sheet/companySheetHeader";

function CompanyDetailSheet() {
  const dispatch = useDispatch();
  const company = useSelector(selectSelectedCompany);

  const closeSheet = () => dispatch(companyDetailsClosed());

  return (
    <Sheet
      open={Boolean(company)}
      onOpenChange={(open) => !open && closeSheet()}
    >
      <SheetContent className="w-full gap-0 sm:max-w-xl lg:max-w-2xl">
        {company && (
          <>
            <CompanySheetHeader companyName={company.name} />
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-5 py-5 sm:px-6"
            >
              <CompanyAddressesSection addresses={company.addresses ?? []} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CompanyDetailSheet;
