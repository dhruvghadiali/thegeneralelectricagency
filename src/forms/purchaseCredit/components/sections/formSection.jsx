import { createElement } from "react";
import { ChevronDown } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";
import { Button } from "@shadcnComponent/button";
import { Card, CardContent } from "@shadcnComponent/card";

function FormSection({
  id,
  icon,
  title,
  description,
  isOpen,
  errorCount,
  amountSummary,
  action,
  disabled = false,
  onOpen,
  children,
}) {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <Button
        type="button"
        variant="ghost"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onOpen}
        className="h-auto w-full justify-start rounded-none px-4 py-4 text-left hover:bg-muted/50 sm:px-6"
      >
        <div className="flex w-full min-w-0 items-center gap-3">
          <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
            {createElement(icon, { className: "size-4", "aria-hidden": true })}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-foreground">{title}</h2>
            <p className="mt-1 whitespace-normal text-sm font-normal text-muted-foreground">
              {description}
            </p>
          </div>
          {(amountSummary || (!isOpen && errorCount > 0)) && (
            <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-2">
              {amountSummary && (
                <Badge
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700 whitespace-nowrap tabular-nums dark:border-green-900 dark:bg-green-950/50 dark:text-green-300"
                >
                  {amountSummary}
                </Badge>
              )}
              {!isOpen && errorCount > 0 && (
                <Badge
                  variant="destructive"
                  aria-label={`${errorCount} validation ${errorCount === 1 ? "error" : "errors"}`}
                >
                  {errorCount} {errorCount === 1 ? "error" : "errors"}
                </Badge>
              )}
            </div>
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
          className="space-y-5 border-t px-4 py-5 sm:px-6"
        >
          {action && <div className="flex justify-end">{action}</div>}
          {children}
        </CardContent>
      )}
    </Card>
  );
}

export default FormSection;
