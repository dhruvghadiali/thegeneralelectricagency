import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";

function CompanyDetails({ company, onClose }) {
  const details = company
    ? [
        ["Tally GUID", company.guid],
        ["Master ID", company.masterId],
        ["Ledger group", company.parent],
        ["GSTIN", company.gstin],
        ["PAN", company.pan],
        ["Email", company.email],
        ["Phone", company.phone],
        ["Address", company.address],
        ["State", company.state],
        ["Pincode", company.pinCode],
      ]
    : [];

  return (
    <Sheet open={Boolean(company)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full gap-0 sm:max-w-xl">
        <SheetHeader className="border-b pr-12">
          <SheetTitle className="break-words">{company?.name}</SheetTitle>
          <SheetDescription>Ledger details received from Tally.</SheetDescription>
        </SheetHeader>
        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto p-4">
          <dl className="divide-y">
            {details.filter(([, value]) => value).map(([label, value]) => (
              <div key={label} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="break-words text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CompanyDetails;
