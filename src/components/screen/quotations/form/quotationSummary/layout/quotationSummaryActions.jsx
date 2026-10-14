import { ArrowLeft, Loader2, Send } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { CardFooter } from "@shadcnComponent/card";

function QuotationSummaryActions({
  isSubmitting,
  keyboard,
  onBack,
  onSubmit,
  submitLabel,
  submittingLabel,
}) {
  return (
    <CardFooter className="justify-end gap-2 bg-muted/20 px-6 py-4">
      <Button
        ref={keyboard.refs.backButtonRef}
        type="button"
        variant="outline"
        onClick={onBack}
        onKeyDown={keyboard.handleBackButtonKeyDown}
        aria-keyshortcuts="Escape"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back
        <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted-foreground">
          Esc
        </kbd>
      </Button>
      <Button
        ref={keyboard.refs.submitButtonRef}
        type="button"
        disabled={isSubmitting}
        onClick={onSubmit}
        onKeyDown={keyboard.handleSubmitButtonKeyDown}
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
    </CardFooter>
  );
}

export default QuotationSummaryActions;
