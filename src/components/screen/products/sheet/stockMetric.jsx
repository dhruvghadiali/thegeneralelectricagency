import { createElement } from "react";

function StockMetric({ icon, label, value }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {createElement(icon, { className: "size-4", "aria-hidden": true })}
        {label}
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

export default StockMetric;
