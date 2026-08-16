import { Card, CardContent } from "@shadcnComponent/card";

function SummaryCard({ icon, iconClassName, value, label }) {
  const Icon = icon;

  return (
    <Card className="gap-0 py-0 shadow-none">
      <CardContent className="flex items-center gap-3 p-4">
        <span className={`rounded-lg p-2.5 ${iconClassName}`}>
          <Icon className="size-5" />
        </span>
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
