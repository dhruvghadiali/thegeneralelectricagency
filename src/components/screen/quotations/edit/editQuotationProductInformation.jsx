import QuotationProductInformation from "@screenComponent/quotations/create/productInformation";

function EditQuotationProductInformation({ companyInformation }) {
  return (
    <QuotationProductInformation
      companyInformation={companyInformation}
      canNavigateToCompanyInformation={false}
    />
  );
}

export default EditQuotationProductInformation;
