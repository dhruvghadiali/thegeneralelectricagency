import { useCallback, useEffect, useMemo } from "react";
import { ArrowLeft, FileClock, FileText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectQuotationViewOpenSection } from "@Redux/quotation/quotation.selector";
import {
  quotationViewSectionClosed,
  quotationViewSectionToggled,
} from "@Redux/quotation/quotation.slice";
import { ROUTES } from "@routes/navigate";
import { Button } from "@shadcnComponent/button";
import { buildQuotationHistory } from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";

import CompanyDetails from "@screenComponent/quotations/viewQuotationInformation/company/companyDetails";
import QuotationHistory from "@screenComponent/quotations/viewQuotationInformation/history/quotationHistory";
import QuotationInformationAccordion from "@screenComponent/quotations/viewQuotationInformation/quotationInformationAccordion";
import CurrentQuotationDetails from "@screenComponent/quotations/viewQuotationInformation/currentVersion/currentQuotationDetails";
import QuotationLoadingState from "@/components/screen/quotations/viewQuotationInformation/quotationDetails/quotationLoadingState";
import QuotationUnavailableState from "@/components/screen/quotations/viewQuotationInformation/quotationDetails/quotationUnavailableState";
import QuotationPdfDownloadButton from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/quotationPdfDownloadButton";
import useViewQuotationInformationKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/viewQuotationInformation/useViewQuotationInformationKeyboardShortcut";

function ViewQuotationInformation({ quotation, isLoading, error }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openSection = useSelector(selectQuotationViewOpenSection);
  const historyVersionCount = useMemo(
    () => buildQuotationHistory(quotation?.quotationHistory ?? []).length,
    [quotation?.quotationHistory],
  );
  const goBack = useCallback(() => navigate(ROUTES.QUOTATIONS), [navigate]);
  const closeSection = useCallback(
    () => dispatch(quotationViewSectionClosed()),
    [dispatch],
  );
  const toggleSection = useCallback(
    (section) => dispatch(quotationViewSectionToggled(section)),
    [dispatch],
  );

  useEffect(() => {
    closeSection();

    return () => {
      closeSection();
    };
  }, [closeSection]);

  const {
    companyRef,
    currentRef,
    handleSectionNavigation,
    historyEntryRefs,
    historyRef,
    moveAfterHistory,
    moveBeforeHistory,
  } = useViewQuotationInformationKeyboardShortcut({
    quotation,
    openSection,
    onCloseSection: closeSection,
    onBack: goBack,
  });

  if (isLoading) {
    return <QuotationLoadingState />;
  }

  if (!quotation) {
    return <QuotationUnavailableState error={error} onBack={goBack} />;
  }

  return (
    <main
      className="mx-auto flex w-full max-w-7xl flex-col gap-5 pb-3"
      onKeyDown={handleSectionNavigation}
    >
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-primary">
            Quotation information
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            {quotation.quotationNumber || "Quotation details"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Company, current commercial details, and revision history.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={goBack}
          tabIndex={-1}
          aria-keyshortcuts="Escape"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
          <kbd className="ml-1 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            Esc
          </kbd>
        </Button>
      </header>

      <CompanyDetails
        companyInformation={quotation.companyInformation}
        sectionRef={companyRef}
      />

      <QuotationInformationAccordion
        id="current-quotation"
        title="Current quotation details"
        description={`${quotation.productInformation?.length ?? 0} products · ${quotation.quotationVersion || "Current version"}`}
        icon={FileText}
        isOpen={openSection === "current"}
        onToggle={() => toggleSection("current")}
        triggerRef={currentRef}
        sectionIndex="1"
        action={<QuotationPdfDownloadButton quotation={quotation} />}
      >
        <CurrentQuotationDetails quotation={quotation} />
      </QuotationInformationAccordion>

      <QuotationInformationAccordion
        id="quotation-history"
        title="Quotation history"
        description={`${historyVersionCount} recorded revisions`}
        icon={FileClock}
        isOpen={openSection === "history"}
        onToggle={() => toggleSection("history")}
        triggerRef={historyRef}
        sectionIndex="2"
      >
        <QuotationHistory
          history={quotation.quotationHistory}
          quotation={quotation}
          triggerRefs={historyEntryRefs}
          onMoveBeforeHistory={moveBeforeHistory}
          onMoveAfterHistory={moveAfterHistory}
        />
      </QuotationInformationAccordion>

      <p className="text-center text-xs text-muted-foreground">
        Tab moves forward · Backspace or Delete moves back · Enter opens an
        accordion · Escape returns to quotations
      </p>
    </main>
  );
}

export default ViewQuotationInformation;
