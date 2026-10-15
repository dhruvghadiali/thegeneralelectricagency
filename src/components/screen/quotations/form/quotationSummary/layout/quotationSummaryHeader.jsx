import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

function QuotationSummaryHeader({ title, quotationNumber }) {
  return (
    <CardHeader className="border-b bg-muted/30 px-6 py-4">
      <CardTitle className="text-lg font-semibold tracking-tight">
        {title}
      </CardTitle>
      {quotationNumber && (
        <CardDescription>Quotation number: {quotationNumber}</CardDescription>
      )}
    </CardHeader>
  );
}

export default QuotationSummaryHeader;
