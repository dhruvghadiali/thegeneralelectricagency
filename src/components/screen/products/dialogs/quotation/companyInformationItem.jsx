function CompanyInformationItem({ icon, label, value, className = "" }) {
  return (
    <div className={`flex min-w-0 gap-3 ${className}`}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 min-h-5 break-words text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

export default CompanyInformationItem;
