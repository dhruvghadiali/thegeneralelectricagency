import { useFormik } from "formik";
import { RotateCcw } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { DialogClose, DialogFooter } from "@shadcnComponent/dialog";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import { RESTORE_COMPANY_INITIAL_VALUES } from "@Forms/company/restoreCompany/restoreCompany.initialValues";
import { restoreCompanyValidationSchema } from "@Forms/company/restoreCompany/restoreCompany.validation.schema";

function RestoreCompanyForm({ onSubmit, isSubmitting }) {
  const formik = useFormik({
    initialValues: RESTORE_COMPANY_INITIAL_VALUES,
    validationSchema: restoreCompanyValidationSchema,
    onSubmit: (values) => onSubmit(restoreCompanyValidationSchema.cast(values)),
  });
  const passwordError =
    formik.touched.password && formik.errors.password
      ? formik.errors.password
      : null;
  const isBusy = isSubmitting || formik.isSubmitting;

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-2">
        <Label htmlFor="company-restore-password">Password</Label>
        <Input
          id="company-restore-password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="current-password"
          placeholder="Enter your password"
          aria-invalid={Boolean(passwordError)}
          aria-describedby={
            passwordError ? "company-restore-password-error" : undefined
          }
          autoFocus
        />
        {passwordError && (
          <p
            id="company-restore-password-error"
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
          {isBusy ? "Restoring..." : "Restore company"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default RestoreCompanyForm;
