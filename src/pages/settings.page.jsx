import { useSelector } from "react-redux";
import { ROLE_PATHS } from "@Enums";
import ChangePasswordForm from "@Forms/changePassword/changePasswordForm";
import { KeyRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

function SettingsPage() {
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="w-full space-y-6 pb-8">
      {role === ROLE_PATHS.SUPER_ADMIN && (
        <Card>
          <CardHeader className="flex flex-row items-start gap-3 border-b">
            <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <KeyRound className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <CardTitle>
                <h2>Change password</h2>
              </CardTitle>
              <CardDescription>
                Set a new password for your super admin account.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default SettingsPage;
