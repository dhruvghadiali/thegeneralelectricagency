import UpdatedMark from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/updatedMark";

function Detail({ label, children, changed = false }) {
  return (
    <div
      className={
        changed ? "rounded-md bg-amber-50 p-2 ring-1 ring-amber-200" : undefined
      }
    >
      <dt className="text-xs text-muted-foreground">
        {label}
        {changed && <UpdatedMark />}
      </dt>
      <dd className="mt-1 break-words text-sm font-medium [overflow-wrap:anywhere]">
        {children}
      </dd>
    </div>
  );
}

export default Detail;
