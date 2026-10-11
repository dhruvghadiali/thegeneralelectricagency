import { MapPin } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";
import CompanyContactList from "@screenComponent/companies/company/sheet/companyContactList";

function CompanyAddressCard({ address, addressIndex }) {
  return (
    <article className="overflow-hidden rounded-xl border bg-card">
      <div className="flex gap-3 border-b bg-muted/35 p-4">
        <span className="rounded-lg bg-background p-2 text-primary shadow-xs">
          <MapPin className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold">
              Location {addressIndex + 1}
            </p>
            <Badge variant="outline">PIN {address.pincode}</Badge>
          </div>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {address.address}
          </p>
        </div>
      </div>

      <CompanyContactList
        contacts={address.contacts ?? []}
        addressIndex={addressIndex}
      />
    </article>
  );
}

export default CompanyAddressCard;
