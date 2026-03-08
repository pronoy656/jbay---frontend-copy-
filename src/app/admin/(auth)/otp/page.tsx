// app/admin/forgot-password/verify/page.tsx

import OtpForm, { OtpConfig } from "@/components/common/auth/OtpForm";


const adminConfig: OtpConfig = {
  title: "Admin OTP Verification",
  description: "Enter the 5-digit code sent to your admin email",
  submitText: "Verify Admin Code",
  submittingText: "Verifying admin...",
  noCodePrefix: "No code received? ",
  resendLabel: "Resend Admin Code",
  successRedirect: "/admin/set-new-password",
  verifyEndpoint: "/api/auth/admin/verify-otp",
  resendEndpoint: "/api/auth/admin/resend-otp",
};

export default function AdminOtpPage() {
  return <OtpForm config={adminConfig} className="max-w-md mx-auto" />;
}
