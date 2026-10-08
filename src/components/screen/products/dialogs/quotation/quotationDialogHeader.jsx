import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";

function QuotationDialogHeader() {
  return (
    <DialogHeader>
      <DialogTitle>Quotation details</DialogTitle>
      <DialogDescription>
        Choose a company and select the applicable GST treatment for this
        quotation.
      </DialogDescription>
    </DialogHeader>
  );
}

export default QuotationDialogHeader;
