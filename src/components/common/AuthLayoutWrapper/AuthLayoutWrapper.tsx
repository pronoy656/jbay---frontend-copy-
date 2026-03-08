// src/components/common/AuthLayoutWrapper/AuthLayoutWrapper.tsx
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutWrapperProps {
  children: ReactNode;
  title: ReactNode;
  description: string;
  backgroundImage: string;
}

export default function AuthLayoutWrapper({
  children,
  title,
  description,
  backgroundImage,
}: AuthLayoutWrapperProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side - Desktop Only */}
      <div
        className="relative hidden lg:block bg-cover bg-center text-white"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="flex flex-col justify-center h-full bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 md:p-10 lg:p-20">
          <h1 className="my-4 text-pretty text-4xl font-bold md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mb-6 max-w-xl text-base md:text-lg lg:text-xl">
            {description}
          </p>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div
        className="relative flex flex-col gap-4 p-4 sm:p-6 md:p-8 lg:p-10 bg-cover bg-center lg:bg-none mobile-bg-image"
        style={
          { "--bg-url": `url('${backgroundImage}')` } as React.CSSProperties
        }
      >
        {/* Dark overlay for mobile */}
        <div className="absolute inset-0 bg-black/60 lg:hidden" />

        {/* Logo */}
        <div className="relative z-10 flex justify-center gap-2 sm:justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium text-white"
            aria-label="Jbay Home"
          >
            <Image
              src="/Jbay.svg"
              width={28}
              height={40}
              alt="Jbay logo"
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Form Content */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm sm:max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
