import { Building2, FileText, Mail, Phone, UserRound } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";
import CompanyDetailItem from "@screenComponent/companies/companyContact/companyDetailItem";

function CompanyContactDetailSheet({ contact, onClose }) {
  return (
    <Sheet open={Boolean(contact)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full gap-0 sm:max-w-xl">
        {contact && (
          <>
            <SheetHeader className="border-b px-5 py-5 sm:px-6">
              <div className="flex items-start gap-3 pr-8">
                <span className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Building2 className="size-6" />
                </span>
                <div className="min-w-0">
                  <SheetTitle className="text-xl sm:text-2xl">
                    {contact.companyName}
                  </SheetTitle>
                  <SheetDescription className="mt-2 flex items-center gap-1.5">
                    <UserRound className="size-4" />
                    Contact person: {contact.contactPersonName}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-5 py-5 sm:px-6"
            >
              <h3 className="text-sm font-semibold">Company details</h3>

              {contact.companyDetails.length > 0 ? (
                <div className="mt-3 grid gap-4">
                  {contact.companyDetails.map((details, index) => (
                    <div
                      key={`${details.email}-${index}`}
                      className="grid gap-3"
                    >
                      <CompanyDetailItem
                        icon={Mail}
                        label="Email address"
                        value={details.email}
                        href={details.email ? `mailto:${details.email}` : undefined}
                      />
                      <CompanyDetailItem
                        icon={Phone}
                        label="Phone number"
                        value={details.phone}
                        href={details.phone ? `tel:${details.phone}` : undefined}
                      />
                      <CompanyDetailItem
                        icon={FileText}
                        label="GST number"
                        value={details.gstNumber}
                      />
                      <CompanyDetailItem
                        icon={FileText}
                        label="PAN number"
                        value={details.panNumber}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No company details are available.
                </p>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CompanyContactDetailSheet;
