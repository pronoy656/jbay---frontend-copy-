// app/user/login/page.tsx

import LoginForm, { LoginConfig } from "@/components/common/auth/LoginForm";


const userConfig: LoginConfig = {
  title: "Welcome back",
  description: "Login to your account",
  submitText: "Sign In",
  submittingText: "Signing in…",
  rememberLabel: "Keep me logged in",
  forgotPassword: { href: "/forgot-password" },
  signUp: { href: "/signup", label: "Create account" },
  apiEndpoint: "/api/auth/user/login",
};

export default function UserLoginPage() {
  return <LoginForm config={userConfig} className="max-w-md mx-auto" />;
}
