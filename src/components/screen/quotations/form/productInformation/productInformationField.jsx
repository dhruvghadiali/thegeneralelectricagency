import { Label } from "@shadcnComponent/label";

function ProductInformationField({ id, label, error, action, children }) {
  return (
    <div className="grid content-start gap-2 self-start">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        {action}
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

export default ProductInformationField;
