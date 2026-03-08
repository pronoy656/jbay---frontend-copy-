// app/admin/login/page.tsx

import LoginForm, { LoginConfig } from "@/components/common/auth/LoginForm";


const adminConfig: LoginConfig = {
  title: "Admin Portal",
  description: "Login to your admin account",
  submitText: "Login as Admin",
  submittingText: "Authenticating…",
  rememberLabel: "Remember me",
  forgotPassword: {
    href: "/admin/forgot-password",
    label: "Forgot password?",
  },
  // No sign-up for admin
  apiEndpoint: "/api/auth/admin/login",
};

export default function AdminLoginPage() {
  return <LoginForm config={adminConfig} className="max-w-md mx-auto" />;
}
