"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import FillButton from "@/components/common/Button/FillButton";
import BorderButton from "@/components/common/Button/BorderButton";

// ------------------------------------------------------------
// Zod schema – NO EMAIL
const ratingSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description too long"),
});

type RatingFormData = z.infer<typeof ratingSchema>;

// ------------------------------------------------------------
export default function RatingDialog() {
  const [open, setOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema),
    defaultValues: { rating: 0, description: "" },
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
      setSelectedRating(0);
    }
  };

  const onSubmit = async (data: RatingFormData) => {
    setIsSubmitting(true);

    // Fake delay
    await new Promise((r) => setTimeout(r, 1000));

    // Log only rating + description
    console.log("Review Submitted:", {
      rating: `${data.rating} star${data.rating > 1 ? "s" : ""}`,
      description: data.description,
    });

    toast.success("Thank you for your review!");

    setOpen(false);
    reset();
    setSelectedRating(0);
    setIsSubmitting(false);
  };

  const handleStarClick = (value: number) => {
    setSelectedRating(value);
    setValue("rating", value, { shouldValidate: true });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* Trigger – Yellow star button */}
      <DialogTrigger asChild>
        <button className="rounded-lg border border-yellow-500 p-2 transition-colors hover:bg-yellow-500/10">
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        </button>
      </DialogTrigger>

      {/* Responsive Dark Glass Modal */}
      <DialogContent
        className={cn(
          "w-full max-w-md mx-4 p-6 sm:p-8",
          "bg-black/40 dark:bg-black/50",
          "backdrop-blur-xl",
          "border border-white/30",
          "rounded-2xl shadow-2xl",
          "text-white"
        )}
      >
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-2xl sm:text-3xl font-bold">
            What Is Your Rating?
          </DialogTitle>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed px-2">
            Please share your experience with our auto parts and service. Your
            feedback helps us maintain trust and ensure better quality for every
            customer.
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 sm:mt-8 space-y-5"
        >
          {/* Stars */}
          <div className="flex justify-center gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleStarClick(value)}
                className={cn(
                  "transition-all duration-200",
                  selectedRating >= value
                    ? "text-yellow-400 scale-110 drop-shadow-glow"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                <Star
                  className={cn(
                    "h-10 w-10 sm:h-12 sm:w-12",
                    selectedRating >= value ? "fill-yellow-400" : "fill-none"
                  )}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-400 text-sm text-center">
              {errors.rating.message}
            </p>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-white/90 flex items-center gap-1 text-sm sm:text-base"
            >
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Tell us more about your experience..."
              {...register("description")}
              className={cn(
                "bg-white/10 border-white/20",
                "placeholder:text-white/40 text-white",
                "focus:ring-2 focus:ring-yellow-500",
                "min-h-24 sm:min-h-28 resize-none rounded-xl",
                "text-sm sm:text-base"
              )}
            />
            {errors.description && (
              <p className="text-red-400 text-xs sm:text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <FillButton type="submit" size="lg" className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Give Review"
              )}
            </FillButton>

            <BorderButton
              type="button"
              onClick={() => setOpen(false)}
              size="lg"
              className="w-full"
            >
              No Thanks
            </BorderButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
