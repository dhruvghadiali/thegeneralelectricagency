import { Area, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@shadcnComponent/chart";

const chartConfig = {
  sales: { label: "Products sold", color: "var(--chart-1)" },
  completed: { label: "Completed", color: "var(--chart-2)" },
  pending: { label: "Pending", color: "var(--chart-4)" },
};

function PerformanceChart({ data }) {
  return (
    <ChartContainer config={chartConfig} className="h-[290px] w-full min-w-[620px] aspect-auto">
      <ComposedChart data={data} margin={{ top: 8, right: 12, left: -14, bottom: 0 }}>
        <defs>
          <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.28} />
            <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="4 5" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis domain={[0, 500]} ticks={[0, 100, 200, 300, 400, 500]} tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={{ strokeDasharray: "4 4" }} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area type="monotone" dataKey="sales" fill="url(#fillSales)" stroke="var(--color-sales)" strokeWidth={3} dot={{ r: 3, fill: "var(--card)", strokeWidth: 2 }} activeDot={{ r: 5 }} />
        <Line type="monotone" dataKey="completed" stroke="var(--color-completed)" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="pending" stroke="var(--color-pending)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
      </ComposedChart>
    </ChartContainer>
  );
}

export default PerformanceChart;
