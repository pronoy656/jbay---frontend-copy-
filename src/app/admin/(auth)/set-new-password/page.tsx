// app/admin/set-new-password/page.tsx
import SetNewPasswordForm, {
  SetNewPasswordConfig,
} from "@/components/common/auth/SetNewPasswordForm";

const adminConfig: SetNewPasswordConfig = {
  title: "Admin: Set New Password",
  description: "Create a secure password for your admin account",
  submitText: "Update Admin Password",
  submittingText: "Updating...",
  loginLink: { href: "/admin/login", label: "Back to Admin Login" },
  successRedirect: "/admin/success",
  setPasswordEndpoint: "/api/auth/admin/set-password",
};

export default function AdminSetPasswordPage() {
  return (
    <SetNewPasswordForm config={adminConfig} className="max-w-md mx-auto" />
  );
}
