import { ArrowLeft, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import {
  selectQuotationCompanyInformation,
  selectQuotationProductInformation,
} from "@Redux/quotation/quotation.selector";
import { quotationStepChanged } from "@Redux/quotation/quotation.slice";
import { Button } from "@shadcnComponent/button";
import { Card, CardContent, CardFooter } from "@shadcnComponent/card";
import useQuotationSummaryKeyboardShortcuts from "@screenComponent/quotations/create/hooks/quotationSummary";
import QuotationCompanyInformation from "@screenComponent/quotations/create/quotationSummary/quotationCompanyInformation";
import QuotationFinalBillDetails from "@screenComponent/quotations/create/quotationSummary/quotationFinalBillDetails";
import QuotationGstPercentageSelect from "@screenComponent/quotations/create/quotationSummary/quotationGstPercentageSelect";
import QuotationNotesFields from "@screenComponent/quotations/create/quotationSummary/quotationNotesFields";
import QuotationProductInformation from "@screenComponent/quotations/create/quotationSummary/quotationProductInformation";
import QuotationSummaryHeader from "@screenComponent/quotations/create/quotationSummary/quotationSummaryHeader";
import QuotationTaxTreatmentSelect from "@screenComponent/quotations/create/quotationSummary/quotationTaxTreatmentSelect";

function QuotationSummary() {
  const dispatch = useDispatch();
  const companyInformation = useSelector(selectQuotationCompanyInformation);
  const products = useSelector(selectQuotationProductInformation);
  const keyboard = useQuotationSummaryKeyboardShortcuts();

  const returnToProductInformation = () => {
    dispatch(quotationStepChanged(CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION));
  };

  return (
    <div className="w-full pb-6">
      <Card className="w-full gap-0 overflow-hidden py-0">
        <QuotationSummaryHeader />
        <CardContent className="grid gap-5 px-6 py-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <QuotationTaxTreatmentSelect
              triggerRef={keyboard.refs.taxTreatmentRef}
              onKeyDown={keyboard.handleTaxTreatmentKeyDown}
            />
            <QuotationGstPercentageSelect
              triggerRef={keyboard.refs.gstPercentageRef}
              onKeyDown={keyboard.handleGstPercentageKeyDown}
            />
            <QuotationNotesFields
              deliveryNotesRef={keyboard.refs.deliveryNotesRef}
              paymentNotesRef={keyboard.refs.paymentNotesRef}
              onDeliveryNotesKeyDown={keyboard.handleDeliveryNotesKeyDown}
              onPaymentNotesKeyDown={keyboard.handlePaymentNotesKeyDown}
            />
          </div>
          <QuotationCompanyInformation
            companyInformation={companyInformation}
            sectionRef={keyboard.refs.billToRef}
            onKeyDown={keyboard.handleBillToKeyDown}
          />
          <QuotationProductInformation
            products={products}
            sectionRef={keyboard.refs.productsRef}
            onKeyDown={keyboard.handleProductsKeyDown}
          />
          <QuotationFinalBillDetails
            products={products}
            sectionRef={keyboard.refs.finalBillDetailsRef}
            onKeyDown={keyboard.handleFinalBillDetailsKeyDown}
          />
        </CardContent>
        <CardFooter className="justify-end gap-2 bg-muted/20 px-6 py-4">
          <Button
            ref={keyboard.refs.backButtonRef}
            type="button"
            variant="outline"
            onClick={returnToProductInformation}
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
            onKeyDown={keyboard.handleSubmitButtonKeyDown}
          >
            <Send className="size-4" aria-hidden="true" />
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default QuotationSummary;
