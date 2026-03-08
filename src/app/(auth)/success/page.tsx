// app/admin/set-new-password/success/page.tsx

import PasswordChangedSuccess, {
  PasswordChangedSuccessConfig,
} from "@/components/common/auth/PasswordChangedSuccess";

const Config: PasswordChangedSuccessConfig = {
  title: "Password Updated",
  description: "You can now sign in with your new password.",
  imageSrc: "/images/success.png", // optional custom image
  redirectHref: "login",
  buttonLabel: "Go to Login",
  buttonSize: "lg",
};

export default function AdminSuccessPage() {
  return (
    <PasswordChangedSuccess config={Config} className="max-w-md mx-auto" />
  );
}
