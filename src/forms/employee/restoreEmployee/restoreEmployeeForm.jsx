import { useFormik } from "formik";
import { RotateCcw } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import { DialogClose, DialogFooter } from "@shadcnComponent/dialog";
import { RESTORE_EMPLOYEE_INITIAL_VALUES } from "@Forms/employee/restoreEmployee/restoreEmployee.initialValues";
import { restoreEmployeeValidationSchema } from "@Forms/employee/restoreEmployee/restoreEmployee.validation.schema";

function RestoreEmployeeForm({ onSubmit, isSubmitting }) {
  const formik = useFormik({
    initialValues: RESTORE_EMPLOYEE_INITIAL_VALUES,
    validationSchema: restoreEmployeeValidationSchema,
    onSubmit: (values) => onSubmit(restoreEmployeeValidationSchema.cast(values)),
  });
  const passwordError =
    formik.touched.password && formik.errors.password
      ? formik.errors.password
      : null;
  const isBusy = isSubmitting || formik.isSubmitting;

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-2">
        <Label htmlFor="employee-restore-password">Password</Label>
        <Input
          id="employee-restore-password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="current-password"
          placeholder="Enter your password"
          aria-invalid={Boolean(passwordError)}
          aria-describedby={passwordError ? "employee-restore-password-error" : undefined}
          autoFocus
        />
        {passwordError && (
          <p
            id="employee-restore-password-error"
            className="text-xs font-medium text-destructive"
          >
            {passwordError}
          </p>
        )}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" disabled={isBusy}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isBusy}>
          <RotateCcw className="size-4" />
          {isBusy ? "Restoring..." : "Restore employee"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default RestoreEmployeeForm;
