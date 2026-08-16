import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function PageBreadcrumb({ items }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-h-9 flex-wrap items-center gap-2 border-b pb-4 text-sm"
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
            <span className="font-medium text-foreground" aria-current="page">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export default PageBreadcrumb;
