import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a ChartContainer");
  return context;
}

function ChartContainer({ id, className, children, config, style, ...props }) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        style={{
          ...Object.fromEntries(
            Object.entries(config).map(([key, item]) => [`--color-${key}`, item.color]),
          ),
          ...style,
        }}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/60 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-layer]:outline-none [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({ active, payload, label, className }) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;

  return (
    <div className={cn("grid min-w-[10rem] gap-2 rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-xl", className)}>
      <p className="font-medium">{label}</p>
      <div className="grid gap-1.5">
        {payload.map((item) => {
          const itemConfig = config[item.dataKey] || {};
          return (
            <div key={item.dataKey} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="size-2 rounded-[2px]" style={{ backgroundColor: item.color }} />
                {itemConfig.label || item.name}
              </span>
              <span className="font-mono font-medium tabular-nums">{Number(item.value).toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({ payload, className }) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4 pt-3", className)}>
      {payload.map((item) => (
        <div key={item.dataKey || item.value} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
          {config[item.dataKey]?.label || item.value}
        </div>
      ))}
    </div>
  );
}

export { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent };
