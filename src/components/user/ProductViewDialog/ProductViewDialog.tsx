"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Eye } from "lucide-react";

export default function ProductViewDialogWithDetails() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    "/images/toyota-suspension-system-full-view.jpg",
    "/images/toyota-suspension-front-brake-system.jpg",
    "/images/toyota-suspension-coil-spring-detail.jpg",
  ];

  const thumbnails = [
    "/images/suspension-system.jpg",
    "/images/brake-system.png",
    "/images/coil-spring.jpg",
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Eye Button – Opens Dialog */}
      <button
        onClick={() => setOpen(true)}
        className="p-2.5 border-[#676767] border-[1px] bg-[#474747] rounded cursor-pointer hover:bg-[#575757] transition-colors"
        aria-label="View product"
      >
        <Eye className="w-5 h-5 text-white" />
      </button>

      {/* Dialog with Full Product Details Inside */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            w-full h-full lg:min-w-5xl max-h-[78vh] 
            p-0 overflow-hidden 
            rounded-none sm:rounded-2xl 
            shadow-2xl
          "
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>

          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="
              absolute top-4 right-4 p-2 rounded-full 
              bg-white/80 backdrop-blur-sm border border-gray-300 
              hover:bg-gray-100 transition-all shadow-md z-10
            "
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Full Product Details – Directly Inside */}
          <div className="overflow-y-auto h-full p-4 sm:p-6 lg:p-8">
            <div className="bg-gradient-to-br from-[#f0f0f0]/12 to-[#e0e0e0]/2 backdrop-blur-sm shadow-lg rounded-2xl">
              <div className="px-4 py-6 sm:px-6 lg:p-8">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                  {/* Image Gallery */}
                  <div className="flex flex-col gap-4">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-card">
                      <Image
                        src={images[selectedImage] || "/placeholder.svg"}
                        alt="Product"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-white">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">4.0</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {thumbnails.map((thumb, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-colors sm:w-24 ${
                            selectedImage === idx
                              ? "border-accent"
                              : "border-border"
                          }`}
                        >
                          <Image
                            src={thumb || "/placeholder.svg"}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex justify-between">
                        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                          Toyota Suspension
                        </h2>
                      </div>
                      <br />
                      <p className="mt-2 text-sm text-muted-foreground">
                        High-quality OEM replacement front bumper for Toyota
                        Corolla. Perfect fit and finish with all mounting
                        hardware included. Features impact-resistant ABS plastic
                        construction with primer finish ready for painting.
                      </p>
                    </div>

                    <div className="border-b border-t border-border py-4">
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-3xl font-bold text-primary sm:text-4xl">
                        $30.12
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">
                          Brand
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          Toyota Genuine
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">
                          Category
                        </p>
                        <p className="mt-1 text-sm font-medium">Body Parts</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">
                          Chassis Number
                        </p>
                        <p className="mt-1 text-sm font-medium">ZRE172</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">
                          Seller Name
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          Shakhowat Hossain
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">
                          Seller Rating
                        </p>
                        <p className="mt-1 text-sm font-medium">4.0</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">
                          Condition
                        </p>
                        <p className="mt-1 text-sm font-medium">Used</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">
                          Car Model
                        </p>
                        <p className="mt-1 text-sm font-medium">Toyota</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">
                          Warranty
                        </p>
                        <p className="mt-1 text-sm font-medium">1 Year</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
