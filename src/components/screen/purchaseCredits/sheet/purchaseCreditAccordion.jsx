import { useState } from "react";
import {
  Boxes,
  CalendarClock,
  CircleDollarSign,
  Info,
  ReceiptIndianRupee,
} from "lucide-react";

import PurchaseCreditAccordionSection from "@screenComponent/purchaseCredits/sheet/purchaseCreditAccordionSection";
import PurchaseCreditOverviewSection from "@screenComponent/purchaseCredits/sheet/purchaseCreditOverviewSection";
import PurchaseCreditPaymentPlanningSection from "@screenComponent/purchaseCredits/sheet/purchaseCreditPaymentPlanningSection";
import PurchaseCreditPaymentsSection from "@screenComponent/purchaseCredits/sheet/purchaseCreditPaymentsSection";
import PurchaseCreditProductsSection from "@screenComponent/purchaseCredits/sheet/purchaseCreditProductsSection";
import PurchaseCreditRecordSection from "@screenComponent/purchaseCredits/sheet/purchaseCreditRecordSection";
import { formatPurchaseCreditAmount } from "@Forms/purchaseCredit/purchaseCreditForm.utils";

const SECTION_IDS = Object.freeze({
  OVERVIEW: "purchase-credit-overview",
  PRODUCTS: "purchase-credit-products",
  PAYMENTS: "purchase-credit-payments",
  PAYMENT_PLANNING: "purchase-credit-payment-planning",
  RECORD: "purchase-credit-record",
});

function PurchaseCreditAccordion({ purchaseCredit }) {
  const [openSection, setOpenSection] = useState(SECTION_IDS.OVERVIEW);
  const sectionProps = (id) => ({
    id,
    isOpen: openSection === id,
    onToggle: () =>
      setOpenSection((current) => (current === id ? null : id)),
  });

  return (
    <div className="space-y-3">
      <PurchaseCreditAccordionSection
        {...sectionProps(SECTION_IDS.OVERVIEW)}
        icon={Info}
        title="Purchase overview"
        description="Purchase schedule, amounts, supplier, and acknowledgement details."
        badges={[
          `Purchase ${formatPurchaseCreditAmount(purchaseCredit.purchaseAmount)}`,
          `Remaining ${formatPurchaseCreditAmount(purchaseCredit.availableAmount)}`,
        ]}
      >
        <PurchaseCreditOverviewSection purchaseCredit={purchaseCredit} />
      </PurchaseCreditAccordionSection>

      <PurchaseCreditAccordionSection
        {...sectionProps(SECTION_IDS.PRODUCTS)}
        icon={Boxes}
        title="Products"
        description="Products and stock included in this purchase."
        count={purchaseCredit.products.length}
        countLabel="product"
      >
        <PurchaseCreditProductsSection products={purchaseCredit.products} />
      </PurchaseCreditAccordionSection>

      <PurchaseCreditAccordionSection
        {...sectionProps(SECTION_IDS.PAYMENTS)}
        icon={CircleDollarSign}
        title="Payments"
        description="Payment records attached to this purchase credit."
        count={purchaseCredit.payments.length}
        countLabel="payment"
        badges={[
          `Payment ${formatPurchaseCreditAmount(purchaseCredit.paymentAmount)}`,
        ]}
      >
        <PurchaseCreditPaymentsSection payments={purchaseCredit.payments} />
      </PurchaseCreditAccordionSection>

      <PurchaseCreditAccordionSection
        {...sectionProps(SECTION_IDS.PAYMENT_PLANNING)}
        icon={CalendarClock}
        title="Payment planning"
        description="Upcoming payment reminders for this purchase."
        count={purchaseCredit.paymentPlanning.length}
        countLabel="plan"
        badges={[
          `Planned ${formatPurchaseCreditAmount(purchaseCredit.plannedAmount)}`,
        ]}
      >
        <PurchaseCreditPaymentPlanningSection
          paymentPlanning={purchaseCredit.paymentPlanning}
        />
      </PurchaseCreditAccordionSection>

      <PurchaseCreditAccordionSection
        {...sectionProps(SECTION_IDS.RECORD)}
        icon={ReceiptIndianRupee}
        title="Record information"
        description="Supplier and record creation information."
      >
        <PurchaseCreditRecordSection purchaseCredit={purchaseCredit} />
      </PurchaseCreditAccordionSection>
    </div>
  );
}

export default PurchaseCreditAccordion;
