/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import FillButton from "@/components/common/Button/FillButton";

/* -------------------------------------------------
   1. Dynamic config (with defaults)
   ------------------------------------------------- */
export type PasswordChangedSuccessConfig = {
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Image source – defaults to /images/success.png */
  imageSrc?: string;
  /** Image alt text – defaults to "Success" */
  imageAlt?: string;
  /** Button label – defaults to "Continue" */
  buttonLabel?: string;
  /** **MUST** be an absolute path starting with "/" */
  redirectHref: string;
  /** Optional button size */
  buttonSize?: "sm" | "md" | "lg";
};

/* -------------------------------------------------
   2. Props
   ------------------------------------------------- */
type PasswordChangedSuccessProps = React.ComponentProps<"div"> & {
  config: PasswordChangedSuccessConfig;
};

const DEFAULTS = {
  title: "Password changed successfully!",
  description: "You can now sign in with your new password.",
  imageSrc: "/images/success.png",
  imageAlt: "Success",
  buttonLabel: "Continue",
  buttonSize: "lg" as const,
};

export default function PasswordChangedSuccess({
  className,
  config,
  ...props
}: PasswordChangedSuccessProps) {
  const {
    title = DEFAULTS.title,
    description = DEFAULTS.description,
    imageSrc = DEFAULTS.imageSrc,
    imageAlt = DEFAULTS.imageAlt,
    buttonLabel = DEFAULTS.buttonLabel,
    redirectHref,
    buttonSize = DEFAULTS.buttonSize,
  } = config;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-white/10 backdrop-blur-xl p-14">
        {/* ---------- Success Image ---------- */}
        <CardContent className="flex justify-center items-center">
          <Image
            src={imageSrc}
            width={302}
            height={302}
            alt={imageAlt}
            priority
          />
        </CardContent>

        {/* ---------- Text ---------- */}
        <CardHeader className="text-center">
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {description}
          </CardDescription>
        </CardHeader>

        {/* ---------- CTA Button ---------- */}
        <FillButton href={redirectHref} size={"lg"} className="w-full">
          {buttonLabel}
        </FillButton>
      </Card>
    </div>
  );
}
