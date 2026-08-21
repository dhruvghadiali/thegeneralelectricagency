function CompanyDetailItem({ icon, label, value, href }) {
  const Icon = icon;
  const content = href ? (
    <a href={href} className="break-words text-primary hover:underline">
      {value || "—"}
    </a>
  ) : (
    <span className="break-words">{value || "—"}</span>
  );

  return (
    <div className="flex min-w-0 gap-3 rounded-lg border bg-card p-3">
      <span className="mt-0.5 rounded-md bg-muted p-2 text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="mt-1 text-sm font-medium">{content}</div>
      </div>
    </div>
  );
}

export default CompanyDetailItem;
