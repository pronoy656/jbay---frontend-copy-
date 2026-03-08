// src/app/auth/layout.tsx (or wherever your auth layout is)
import AuthLayoutWrapper from "@/components/common/AuthLayoutWrapper/AuthLayoutWrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayoutWrapper
      backgroundImage="/images/bmw.png"
      title={
        <>
          Welcome back
          <br />
          Admin
        </>
      }
      description="Create an account to get access to premium parts and fast shipping."
    >
      {children}
    </AuthLayoutWrapper>
  );
}
