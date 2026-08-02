import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";

import { Input } from "@ShadcnComponents/input";
import { Label } from "@ShadcnComponents/label";
import { signIn } from "@Redux/auth/authAction";
import { Button } from "@ShadcnComponents/button";
import { Typography } from "@ShadcnComponents/typography";
import { togglePasswordVisibility } from "@Redux/auth/authSlice";
import { SIGNIN_INITIAL_VALUES } from "@/forms/signin/signin.initialValues";
import { signinValidationSchema } from "@/forms/signin/signin.validationSchema";

import FormErrorAlert from "@Components/alert/FormErrorAlert";

function SigninForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPasswordVisible = useSelector(
    (state) => state.auth.isPasswordVisible,
  );
  const signInError = useSelector((state) => state.auth.signInError);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        signIn({ username: values.username.trim(), password: values.password }),
      ).unwrap();

      navigate("/dashboard");
    } catch {
      // signInError in the store already has a display-ready message.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={SIGNIN_INITIAL_VALUES}
      validationSchema={signinValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="signin-username" className="text-[#164863]">
              Username
            </Label>
            <div className="relative">
              <User
                size={16}
                strokeWidth={2.2}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              />
              <Field
                as={Input}
                id="signin-username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                className="border-slate-200 bg-white pl-9 text-[#0f2f46] placeholder:text-slate-400 focus-visible:border-[#164863] focus-visible:ring-[#164863]/25"
              />
            </div>
            <ErrorMessage
              name="username"
              component="p"
              className="text-xs font-medium text-red-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="signin-password" className="text-[#164863]">
              Password
            </Label>
            <div className="relative">
              <Lock
                size={16}
                strokeWidth={2.2}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              />
              <Field
                as={Input}
                id="signin-password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="border-slate-200 bg-white px-9 text-[#0f2f46] placeholder:text-slate-400 focus-visible:border-[#164863] focus-visible:ring-[#164863]/25"
              />
              <button
                type="button"
                onClick={() => dispatch(togglePasswordVisibility())}
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-[#164863]"
              >
                {isPasswordVisible ? (
                  <EyeOff size={16} strokeWidth={2.2} />
                ) : (
                  <Eye size={16} strokeWidth={2.2} />
                )}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="p"
              className="text-xs font-medium text-red-600"
            />
          </div>

          <FormErrorAlert message={signInError} />

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="mt-1 bg-[#164863] text-white hover:bg-[#0f2f46] hover:cursor-pointer"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>

          <div className="flex items-center justify-center gap-1.5 pt-1 text-[#5b7d8c]">
            <ShieldCheck size={14} strokeWidth={2.2} />
            <Typography variant="caption">
              India's Largest Dealer in Rotating Machine & Drives
            </Typography>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}

export default SigninForm;
