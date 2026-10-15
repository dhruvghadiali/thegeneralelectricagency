import { PDF_COLORS } from "@screenComponent/quotations/downloadPdf/pdf/pdf.constants";
import {
  drawPdfCell,
  drawPdfText,
} from "@screenComponent/quotations/downloadPdf/pdf/pdf.utils";

function drawPartnerLogo(doc, imageData, x, y, width, height, alias) {
  if (!imageData) return;

  doc.addImage(imageData, "PNG", x, y, width, height, alias, "FAST");
}

export function drawQuotationPartnerSection(doc, images = {}, y = 54) {
  drawPdfCell(doc, 12, y, 186, 18, {
    fill: PDF_COLORS.surface,
    lineWidth: 0.35,
  });

  drawPdfText(doc, "AUTHORISED DEALER FOR", 58.5, y + 4.8, {
    align: "center",
    bold: true,
    color: PDF_COLORS.primary,
    size: 6.5,
  });
  drawPartnerLogo(doc, images.cg, 38, y + 7.3, 7.5, 7.3, "cg-partner");
  drawPartnerLogo(
    doc,
    images.premiumTransmission,
    52,
    y + 8.3,
    31,
    5.5,
    "premium-transmission-partner",
  );

  drawPdfText(doc, "WE DEAL IN", 151.5, y + 4.8, {
    align: "center",
    bold: true,
    color: PDF_COLORS.primary,
    size: 6.5,
  });
  drawPartnerLogo(doc, images.elecon, 121, y + 7.2, 26, 8.4, "elecon-partner");
  drawPartnerLogo(
    doc,
    images.bonfiglioli,
    157,
    y + 7,
    27,
    8.9,
    "bonfiglioli-partner",
  );
}
