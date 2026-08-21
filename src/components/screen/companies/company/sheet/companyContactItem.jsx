import { Phone } from "lucide-react";

import { Avatar, AvatarFallback } from "@shadcnComponent/avatar";
import ContactPositionBadge from "@Tables/companyContact/contactPositionBadge";

function contactInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function CompanyContactItem({ contact }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <Avatar className="size-9">
        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
          {contactInitials(contact.name)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{contact.name}</p>
        <a
          href={`tel:${contact.mobile}`}
          className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
        >
          <Phone className="size-3" />
          {contact.mobile}
        </a>
      </div>
      <ContactPositionBadge
        position={contact.position}
        className="shrink-0"
      />
    </div>
  );
}

export default CompanyContactItem;
