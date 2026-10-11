import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedOut } from "@Redux/auth/auth.slice";
import { ROUTES } from "@routes/navigate";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import { superAdminAccountApi, extractErrorMessage } from "@Api";
import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import { toChangePasswordPayload } from "@Forms/changePassword/changePassword-api.payload";
import { CHANGE_PASSWORD_INITIAL_VALUES } from "@Forms/changePassword/changePassword.initialValues";
import { changePasswordValidationSchema } from "@Forms/changePassword/changePassword.validation.schema";
import {
  CHANGE_PASSWORD_MIN_LENGTH,
  CHANGE_PASSWORD_MAX_LENGTH,
} from "@Forms/changePassword/changePassword.validation.constants";

const PASSWORD_FIELDS = [
  { name: "currentPassword", label: "Current password", autoComplete: "current-password" },
  { name: "newPassword", label: "New password", autoComplete: "new-password" },
  { name: "confirmPassword", label: "Confirm new password", autoComplete: "new-password" },
];

function ChangePasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visibleFields, setVisibleFields] = useState({});
  const formik = useFormik({
    initialValues: CHANGE_PASSWORD_INITIAL_VALUES,
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values, helpers) => {
      helpers.setStatus(undefined);
      try {
        await superAdminAccountApi.changePassword(toChangePasswordPayload(values));
        helpers.resetForm();
        setVisibleFields({});
        dispatch(loggedOut());
        navigate(ROUTES.SIGN_IN, { replace: true });
      } catch (error) {
        helpers.setStatus({ error: extractErrorMessage(error) });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const resetForm = () => {
    formik.resetForm();
    setVisibleFields({});
  };

  return (
    <form className="grid gap-5" onSubmit={formik.handleSubmit} noValidate>
      {PASSWORD_FIELDS.map(({ name, label, autoComplete }) => {
        const id = `change-password-${name}`;
        const error = formik.touched[name] && formik.errors[name];
        const visible = Boolean(visibleFields[name]);
        const VisibilityIcon = visible ? EyeOff : Eye;
        const descriptionIds = [
          name === "newPassword" ? "new-password-hint" : null,
          error ? `${id}-error` : null,
        ].filter(Boolean).join(" ");

        return (
          <div key={name} className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
              <Input
                id={id}
                name={name}
                type={visible ? "text" : "password"}
                value={formik.values[name]}
                disabled={formik.isSubmitting}
                onChange={(event) => {
                  formik.setStatus(undefined);
                  formik.handleChange(event);
                }}
                onBlur={formik.handleBlur}
                autoComplete={autoComplete}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="h-11 pr-12"
                aria-invalid={Boolean(error)}
                aria-describedby={descriptionIds || undefined}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 size-9 -translate-y-1/2 text-muted-foreground"
                aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
                aria-pressed={visible}
                aria-controls={id}
                disabled={formik.isSubmitting}
                onClick={() => setVisibleFields((fields) => ({ ...fields, [name]: !visible }))}
              >
                <VisibilityIcon className="size-4" aria-hidden="true" />
              </Button>
            </div>
            {name === "newPassword" && (
              <p id="new-password-hint" className="text-xs text-muted-foreground">
                Use {CHANGE_PASSWORD_MIN_LENGTH}–{CHANGE_PASSWORD_MAX_LENGTH} characters and a password different from your current one.
              </p>
            )}
            {error && (
              <p id={`${id}-error`} className="text-xs font-medium text-destructive">
                {error}
              </p>
            )}
          </div>
        );
      })}
      <FormErrorAlert message={formik.status?.error} />
      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={resetForm} disabled={formik.isSubmitting}>Cancel</Button>
        <Button type="submit" disabled={!formik.dirty || formik.isSubmitting}>
          {formik.isSubmitting ? "Changing password..." : "Change password"}
        </Button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
