import { Card, CardContent } from "@shadcnComponent/card";
import QuotationGstPercentageSelect from "@screenComponent/quotations/form/quotationSummary/controls/quotationGstPercentageSelect";
import QuotationNotesFields from "@screenComponent/quotations/form/quotationSummary/controls/quotationNotesFields";
import QuotationTaxTreatmentSelect from "@screenComponent/quotations/form/quotationSummary/controls/quotationTaxTreatmentSelect";
import QuotationSubmissionError from "@screenComponent/quotations/form/quotationSummary/layout/quotationSubmissionError";
import QuotationSummaryActions from "@screenComponent/quotations/form/quotationSummary/layout/quotationSummaryActions";
import QuotationSummaryHeader from "@screenComponent/quotations/form/quotationSummary/layout/quotationSummaryHeader";
import QuotationCompanyInformation from "@screenComponent/quotations/form/quotationSummary/sections/quotationCompanyInformation";
import QuotationFinalBillDetails from "@screenComponent/quotations/form/quotationSummary/sections/quotationFinalBillDetails";
import QuotationProductInformation from "@screenComponent/quotations/form/quotationSummary/sections/quotationProductInformation";
import useQuotationSummary from "@screenComponent/quotations/form/quotationSummary/useQuotationSummary";

function QuotationSummary({
  isSubmitting,
  onSubmit,
  submitLabel,
  submittingLabel,
  title,
}) {
  const summary = useQuotationSummary();

  return (
    <div className="w-full pb-6">
      <Card className="w-full gap-0 overflow-hidden py-0">
        <QuotationSummaryHeader title={title} />
        <CardContent className="grid gap-5 px-6 py-5">
          <QuotationSubmissionError error={summary.submissionError} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <QuotationTaxTreatmentSelect
              triggerRef={summary.keyboard.refs.taxTreatmentRef}
              onKeyDown={summary.keyboard.handleTaxTreatmentKeyDown}
            />
            <QuotationGstPercentageSelect
              triggerRef={summary.keyboard.refs.gstPercentageRef}
              onKeyDown={summary.keyboard.handleGstPercentageKeyDown}
            />
            <QuotationNotesFields
              deliveryNotesRef={summary.keyboard.refs.deliveryNotesRef}
              paymentNotesRef={summary.keyboard.refs.paymentNotesRef}
              onDeliveryNotesKeyDown={
                summary.keyboard.handleDeliveryNotesKeyDown
              }
              onPaymentNotesKeyDown={
                summary.keyboard.handlePaymentNotesKeyDown
              }
            />
          </div>
          <QuotationCompanyInformation
            companyInformation={summary.companyInformation}
            sectionRef={summary.keyboard.refs.billToRef}
            onKeyDown={summary.keyboard.handleBillToKeyDown}
          />
          <QuotationProductInformation
            products={summary.products}
            sectionRef={summary.keyboard.refs.productsRef}
            onKeyDown={summary.keyboard.handleProductsKeyDown}
          />
          <QuotationFinalBillDetails
            products={summary.products}
            sectionRef={summary.keyboard.refs.finalBillDetailsRef}
            onKeyDown={summary.keyboard.handleFinalBillDetailsKeyDown}
          />
        </CardContent>
        <QuotationSummaryActions
          isSubmitting={isSubmitting}
          keyboard={summary.keyboard}
          onBack={summary.returnToProductInformation}
          onSubmit={onSubmit}
          submitLabel={submitLabel}
          submittingLabel={submittingLabel}
        />
      </Card>
    </div>
  );
}

export default QuotationSummary;
