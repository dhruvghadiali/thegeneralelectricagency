import { Sheet, SheetContent } from "@shadcnComponent/sheet";
import CompanyContactSheetHeader from "@screenComponent/companies/companyContact/sheet/companyContactSheetHeader";
import CompanyDetailsSection from "@screenComponent/companies/companyContact/sheet/companyDetailsSection";
import { useCompanyContactSheet } from "@screenComponent/companies/companyContact/sheet/useCompanyContactSheet";

function CompanyContactDetailSheet() {
  const sheet = useCompanyContactSheet();
  const { contact, closeSheet } = sheet;

  return (
    <Sheet
      open={Boolean(contact)}
      onOpenChange={(open) => !open && closeSheet()}
    >
      <SheetContent className="w-full gap-0 sm:max-w-xl">
        {contact && (
          <div className="contents">
            <CompanyContactSheetHeader contact={contact} />
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-5 py-5 sm:px-6"
            >
              <CompanyDetailsSection details={contact.companyDetails} />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CompanyContactDetailSheet;
