/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
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
   1. Validation
   ------------------------------------------------- */
const otpSchema = z.object({
  digit1: z.string().length(1).regex(/^\d$/, "Digit required"),
  digit2: z.string().length(1).regex(/^\d$/, "Digit required"),
  digit3: z.string().length(1).regex(/^\d$/, "Digit required"),
  digit4: z.string().length(1).regex(/^\d$/, "Digit required"),
  digit5: z.string().length(1).regex(/^\d$/, "Digit required"),
});
type OtpFormData = z.infer<typeof otpSchema>;

/* -------------------------------------------------
   2. Config
   ------------------------------------------------- */
export type OtpConfig = {
  title: string;
  description: string;
  digits?: number;
  timerSeconds?: number;
  submitText?: string;
  submittingText?: string;
  noCodePrefix?: string;
  resendLabel?: string;
  successRedirect: string;
  verifyEndpoint?: string;
  resendEndpoint?: string;
  onSubmit?: (code: string) => Promise<void>;
  onResend?: () => Promise<void>;
};

type OtpFormProps = React.ComponentProps<"div"> & {
  config: OtpConfig;
  searchParams?: Record<string, string>;
};

export default function OtpForm({
  className,
  config,
  searchParams,
  ...props
}: OtpFormProps) {
  const router = useRouter();
  const digits = config.digits ?? 5;
  const timerStart = config.timerSeconds ?? 180;

  const [timeLeft, setTimeLeft] = useState(timerStart);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
  });

  // Watch all digits to log live
  const watchedValues = watch();

  // Log full OTP on every change
  useEffect(() => {
    const values = Object.values(watchedValues).filter(Boolean);
    const code = values.join("");
    if (code.length > 0) {
      console.log("Current OTP:", code);
    }
  }, [watchedValues]);

  /* -------------------------------------------------
     Timer
     ------------------------------------------------- */
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  /* -------------------------------------------------
     Resend
     ------------------------------------------------- */
  const handleResend = async () => {
    if (!canResend) return;

    if (config.onResend) {
      await config.onResend();
    } else if (config.resendEndpoint) {
      await fetch(config.resendEndpoint, { method: "POST" });
    }

    setTimeLeft(timerStart);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  /* -------------------------------------------------
     Submit
     ------------------------------------------------- */
  const onSubmit = async (data: OtpFormData) => {
    const code = Object.values(data).join("");
    console.log("OTP Submitted:", code);

    router.push(config.successRedirect);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const digitKeys = Array.from({ length: digits }, (_, i) => `digit${i + 1}`);

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
              {/* ---------- OTP Inputs ---------- */}
              <Field>
                <FieldLabel>Verification Code</FieldLabel>
                <div className="flex justify-center gap-2 sm:gap-4">
                  {digitKeys.map((key, idx) => (
                    <Input
                      key={key}
                      id={key}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className={cn(
                        "w-10 h-10 sm:w-12 sm:h-12 text-center text-sm sm:text-base font-medium",
                        errors[key as keyof OtpFormData] && "border-red-500"
                      )}
                      {...register(key as keyof OtpFormData, {
                        onChange: (e) => {
                          const value = e.target.value;
                          // Only allow digits
                          if (!/^\d*$/.test(value)) {
                            setValue(key as keyof OtpFormData, "");
                            return;
                          }

                          const digit = value.slice(-1); // Take last char
                          setValue(key as keyof OtpFormData, digit);

                          // Move to next
                          if (digit && idx < digits - 1) {
                            inputRefs.current[idx + 1]?.focus();
                          }
                        },
                      })}
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          const current = e.currentTarget;
                          if (!current.value && idx > 0) {
                            inputRefs.current[idx - 1]?.focus();
                          }
                        } else if (e.key === "ArrowLeft" && idx > 0) {
                          e.preventDefault();
                          inputRefs.current[idx - 1]?.focus();
                        } else if (e.key === "ArrowRight" && idx < digits - 1) {
                          e.preventDefault();
                          inputRefs.current[idx + 1]?.focus();
                        }
                      }}
                      onPaste={(e) => {
                        const paste = e.clipboardData.getData("text");
                        const numbers = paste.match(/\d/g);
                        if (numbers && numbers.length >= digits) {
                          numbers.slice(0, digits).forEach((num, i) => {
                            setValue(`digit${i + 1}` as keyof OtpFormData, num);
                            if (i < digits - 1)
                              inputRefs.current[i + 1]?.focus();
                          });
                          e.preventDefault();
                        }
                      }}
                    />
                  ))}
                </div>

                {Object.keys(errors).length > 0 && (
                  <p className="mt-1 text-center text-xs text-red-500">
                    {Object.values(errors)[0]?.message}
                  </p>
                )}
              </Field>

              {/* ---------- Submit + Resend ---------- */}
              <Field>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? config.submittingText ?? "Verifying..."
                    : config.submitText ?? "Verify Code"}
                </Button>

                <FieldDescription className="mt-2 text-center text-xs sm:text-sm">
                  {config.noCodePrefix ?? "Didn't receive a code? "}

                  {canResend ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleResend();
                      }}
                      className="font-medium hover:underline text-primary"
                    >
                      {config.resendLabel ?? "Resend"}
                    </a>
                  ) : (
                    <span className="text-gray-500">
                      Resend in {formatTime(timeLeft)}
                    </span>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-4 text-center text-xs sm:px-6 sm:text-sm">
        By clicking verify, you agree to our{" "}
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
