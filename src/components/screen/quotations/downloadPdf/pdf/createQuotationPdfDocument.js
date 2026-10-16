import { jsPDF } from "jspdf";

import { QUOTATION_TAX_TREATMENTS } from "@Enums";
import {
  PDF_BRAND,
  PDF_PAGE,
} from "@screenComponent/quotations/downloadPdf/pdf/pdf.constants";
import {
  aggregatePdfPricing,
  createQuotationNumber,
  numberOrZero,
} from "@screenComponent/quotations/downloadPdf/pdf/pdf.utils";
import { drawQuotationFooter } from "@screenComponent/quotations/downloadPdf/sections/quotationFooterSection";
import {
  drawBrandHeader,
  drawCompanySection,
  drawQuotationTitle,
} from "@screenComponent/quotations/downloadPdf/sections/quotationHeaderSection";
import { drawQuotationCommercialSections } from "@screenComponent/quotations/downloadPdf/sections/quotationCommercialSection";
import {
  drawProductSection,
  getPageProducts,
} from "@screenComponent/quotations/downloadPdf/sections/quotationProductSection";
import {
  drawQuotationTotalsSection,
  getQuotationTotalsSectionHeight,
} from "@screenComponent/quotations/downloadPdf/sections/quotationTotalsSection";

function calculateDocumentTotals(products, commercial) {
  const productTotals = aggregatePdfPricing(products);
  const hasGst =
    commercial.taxTreatment === QUOTATION_TAX_TREATMENTS.GUJARAT ||
    commercial.taxTreatment === QUOTATION_TAX_TREATMENTS.OUT_OF_GUJARAT;
  const gstPercentage = hasGst
    ? Math.max(numberOrZero(commercial.gstPercentage), 0)
    : 0;
  const totalTax = productTotals.taxableAmount * (gstPercentage / 100);

  return {
    ...productTotals,
    totalTax,
    finalAmount: productTotals.taxableAmount + totalTax,
  };
}

const FIRST_PAGE_PRODUCT_Y = 82;

export function createQuotationPdfDocument(sections, pdfImages = {}) {
  const {
    quotationRefId,
    quotationDate,
    company,
    products,
    commercial,
    enquiryContact,
  } = sections;
  const quotationId = quotationRefId || createQuotationNumber(company.name);
  const totals = calculateDocumentTotals(products, commercial);
  const requestedDate = quotationDate ? new Date(quotationDate) : new Date();
  const generatedDate = Number.isNaN(requestedDate.getTime())
    ? new Date()
    : requestedDate;
  const generatedAt = generatedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });

  doc.setProperties({
    title: `Product quotation - ${products.length} product${products.length === 1 ? "" : "s"}`,
    subject: `Quotation for ${products.map((item) => item.product.productCode || item.product.name).join(", ")}`,
    author: PDF_BRAND.name,
    creator: PDF_BRAND.name,
  });

  drawQuotationTitle(doc, quotationId, generatedAt);
  drawBrandHeader(doc, pdfImages.company, enquiryContact);
  drawCompanySection(doc, company);

  const totalsSectionHeight = getQuotationTotalsSectionHeight(
    commercial.taxTreatment,
  );
  let productIndex = 0;
  let productY = FIRST_PAGE_PRODUCT_Y;
  let productTableEnd;

  if (products.length === 0) {
    productTableEnd = drawProductSection(doc, [], productY);
  }

  while (productIndex < products.length) {
    const pageProducts = getPageProducts(
      doc,
      products,
      productIndex,
      PDF_PAGE.contentBottom - productY,
    );

    productTableEnd = drawProductSection(
      doc,
      pageProducts,
      productY,
      productIndex,
    );
    productIndex += pageProducts.length;

    if (productIndex < products.length) {
      doc.addPage();
      productY = PDF_PAGE.top;
    }
  }

  let totalsY = productTableEnd + 3;

  if (totalsY + totalsSectionHeight > PDF_PAGE.contentBottom) {
    doc.addPage();
    totalsY = PDF_PAGE.top;
  }

  const totalsEnd = drawQuotationTotalsSection(
    doc,
    totals,
    totalsY,
    commercial,
  );
  drawQuotationCommercialSections(doc, totalsEnd, commercial, pdfImages);

  const pageCount = doc.getNumberOfPages();

  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    drawQuotationFooter(doc, page, pageCount);
  }

  return { doc, quotationId };
}
