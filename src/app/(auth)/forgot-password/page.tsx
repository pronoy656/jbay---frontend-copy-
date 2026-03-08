// app/forgot-password/page.tsx

import ResetPasswordRequestForm, { ResetPasswordConfig } from "@/components/common/auth/ResetPasswordRequestForm";

const userConfig: ResetPasswordConfig = {
  title: "Reset Password",
  description: "Enter your email to receive a password reset link",
  submitText: "Send Reset Link",
  submittingText: "Sending...",
  loginLink: { href: "/login" },
  nextPath: "/otp",
  requestEndpoint: "/api/auth/user/request-reset",
};

export default function UserForgotPasswordPage() {
  return (
    <ResetPasswordRequestForm
      config={userConfig}
      className="max-w-md mx-auto"
    />
  );
}
