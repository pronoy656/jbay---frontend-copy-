// app/admin/set-new-password/success/page.tsx

import PasswordChangedSuccess, {
  PasswordChangedSuccessConfig,
} from "@/components/common/auth/PasswordChangedSuccess";

const adminConfig: PasswordChangedSuccessConfig = {
  title: "Admin Password Updated",
  description: "You can now sign in with your new admin password.",
  imageSrc: "/images/success.png", // optional custom image
  redirectHref: "/admin/login",
  buttonLabel: "Go to Admin Login",
  buttonSize: "lg",
};

export default function AdminSuccessPage() {
  return (
    <PasswordChangedSuccess config={adminConfig} className="max-w-md mx-auto" />
  );
}
