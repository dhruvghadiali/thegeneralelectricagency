import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@shadcnComponent/chart";

const monthlyConfig = {
  bill: { label: "Bill amount", color: "var(--chart-1)" },
  paid: { label: "Paid amount", color: "var(--chart-2)" },
  outstanding: { label: "Outstanding", color: "var(--chart-4)" },
};

const allocationConfig = {
  paid: { label: "Paid", color: "var(--chart-2)" },
  outstanding: { label: "Outstanding", color: "var(--chart-4)" },
};

const compactCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export function MonthlyPurchaseChart({ data }) {
  return (
    <ChartContainer
      config={monthlyConfig}
      className="h-[310px] w-full min-w-[680px] aspect-auto"
    >
      <ComposedChart data={data} margin={{ top: 8, right: 12, left: 4 }}>
        <defs>
          <linearGradient id="financialPaidFill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-paid)"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="var(--color-paid)"
              stopOpacity={0.02}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="4 5" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis
          tickFormatter={compactCurrency}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={72}
        />
        <ChartTooltip
          cursor={{ strokeDasharray: "4 4" }}
          content={<ChartTooltipContent formatter={(value) => compactCurrency(value)} />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="bill"
          fill="var(--color-bill)"
          radius={[5, 5, 0, 0]}
          maxBarSize={24}
        />
        <Area
          type="monotone"
          dataKey="paid"
          fill="url(#financialPaidFill)"
          stroke="var(--color-paid)"
          strokeWidth={2.5}
        />
        <Area
          type="monotone"
          dataKey="outstanding"
          fill="transparent"
          stroke="var(--color-outstanding)"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      </ComposedChart>
    </ChartContainer>
  );
}

export function PaymentAllocationChart({ data }) {
  return (
    <ChartContainer
      config={allocationConfig}
      className="mx-auto h-[250px] w-full max-w-[340px] aspect-auto"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent formatter={(value) => compactCurrency(value)} />}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={64}
          outerRadius={94}
          strokeWidth={4}
        />
        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
      </PieChart>
    </ChartContainer>
  );
}
