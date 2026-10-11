import { createElement } from "react";

function EmployeeSummaryItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        {createElement(icon, { className: "size-4" })}
      </span>
      <span className="min-w-0 flex-1 text-sm text-muted-foreground">
        {label}
      </span>
      <span className="text-lg font-semibold tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}

export default EmployeeSummaryItem;
