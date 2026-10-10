import { ArrowLeft, Send } from "lucide-react";
import { useDispatch } from "react-redux";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import { quotationStepChanged } from "@Redux/quotation/quotation.slice";
import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

function QuotationSummary() {
  const dispatch = useDispatch();

  const returnToProductInformation = () => {
    dispatch(quotationStepChanged(CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION));
  };

  return (
    <Card className="w-full gap-0 overflow-hidden py-0">
      <CardHeader className="border-b bg-muted/30 px-6 py-4">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Quotation Summary
        </CardTitle>
      </CardHeader>
      <CardFooter className="justify-end gap-2 bg-muted/20 px-6 py-4">
        <Button
          type="button"
          variant="outline"
          onClick={returnToProductInformation}
          aria-keyshortcuts="Escape"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted-foreground">
            Esc
          </kbd>
        </Button>
        <Button type="button">
          <Send className="size-4" aria-hidden="true" />
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}

export default QuotationSummary;
