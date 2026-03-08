"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface BorderButtonProps {
  href?: string;
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; // ← NEW
}

export default function BorderButton({
  href,
  size = "default",
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false, // ← default
}: BorderButtonProps) {
  const buttonClasses = `
    border-2 border-[#E7BE00] bg-transparent text-[#E7BE00]
    hover:bg-[#E7BE00] hover:text-black
    transition ${className}
  `.trim();

  const buttonProps = {
    size,
    className: buttonClasses,
    onClick,
    type: type as "button" | "submit" | "reset",
    disabled,
  };

  if (href) {
    return (
      <Link href={href} className={disabled ? "pointer-events-none" : ""}>
        <Button asChild {...buttonProps}>
          <span>{children}</span>
        </Button>
      </Link>
    );
  }

  return <Button {...buttonProps}>{children}</Button>;
}
