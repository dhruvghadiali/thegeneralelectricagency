import { Building2, UserRound } from "lucide-react";

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";

function CompanyContactSheetHeader({ contact }) {
  return (
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
  );
}

export default CompanyContactSheetHeader;
