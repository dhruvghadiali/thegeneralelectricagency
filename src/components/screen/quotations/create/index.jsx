import CreateQuotationForm from "@screenComponent/quotations/create/form/createQuotationForm";
import useCreateQuotationKeyboardShortcut from "@screenComponent/quotations/create/hooks/useCreateQuotationKeyboardShortcut";
import useQuotationCompanySearch from "@screenComponent/quotations/create/hooks/useQuotationCompanySearch";

function CreateQuotation() {
  useCreateQuotationKeyboardShortcut();
  useQuotationCompanySearch();

  return (
    <main className="h-full min-h-0 w-full">
      <CreateQuotationForm />
    </main>
  );
}

export default CreateQuotation;
