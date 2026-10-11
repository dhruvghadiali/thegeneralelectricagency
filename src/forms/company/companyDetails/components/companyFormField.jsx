import { Label } from "@shadcnComponent/label";

function CompanyFormField({ id, label, error, optional = false, children }) {
  return (
    <div className="grid content-start gap-2 self-start">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {optional && (
          <span className="text-xs text-muted-foreground">Optional</span>
        )}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export default CompanyFormField;
