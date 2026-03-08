// src/app/auth/layout.tsx (or wherever your auth layout is)
import AuthLayoutWrapper from "@/components/common/AuthLayoutWrapper/AuthLayoutWrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthLayoutWrapper
        backgroundImage="/images/car-font.png"
        title={
          <>
            Performance You
            <br />
            Can Trust, Parts
            <br />
            That Last
          </>
        }
        description="Create an account to get access to premium parts and fast shipping."
      >
        {children}
      </AuthLayoutWrapper>
    </>
  );
}
