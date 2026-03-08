/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

/* -------------------------------------------------
   1. Validation (still shared – same for all roles)
   ------------------------------------------------- */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
type LoginFormData = z.infer<typeof loginSchema>;

/* -------------------------------------------------
   2. Dynamic configuration type
   ------------------------------------------------- */
export type LoginConfig = {
  /** Card title – e.g. "Welcome back" */
  title: string;
  /** Card description – e.g. "Login to your admin account" */
  description: string;
  /** Submit button text while idle */
  submitText?: string;
  /** Submit button text while loading */
  submittingText?: string;
  /** "Remember me" checkbox label */
  rememberLabel?: string;
  /** Forgot-password link */
  forgotPassword: { href: string; label?: string };
  /** Optional "Sign up" link – omit to hide */
  signUp?: { href: string; label?: string };
  /** Optional custom API endpoint (used in onSubmit) */
  apiEndpoint?: string;
};

/* -------------------------------------------------
   3. Component props
   ------------------------------------------------- */
type LoginFormProps = React.ComponentProps<"div"> & {
  /** Full dynamic config */
  config: LoginConfig;
  /** Optional callback – you can completely replace the default handler */
  onSubmit?: (data: LoginFormData) => Promise<void>;
  /** Optional redirect query string */
  searchParams?: Record<string, string>;
};

export default function LoginForm({
  className,
  config,
  onSubmit: customSubmit,
  searchParams,
  ...props
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => setShowPassword((v) => !v);

  /* -------------------------------------------------
     Default submit – uses config.apiEndpoint if present
     ------------------------------------------------- */
  const defaultSubmit = async (data: LoginFormData) => {
    console.log("[LoginForm] submitted with config:", config);
    console.log("[LoginForm] payload:", data);

    if (config.apiEndpoint) {
      // Example fetch – replace with your real auth flow
      await fetch(config.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    // Simulate network latency
    await new Promise((r) => setTimeout(r, 1000));
  };

  const onSubmit = customSubmit ?? defaultSubmit;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-white/10 backdrop-blur-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-lg sm:text-xl">{config.title}</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {config.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* ---------- Email ---------- */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className={cn(
                    "text-sm sm:text-base",
                    errors.email && "border-red-500"
                  )}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </Field>

              {/* ---------- Password ---------- */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={cn(
                      "pr-10 text-sm sm:text-base",
                      errors.password && "border-red-500"
                    )}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}

                {/* Remember Me + Forgot */}
                <div className="mt-2 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex cursor-pointer items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="size-4"
                    />
                    <span className="ml-2 text-xs sm:text-sm">
                      {config.rememberLabel ?? "Remember Me"}
                    </span>
                  </label>

                  <Link
                    href={config.forgotPassword.href}
                    className="text-xs sm:text-sm underline-offset-4 hover:underline"
                  >
                    {config.forgotPassword.label ?? "Forgot password?"}
                  </Link>
                </div>
              </Field>

              {/* ---------- Submit ---------- */}
              <Field>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? config.submittingText ?? "Logging in..."
                    : config.submitText ?? "Login"}
                </Button>

                {/* Optional Sign-up */}
                {config.signUp && (
                  <FieldDescription className="mt-2 text-center text-xs sm:text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href={config.signUp.href} className="underline">
                      {config.signUp.label ?? "Sign up"}
                    </Link>
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* Footer – you can also make it dynamic if you want */}
      <FieldDescription className="px-4 text-center text-xs sm:px-6 sm:text-sm">
        By clicking login, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
