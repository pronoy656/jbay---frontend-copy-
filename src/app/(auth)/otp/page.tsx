// app/forgot-password/verify/page.tsx

import OtpForm, { OtpConfig } from "@/components/common/auth/OtpForm";


const userConfig: OtpConfig = {
  title: "Verify Reset Code",
  description: "Enter the 5-digit code sent to your email",
  successRedirect: "/set-new-password",
  verifyEndpoint: "/api/auth/user/verify-otp",
  resendEndpoint: "/api/auth/user/resend-otp",
};

export default function UserOtpPage() {
  return <OtpForm config={userConfig} className="max-w-md mx-auto" />;
}
