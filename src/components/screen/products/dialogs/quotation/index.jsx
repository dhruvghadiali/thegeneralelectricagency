import { useRef } from "react";

import { Dialog, DialogContent } from "@shadcnComponent/dialog";
import QuotationCompanyInformation from "@screenComponent/products/dialogs/quotation/quotationCompanyInformation";
import QuotationCompanyPicker from "@screenComponent/products/dialogs/quotation/quotationCompanyPicker";
import QuotationDialogFooter from "@screenComponent/products/dialogs/quotation/quotationDialogFooter";
import QuotationDialogHeader from "@screenComponent/products/dialogs/quotation/quotationDialogHeader";
import QuotationGstPercentage from "@screenComponent/products/dialogs/quotation/quotationGstPercentage";
import QuotationTaxTreatment from "@screenComponent/products/dialogs/quotation/quotationTaxTreatment";

const EMPTY_PRODUCTS = Object.freeze([]);

function ProductQuotationDialog({ products = EMPTY_PRODUCTS, onClose, onNext }) {
  const contentRef = useRef(null);
  const isOpen = products.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        ref={contentRef}
        data-lenis-prevent
        className="max-h-[90vh] max-w-2xl overflow-y-auto"
      >
        <QuotationDialogHeader />

        <section className="grid gap-4">
          <QuotationCompanyPicker
            containerRef={contentRef}
            isOpen={isOpen}
            products={products}
          />
          <QuotationCompanyInformation />
          <QuotationTaxTreatment />
          <QuotationGstPercentage />
        </section>

        <QuotationDialogFooter onNext={onNext} />
      </DialogContent>
    </Dialog>
  );
}

export default ProductQuotationDialog;
