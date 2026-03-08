// app/admin/forgot-password/page.tsx

import ResetPasswordRequestForm, { ResetPasswordConfig } from "@/components/common/auth/ResetPasswordRequestForm";

const adminConfig: ResetPasswordConfig = {
  title: "Admin Password Reset",
  description: "Enter your admin email to receive a reset code",
  submitText: "Send Admin Reset Code",
  submittingText: "Sending admin code...",
  loginLink: { href: "/admin/login", label: "Back to admin login? " },
  nextPath: "/admin/otp",
  requestEndpoint: "/api/auth/admin/request-reset",
};

export default function AdminForgotPasswordPage() {
  return (
    <ResetPasswordRequestForm
      config={adminConfig}
      className="max-w-md mx-auto"
    />
  );
}
