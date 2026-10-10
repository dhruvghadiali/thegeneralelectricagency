import { Label } from "@shadcnComponent/label";

function QuotationCompanyInformation({
  companyInformation,
  sectionRef,
  onKeyDown,
}) {
  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      aria-labelledby="quotation-bill-to"
      onKeyDown={onKeyDown}
      className="grid gap-2 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <Label id="quotation-bill-to" className="font-semibold">
        Bill to
      </Label>
      <div className="rounded-md border bg-muted/15 px-3 py-2.5">
        <p className="text-sm font-semibold leading-5">
          {companyInformation?.companyName ?? "-"}
        </p>
        <p className="whitespace-pre-line text-xs leading-5 text-muted-foreground">
          {companyInformation?.address ?? "-"}
        </p>
      </div>
    </section>
  );
}

export default QuotationCompanyInformation;
