"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CircleAlert, Upload, X, Loader2 } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner"; // Sonner toast
import FillButton from "@/components/common/Button/FillButton";
import Image from "next/image";

// ------------------------------------------------------------
// Zod schema
const reportSchema = z.object({
  type: z.enum(["product", "seller"]),
  reason: z
    .string()
    .min(10, "Reason must be at least 10 characters.")
    .max(500, "Reason cannot exceed 500 characters."),
  images: z.array(z.string()).max(5, "Maximum 5 images allowed."),
});

type ReportFormData = z.infer<typeof reportSchema>;

// ------------------------------------------------------------
export default function ReportDialog() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: { type: "product", reason: "", images: [] },
    mode: "onChange",
  });

  const reportType = watch("type");

  // ------------------- Dropzone -------------------
  const onDrop = (acceptedFiles: File[]) => {
    const newUrls = acceptedFiles.map((f) => URL.createObjectURL(f));
    const updated = [...images, ...newUrls].slice(0, 5);
    setImages(updated);
    setValue("images", updated, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 5,
  });

  const removeImage = (idx: number) => {
    const updated = images.filter((_, i) => i !== idx);
    setImages(updated);
    setValue("images", updated);
  };

  // ------------------- Close handler -------------------
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
      setImages([]);
    }
  };

  // ------------------- Fake Submit (No API) -------------------
  const onSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success toast
    toast.success(
      data.type === "product"
        ? "Product reported successfully!"
        : "Seller reported successfully!"
    );

    // Reset everything
    setOpen(false);
    reset();
    setImages([]);
    setIsSubmitting(false);
  };

  // ------------------------------------------------------------
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <button className="rounded-lg border border-red-500 p-2 transition-colors hover:bg-red-500/10">
          <CircleAlert className="h-5 w-5 text-red-500" />
        </button>
      </DialogTrigger>

      {/* Dark Glass Modal */}
      <DialogContent
        className={`
          max-w-lg w-full
          bg-black/30 dark:bg-black/40
          backdrop-blur-xl
          border border-white/30
          rounded-xl
          shadow-2xl
          p-6
          text-white
        `}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Report {reportType === "product" ? "Product" : "Seller"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          {/* Tabs */}
          <div className="space-y-3">
            <Label className="text-white/90">Report type</Label>

            <Tabs
              value={reportType}
              onValueChange={(v) =>
                setValue("type", v as "product" | "seller", {
                  shouldValidate: true,
                })
              }
            >
              <TabsList className="grid w-full grid-cols-2 bg-white/10 h-11 rounded-lg p-1">
                <TabsTrigger
                  value="product"
                  className="rounded-md data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 font-medium transition-all"
                >
                  Product
                </TabsTrigger>
                <TabsTrigger
                  value="seller"
                  className="rounded-md data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 font-medium transition-all"
                >
                  Seller
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {errors.type && (
              <p className="text-red-400 text-sm text-center">
                Please select what you want to report.
              </p>
            )}
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-white/90">
              Enter your reason <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reason"
              placeholder="Describe the issue..."
              {...register("reason")}
              className={`
                bg-white/10 border-white/20
                placeholder:text-white/40
                text-white
                focus:ring-2 focus:ring-yellow-500
                min-h-32 resize-none
                rounded-lg
              `}
            />
            {errors.reason && (
              <p className="text-red-400 text-sm">{errors.reason.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-white/90">Attach Pictures (optional)</Label>
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
                "bg-white/5 border-white/20",
                isDragActive
                  ? "bg-white/10 border-yellow-500"
                  : "hover:bg-white/10"
              )}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-10 w-10 text-green-500 mb-3" />
              <p className="text-white/70 text-sm">
                {isDragActive
                  ? "Drop images here..."
                  : "Click or drag up to 5 images"}
              </p>
              <p className="text-white/50 text-xs mt-1">Max 5 images</p>
            </div>

            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {images.map((src, i) => (
                  <div key={i} className="relative group">
                    <Image
                      src={src}
                      alt={`Upload ${i + 1}`}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover rounded-lg border border-white/20"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-red-600/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <FillButton
            type="submit"
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </FillButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
