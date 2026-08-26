import { createElement } from "react";
import { ChevronDown } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";
import { Button } from "@shadcnComponent/button";
import { Card, CardContent } from "@shadcnComponent/card";

function PurchaseCreditAccordionSection({
  id,
  icon,
  title,
  description,
  count,
  countLabel,
  badges = [],
  isOpen,
  onToggle,
  children,
}) {
  const badgeLabels = [
    ...badges,
    ...(count !== undefined
      ? [`${count} ${countLabel}${count === 1 ? "" : "s"}`]
      : []),
  ];

  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      <Button
        type="button"
        variant="ghost"
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="h-auto w-full justify-start rounded-none px-4 py-4 text-left hover:bg-muted/50"
      >
        <div className="flex w-full min-w-0 items-center gap-3">
          <span className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
            {createElement(icon, {
              className: "size-4",
              "aria-hidden": true,
            })}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-foreground">{title}</span>
            <span className="mt-1 block whitespace-normal text-sm font-normal text-muted-foreground">
              {description}
            </span>
          </span>
          {badgeLabels.length > 0 && (
            <span className="flex shrink-0 flex-wrap justify-end gap-1.5">
              {badgeLabels.map((badge) => (
                <Badge
                  key={badge}
                  variant="success"
                  className="whitespace-nowrap tabular-nums"
                >
                  {badge}
                </Badge>
              ))}
            </span>
          )}
          <ChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </div>
      </Button>
      {isOpen && (
        <CardContent
          id={`${id}-panel`}
          role="region"
          aria-label={title}
          className="border-t px-4 py-5"
        >
          {children}
        </CardContent>
      )}
    </Card>
  );
}

export default PurchaseCreditAccordionSection;
