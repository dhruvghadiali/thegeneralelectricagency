import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

function QuotationCompanySummaryCard({ companyName, address }) {
  return (
    <Card className="w-full shrink-0 self-start gap-0 py-4">
      <CardHeader className="gap-1.5 px-5">
        <CardTitle>{companyName}</CardTitle>
        <CardDescription className="whitespace-pre-line leading-relaxed">
          {address}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default QuotationCompanySummaryCard;
