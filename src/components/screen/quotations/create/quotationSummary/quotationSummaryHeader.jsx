import { CardHeader, CardTitle } from "@shadcnComponent/card";

function QuotationSummaryHeader() {
  return (
    <CardHeader className="border-b bg-muted/30 px-6 py-4">
      <CardTitle className="text-lg font-semibold tracking-tight">
        Quotation Summary
      </CardTitle>
    </CardHeader>
  );
}

export default QuotationSummaryHeader;
