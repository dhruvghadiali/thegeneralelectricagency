function PurchaseCreditRecordItem({ icon, label, value }) {
  const Icon = icon;

  return (
    <div className="flex gap-3 rounded-lg border bg-card p-3">
      <Icon className="mt-0.5 size-4 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium">{value || "—"}</p>
      </div>
    </div>
  );
}

export default PurchaseCreditRecordItem;
