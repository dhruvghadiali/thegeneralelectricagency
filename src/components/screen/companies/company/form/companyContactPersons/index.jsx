import { Clock3, ContactRound } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";

function CompanyContactPersons() {
  return (
    <section
      className="relative flex min-h-72 flex-1 items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-br from-background via-muted/30 to-primary/5 p-5 text-center sm:min-h-80 sm:p-8 lg:p-10"
      aria-labelledby="company-contact-persons-status"
    >
      <div
        className="absolute -right-20 -top-20 size-56 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-16 size-56 rounded-full bg-amber-400/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-xl flex-col items-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border bg-background shadow-sm sm:mb-5 sm:size-16">
          <ContactRound
            className="size-7 text-primary sm:size-8"
            aria-hidden="true"
          />
        </div>

        <Badge variant="warning" className="gap-1.5">
          <Clock3 className="size-3.5" aria-hidden="true" />
          Under development
        </Badge>

        <h3
          id="company-contact-persons-status"
          className="mt-4 text-lg font-semibold tracking-tight sm:text-xl lg:text-2xl"
        >
          Company contact persons are coming soon
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          A dedicated workspace for managing the contact persons attached to
          this company is currently being built. You will be able to add and
          update this information in a future release.
        </p>
      </div>
    </section>
  );
}

export default CompanyContactPersons;
