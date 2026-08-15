import { useFormik } from "formik";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { employeeValidationSchema } from "@/forms/employee/employee.validation.schema";
import { ASSIGNABLE_ROLE_OPTIONS } from "@/components/screen/employees/employee.utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FormField({ id, label, error, children }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p
          id={`${id.replace("employee-", "")}-error`}
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function EmployeeForm({ employee, onSubmit, submitLabel, isSubmitting }) {
  const formik = useFormik({
    initialValues: employee,
    validationSchema: employeeValidationSchema,
    onSubmit: (values) => onSubmit(employeeValidationSchema.cast(values)),
  });

  const isBusy = isSubmitting || formik.isSubmitting;

  const fieldError = (field) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;

  const inputProps = (field) => ({
    name: field,
    value: formik.values[field],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    "aria-invalid": Boolean(fieldError(field)),
    "aria-describedby": fieldError(field) ? `${field}-error` : undefined,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="employee-firstName"
          label="First name"
          error={fieldError("firstName")}
        >
          <Input
            id="employee-firstName"
            {...inputProps("firstName")}
            placeholder="e.g. Ishaan"
            autoComplete="given-name"
          />
        </FormField>
        <FormField
          id="employee-lastName"
          label="Last name"
          error={fieldError("lastName")}
        >
          <Input
            id="employee-lastName"
            {...inputProps("lastName")}
            placeholder="e.g. Verma"
            autoComplete="family-name"
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="employee-email"
          label="Email address"
          error={fieldError("email")}
        >
          <Input
            id="employee-email"
            type="email"
            {...inputProps("email")}
            placeholder="name@company.com"
            autoComplete="email"
          />
        </FormField>
        <FormField
          id="employee-phone"
          label="Phone number"
          error={fieldError("phone")}
        >
          <Input
            id="employee-phone"
            type="tel"
            {...inputProps("phone")}
            placeholder="+91 98765 43210"
            autoComplete="tel"
          />
        </FormField>
      </div>

      <FormField
        id="employee-username"
        label="Username"
        error={fieldError("username")}
      >
        <Input
          id="employee-username"
          {...inputProps("username")}
          placeholder="e.g. ishaan.verma"
          autoComplete="username"
        />
      </FormField>

      <FormField id="employee-role" label="Role" error={fieldError("role")}>
        <Select
          value={formik.values.role}
          onValueChange={(value) => formik.setFieldValue("role", value, true)}
          onOpenChange={(open) =>
            !open && formik.setFieldTouched("role", true, true)
          }
        >
          <SelectTrigger
            id="employee-role"
            aria-invalid={Boolean(fieldError("role"))}
            className="aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
          >
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {ASSIGNABLE_ROLE_OPTIONS.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <DialogFooter className="mt-2">
        <DialogClose asChild>
          <Button type="button" variant="outline" disabled={isBusy}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isBusy}>
          {isBusy ? "Saving..." : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default EmployeeForm;
