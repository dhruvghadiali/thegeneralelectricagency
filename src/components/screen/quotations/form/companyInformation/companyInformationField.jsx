import { Label } from "@shadcnComponent/label";

function CompanyInformationField({ id, label, error, children }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default CompanyInformationField;
