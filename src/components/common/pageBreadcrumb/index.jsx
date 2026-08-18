import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@shadcnComponent/button";

function PageBreadcrumb({ items, actions, compact = false }) {
  return (
    <div
      className={cn(
        "flex min-h-9 flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between",
        compact && "min-h-0 min-w-0 flex-row border-0 pb-0",
      )}
    >
      <nav
        aria-label="Breadcrumb"
        className={cn(
          "flex flex-wrap items-center gap-2 text-sm",
          compact && "min-w-0 flex-nowrap",
        )}
      >
        {items.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 && (
              <ChevronRight
                className="size-3.5 text-muted-foreground/60"
                aria-hidden="true"
              />
            )}

            {item.href ? (
              <Button
                asChild
                variant="link"
                size="sm"
                className="h-auto w-fit justify-start px-0 py-0 has-[>svg]:px-0 text-muted-foreground hover:text-foreground"
              >
                <Link to={item.href}>
                  {index === 0 && <ArrowLeft className="size-4" />}
                  {item.label}
                </Link>
              </Button>
            ) : (
              <span
                className={cn(
                  "font-medium text-foreground",
                  compact && "truncate",
                )}
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </Fragment>
        ))}
      </nav>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}

export default PageBreadcrumb;
