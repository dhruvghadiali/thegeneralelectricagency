import { CalendarClock, UserRound } from "lucide-react";

function ProductAuditSection({
  title,
  personLabel,
  dateLabel,
  person,
  date,
  className = "",
}) {
  return (
    <section className={className} aria-label={`${title} audit information`}>
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
          {title}
        </h3>
      </div>

      <dl className="mt-3 space-y-3">
        <div className="grid grid-cols-[1rem_minmax(0,1fr)] gap-x-2">
          <UserRound
            className="mt-0.5 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <dt className="text-xs text-muted-foreground">{personLabel}</dt>
            <dd className="truncate text-sm font-medium" title={person}>
              {person}
            </dd>
          </div>
        </div>

        <div className="grid grid-cols-[1rem_minmax(0,1fr)] gap-x-2">
          <CalendarClock
            className="mt-0.5 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <dt className="text-xs text-muted-foreground">{dateLabel}</dt>
            <dd className="text-sm font-medium">{date}</dd>
          </div>
        </div>
      </dl>
    </section>
  );
}

export default ProductAuditSection;
