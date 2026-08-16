import {
  Building2,
  ExternalLink,
  FileText,
  Globe2,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  COMPANY_TYPE_OPTIONS,
  CONTACT_POSITION_LABELS,
} from "@Enums";

function DetailItem({ icon, label, children }) {
  const Icon = icon;

  return (
    <div className="flex min-w-0 gap-3 rounded-lg border bg-card p-3">
      <span className="mt-0.5 rounded-md bg-muted p-2 text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="mt-1 break-words text-sm font-medium">{children}</div>
      </div>
    </div>
  );
}

function CompanyDetailSheet({ company, onClose }) {
  const companyType =
    COMPANY_TYPE_OPTIONS.find((option) => option.value === company?.type)?.label ??
    company?.type;

  return (
    <Sheet open={Boolean(company)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full gap-0 sm:max-w-xl lg:max-w-2xl">
        {company && (
          <>
            <SheetHeader className="border-b px-5 py-5 sm:px-6">
              <div className="flex items-start gap-3 pr-8">
                <span className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Building2 className="size-6" />
                </span>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{companyType}</Badge>
                    <Badge variant="outline">Read only</Badge>
                  </div>
                  <SheetTitle className="text-xl sm:text-2xl">
                    {company.name}
                  </SheetTitle>
                  <SheetDescription className="mt-1">
                    Company profile, registered details, locations, and contacts.
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div data-lenis-prevent className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <section>
                <h3 className="text-sm font-semibold">Contact information</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <DetailItem icon={Mail} label="Email address">
                    <a className="text-primary hover:underline" href={`mailto:${company.email}`}>
                      {company.email}
                    </a>
                  </DetailItem>
                  <DetailItem icon={Phone} label="Phone number">
                    <a className="text-primary hover:underline" href={`tel:${company.phone}`}>
                      {company.phone}
                    </a>
                  </DetailItem>
                  <DetailItem icon={Globe2} label="Website">
                    <a
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {company.website.replace(/^https?:\/\//, "")}
                      <ExternalLink className="size-3" />
                    </a>
                  </DetailItem>
                  <DetailItem icon={UserRound} label="Company type">
                    {companyType}
                  </DetailItem>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <h3 className="text-sm font-semibold">Tax & registration</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <DetailItem icon={FileText} label="GST number">
                    <span className="font-mono text-xs sm:text-sm">{company.gstNumber}</span>
                  </DetailItem>
                  <DetailItem icon={FileText} label="PAN number">
                    <span className="font-mono text-xs sm:text-sm">{company.panNumber}</span>
                  </DetailItem>
                </div>
              </section>

              <Separator className="my-6" />

              <section>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">Locations & contacts</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Contacts are grouped under the location they work from.
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {company.addressCount} {company.addressCount === 1 ? "location" : "locations"}
                  </Badge>
                </div>

                <div className="mt-4 grid gap-4">
                  {company.addresses.map((address, addressIndex) => (
                    <article key={address.id} className="overflow-hidden rounded-xl border bg-card">
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

                      <div className="p-4">
                        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {address.contacts.length} {address.contacts.length === 1 ? "contact" : "contacts"}
                        </p>
                        {address.contacts.length > 0 ? (
                          <div className="grid gap-2">
                            {address.contacts.map((contact) => (
                              <div
                                key={contact.id}
                                className="flex items-center gap-3 rounded-lg border p-3"
                              >
                                <Avatar className="size-9">
                                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                                    {contact.name
                                      .split(/\s+/)
                                      .filter(Boolean)
                                      .slice(0, 2)
                                      .map((part) => part[0]?.toUpperCase())
                                      .join("")}
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
                                <Badge variant="secondary" className="shrink-0">
                                  {CONTACT_POSITION_LABELS[contact.position] ??
                                    CONTACT_POSITION_LABELS.other}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                            No contacts assigned to this location.
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CompanyDetailSheet;
