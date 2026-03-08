/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageItem {
  src: string;
  alt: string;
}

interface Carousel_002Props {
  images: ImageItem[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean };
  spaceBetween?: number;
  height?: {
    sm?: string;
    md?: string;
    lg?: string;
    default?: string;
  };
  width?: {
    sm?: string;
    md?: string;
    lg?: string;
    default?: string;
  };
  effect?: "fade" | "slide";
  speed?: number;
  aspectRatio?: string;
}

const Carousel_002 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0, // 🔥 0 spacing = no gaps
  height = { default: "h-[320px]", md: "h-[380px]", lg: "h-[420px]" },
  width = { default: "w-full", md: "max-w-sm", lg: "max-w-md" },
  effect = "fade", // 🔥 DEFAULT: Fade (clean single image)
  speed = 800,
  aspectRatio = "aspect-[4/3]",
}: Carousel_002Props) => {
  const [swiper, setSwiper] = useState<any>(null);

  const heightClasses = cn(
    height.default,
    height.md && "md:" + height.md,
    height.lg && "lg:" + height.lg
  );

  const widthClasses = cn(
    width.default,
    width.md && "md:" + width.md,
    width.lg && "lg:" + width.lg
  );

  const autoplayConfig =
    typeof autoplay === "boolean"
      ? autoplay
        ? {
            delay: 3000,
            disableOnInteraction: false,
          }
        : false
      : autoplay;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("relative", widthClasses, className)}
    >
      <div className={cn("relative", aspectRatio)}>
        <Swiper
          onSwiper={setSwiper}
          spaceBetween={spaceBetween}
          effect={effect}
          grabCursor={true}
          loop={loop}
          speed={speed}
          autoplay={autoplayConfig}
          pagination={
            showPagination
              ? {
                  clickable: true,
                  dynamicBullets: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".carousel-next",
                  prevEl: ".carousel-prev",
                }
              : false
          }
          className={cn(
            "h-full w-full !overflow-hidden", // 🔥 HIDE ALL OVERFLOW
            heightClasses,
            "!rounded-2xl"
          )}
          modules={[EffectFade, Autoplay, Pagination, Navigation]}
          // 🔥 FADE EFFECT: Perfect single image transition
          {...(effect === "fade" && {
            fadeEffect: {
              crossFade: true,
            },
          })}
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image.src}-${index}`} className="!h-full">
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                {/* 🔥 GLASS OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-white/10 backdrop-blur-sm" />
                {/* 🔥 MAIN IMAGE - FULL COVERAGE */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover z-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🔥 Custom Glass Pagination */}
      {showPagination && (
        <div className="mt-6 flex justify-center space-x-3">
          {images.map((_, index) => (
            <motion.button
              key={index}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300",
                "bg-white/30 backdrop-blur-sm hover:bg-white/50",
                swiper?.activeIndex === index &&
                  "bg-white/70 scale-125 shadow-lg shadow-black/20"
              )}
              whileTap={{ scale: 0.9 }}
              onClick={() => swiper?.slideTo(index)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export { Carousel_002 };
