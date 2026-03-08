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
import { useRouter } from "next/navigation";

/* -------------------------------------------------
   1. Validation – same for all roles
   ------------------------------------------------- */
const setNewPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SetNewPasswordFormData = z.infer<typeof setNewPasswordSchema>;

/* -------------------------------------------------
   2. Dynamic config
   ------------------------------------------------- */
export type SetNewPasswordConfig = {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Submit button text */
  submitText?: string;
  /** Submitting text */
  submittingText?: string;
  /** "Return to Login" link */
  loginLink: { href: string; label?: string };
  /** Where to go after success (optional) */
  successRedirect?: string;
  /** Optional API endpoint */
  setPasswordEndpoint?: string;
  /** Optional custom submit handler */
  onSubmit?: (data: SetNewPasswordFormData) => Promise<void>;
};

/* -------------------------------------------------
   3. Props
   ------------------------------------------------- */
type SetNewPasswordFormProps = React.ComponentProps<"div"> & {
  config: SetNewPasswordConfig;
  searchParams?: Record<string, string>;
};

export default function SetNewPasswordForm({
  className,
  config,
  searchParams,
  ...props
}: SetNewPasswordFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetNewPasswordFormData>({
    resolver: zodResolver(setNewPasswordSchema),
  });

  const togglePassword = () => setShowPassword((v) => !v);
  const toggleConfirmPassword = () => setShowConfirmPassword((v) => !v);

  const onSubmit = async (data: SetNewPasswordFormData) => {
    console.log("[SetNewPassword] submitted:", data);

    if (config.successRedirect) {
      router.push(config.successRedirect);
    }
  };

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
              {/* ---------- New Password ---------- */}
              <Field>
                <FieldLabel htmlFor="password">New Password</FieldLabel>
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
                    onClick={togglePassword}
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
              </Field>

              {/* ---------- Confirm Password ---------- */}
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm New Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={cn(
                      "pr-10 text-sm sm:text-base",
                      errors.confirmPassword && "border-red-500"
                    )}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>

              {/* ---------- Submit + Login Link ---------- */}
              <Field>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? config.submittingText ?? "Saving..."
                    : config.submitText ?? "Set New Password"}
                </Button>

                <FieldDescription className="mt-2 text-center text-xs sm:text-sm">
                  {config.loginLink.label ?? "Return to"}{" "}
                  <Link href={config.loginLink.href} className="underline">
                    Login
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <FieldDescription className="px-4 text-center text-xs sm:px-6 sm:text-sm">
        By clicking set new password, you agree to our{" "}
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

