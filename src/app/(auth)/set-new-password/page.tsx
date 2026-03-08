// app/set-new-password/page.tsx

import SetNewPasswordForm, {
  SetNewPasswordConfig,
} from "@/components/common/auth/SetNewPasswordForm";

const userConfig: SetNewPasswordConfig = {
  title: "Set New Password",
  description: "Create a new password for your account",
  submitText: "Set New Password",
  submittingText: "Saving...",
  loginLink: { href: "/login" },
  successRedirect: "/success",
  setPasswordEndpoint: "/api/auth/user/set-password",
};

export default function UserSetPasswordPage() {
  return (
    <SetNewPasswordForm config={userConfig} className="max-w-md mx-auto" />
  );
}
