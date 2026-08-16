import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";
import { Typography } from "@shadcnComponent/typography";

import logoImage from "@Assets/images/logo.png";
import SigninForm from "@screenComponent/signin/SigninForm";

function SigninScreenComponent() {
  const navigate = useNavigate();

  return (
    <div className="signin-page relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-[#eef4f7] via-[#e4edf1] to-[#d7e5eb] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#164863]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-[#9bbec8]/30 blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md border-transparent bg-white shadow-2xl shadow-black/40">
        <CardHeader className="items-center text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Go to home page"
            className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0f5f7] shadow-inner hover:cursor-pointer"
          >
            <img
              src={logoImage}
              alt="The General Electric Stores"
              className="h-9 w-9 object-contain"
            />
          </button>

          <CardTitle>
            <Typography as="h1" variant="sheetTitle" className="text-[#0f2f46]">
              Welcome back
            </Typography>
          </CardTitle>

          <CardDescription>
            <Typography variant="bodySmall" className="text-[#5b7d8c]">
              Sign in to The General Electric Stores
            </Typography>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SigninForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default SigninScreenComponent;
