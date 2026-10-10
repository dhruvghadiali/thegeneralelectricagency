import QuotationCompanySummaryCard from "@screenComponent/quotations/create/companyInformation/quotationCompanySummaryCard";
import QuotationProductInformationCard from "@screenComponent/quotations/create/productInformation/quotationProductInformationCard";
import QuotationProductList from "@screenComponent/quotations/create/productInformation/quotationProductList";

function QuotationProductInformation({ companyInformation }) {
  return (
    <div className="grid w-full gap-6 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)]">
      <div className="flex min-w-0 flex-col gap-6">
        <QuotationCompanySummaryCard
          companyName={companyInformation.companyName}
          address={companyInformation.address}
        />
        <QuotationProductInformationCard />
      </div>
      <QuotationProductList />
    </div>
  );
}

export default QuotationProductInformation;
