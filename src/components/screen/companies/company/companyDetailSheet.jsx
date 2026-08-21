import {
  Building2,
  MapPin,
  Phone,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@shadcnComponent/avatar";
import { Badge } from "@shadcnComponent/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";
import ContactPositionBadge from "@Tables/companyContact/contactPositionBadge";

function CompanyDetailSheet({ company, onClose }) {
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
                  <SheetTitle className="text-xl sm:text-2xl">
                    {company.name}
                  </SheetTitle>
                  <SheetDescription className="mt-1">
                    Addresses and their contact persons.
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div data-lenis-prevent className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <section>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">Company addresses</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Contact persons are grouped under their address.
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {company.addresses.length}{" "}
                    {company.addresses.length === 1 ? "address" : "addresses"}
                  </Badge>
                </div>

                <div className="mt-4 grid gap-4">
                  {company.addresses.map((address, addressIndex) => (
                    <article
                      key={address.id ?? addressIndex}
                      className="overflow-hidden rounded-xl border bg-card"
                    >
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
                                key={contact.id ?? `${addressIndex}-${contact.mobile}`}
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
                                <ContactPositionBadge
                                  position={contact.position}
                                  className="shrink-0"
                                />
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

                  {company.addresses.length === 0 && (
                    <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                      No addresses are available for this company.
                    </p>
                  )}
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
