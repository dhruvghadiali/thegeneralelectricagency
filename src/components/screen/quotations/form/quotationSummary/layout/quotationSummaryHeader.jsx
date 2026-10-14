import { CardHeader, CardTitle } from "@shadcnComponent/card";

function QuotationSummaryHeader({ title }) {
  return (
    <CardHeader className="border-b bg-muted/30 px-6 py-4">
      <CardTitle className="text-lg font-semibold tracking-tight">
        {title}
      </CardTitle>
    </CardHeader>
  );
}

export default QuotationSummaryHeader;
