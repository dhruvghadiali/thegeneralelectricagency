import _ from "lodash";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

function QuotationCompanySummaryCard({
  companyName,
  address,
  onClick,
  isInteractive = true,
}) {
  return (
    <Card
      onClick={isInteractive ? onClick : undefined}
      className={`w-full shrink-0 self-start gap-0 py-4 ${
        isInteractive ? "cursor-pointer" : ""
      }`}
    >
      <CardHeader className="gap-1.5 px-5">
        <CardTitle>{_.toUpper(companyName)}</CardTitle>
        <CardDescription className="whitespace-pre-line leading-relaxed">
          {address}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default QuotationCompanySummaryCard;
