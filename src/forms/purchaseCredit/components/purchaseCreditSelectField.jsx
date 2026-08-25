import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

function PurchaseCreditSelectField({
  id,
  value,
  options,
  placeholder,
  disabled = false,
  error,
  onChange,
  onBlur,
}) {
  return (
    <Select
      value={value === undefined || value === null ? "" : String(value)}
      disabled={disabled}
      onValueChange={onChange}
      onOpenChange={(open) => !open && onBlur?.()}
    >
      <SelectTrigger
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default PurchaseCreditSelectField;
