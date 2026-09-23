import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";

function ProductDetails({ product, onClose }) {
  const details = product
    ? [
        ["Tally GUID", product.guid],
        ["Master ID", product.masterId],
        ["Alter ID", product.alterId],
        ["Description", product.description],
        ["Stock group", product.group],
        ["Units", product.units],
        ["HSN code", product.hsnCode],
        ["GST applicable", product.gstApplicable],
        ["Type of supply", product.supplyType],
        ["Opening balance", product.openingBalance],
        ["Closing balance", product.closingBalance],
      ]
    : [];

  return (
    <Sheet open={Boolean(product)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full gap-0 sm:max-w-xl">
        <SheetHeader className="border-b pr-12">
          <SheetTitle className="break-words">{product?.name}</SheetTitle>
          <SheetDescription>Stock item details received from Tally.</SheetDescription>
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

export default ProductDetails;
