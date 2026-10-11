import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

function ProductSelect({
  id,
  field,
  placeholder,
  options,
  formik,
  error,
  numeric = false,
}) {
  const value = formik.values[field];

  return (
    <Select
      value={value === "" || value === undefined ? "" : String(value)}
      onValueChange={(nextValue) =>
        formik.setFieldValue(
          field,
          numeric ? Number(nextValue) : nextValue,
          true,
        )
      }
      onOpenChange={(open) =>
        !open && formik.setFieldTouched(field, true, true)
      }
    >
      <SelectTrigger
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="aria-invalid:border-destructive aria-invalid:ring-destructive/20"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ProductSelect;
