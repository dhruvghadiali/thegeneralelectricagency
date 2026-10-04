import _ from "lodash";

function SyncPendingDetailItem({ label, value, className = "" }) {
  const displayValue = _.isNil(value) || value === "" ? "—" : value;

  return (
    <div className={`rounded-lg border bg-card p-3 ${className}`}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm font-medium">{displayValue}</p>
    </div>
  );
}

export default SyncPendingDetailItem;
