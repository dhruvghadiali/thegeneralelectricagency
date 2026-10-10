import { jsPDF } from "jspdf";

import { QUOTATION_TAX_TREATMENTS } from "@Enums";
import {
  PDF_BRAND,
  PDF_PAGE,
} from "@screenComponent/quotations/create/downloadPdf/pdf/pdf.constants";
import {
  aggregatePdfPricing,
  createQuotationNumber,
  numberOrZero,
} from "@screenComponent/quotations/create/downloadPdf/pdf/pdf.utils";
import { drawQuotationFooter } from "@screenComponent/quotations/create/downloadPdf/sections/quotationFooterSection";
import {
  drawBrandHeader,
  drawCompanySection,
  drawQuotationTitle,
} from "@screenComponent/quotations/create/downloadPdf/sections/quotationHeaderSection";
import {
  drawProductSection,
  getPageProducts,
  getProductTableHeight,
} from "@screenComponent/quotations/create/downloadPdf/sections/quotationProductSection";
import {
  drawQuotationTotalsSection,
  getQuotationTotalsSectionHeight,
} from "@screenComponent/quotations/create/downloadPdf/sections/quotationTotalsSection";

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

export function createQuotationPdfDocument(sections, logoDataUrl) {
  const { company, products, commercial } = sections;
  const firstProduct = products[0]?.product ?? {};
  const quotationId = createQuotationNumber(firstProduct, products.length);
  const totals = calculateDocumentTotals(products, commercial);
  const generatedAt = new Date().toLocaleDateString("en-IN", {
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
  drawBrandHeader(doc, logoDataUrl);
  drawCompanySection(doc, company);

  const productTableHeight = getProductTableHeight(doc, products);
  const totalsSectionHeight = getQuotationTotalsSectionHeight(
    commercial.taxTreatment,
  );
  const fitsOnFirstPage =
    90 + productTableHeight + 3 + totalsSectionHeight <= PDF_PAGE.footerY;

  if (fitsOnFirstPage) {
    const productTableEnd = drawProductSection(doc, products, 90);
    drawQuotationTotalsSection(
      doc,
      totals,
      productTableEnd + 3,
      commercial,
    );
  } else {
    let productIndex = 0;
    const firstPageProducts = getPageProducts(doc, products, productIndex, 180);

    drawProductSection(doc, firstPageProducts, 90, productIndex);
    productIndex += firstPageProducts.length;

    while (productIndex < products.length) {
      doc.addPage();

      const pageProducts = getPageProducts(doc, products, productIndex, 264);
      drawProductSection(doc, pageProducts, 12, productIndex);
      productIndex += pageProducts.length;
    }

    doc.addPage();
    drawQuotationTotalsSection(doc, totals, 12, commercial);
  }

  const pageCount = doc.getNumberOfPages();

  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    drawQuotationFooter(doc, page, pageCount);
  }

  return { doc, quotationId };
}
