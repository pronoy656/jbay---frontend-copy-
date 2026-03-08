/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

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
import { useRouter } from "next/navigation";

/* -------------------------------------------------
   1. Validation – same for all roles
   ------------------------------------------------- */
const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/* -------------------------------------------------
   2. Dynamic config
   ------------------------------------------------- */
export type ResetPasswordConfig = {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Submit button text */
  submitText?: string;
  /** Submitting text */
  submittingText?: string;
  /** "Remember password?" link */
  loginLink: { href: string; label?: string };
  /** Where to go after request (OTP page) */
  nextPath: string;
  /** Optional API endpoint */
  requestEndpoint?: string;
  /** Optional custom submit handler */
  onSubmit?: (data: ResetPasswordFormData) => Promise<void>;
};

/* -------------------------------------------------
   3. Props
   ------------------------------------------------- */
type ResetPasswordRequestFormProps = React.ComponentProps<"div"> & {
  config: ResetPasswordConfig;
  searchParams?: Record<string, string>;
};

export default function ResetPasswordRequestForm({
  className,
  config,
  searchParams,
  ...props
}: ResetPasswordRequestFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log("[ResetPassword] submitted:", data);

    router.push(config.nextPath);
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

              {/* ---------- Submit + Login Link ---------- */}
              <Field>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? config.submittingText ?? "Sending..."
                    : config.submitText ?? "Send Reset Link"}
                </Button>

                <FieldDescription className="mt-2 text-center text-xs sm:text-sm">
                  {config.loginLink.label ?? "Remember your password? "}{" "}
                  <a href={config.loginLink.href} className="underline">
                    Login
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <FieldDescription className="px-4 text-center text-xs sm:px-6 sm:text-sm">
        By clicking send, you agree to our{" "}
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
