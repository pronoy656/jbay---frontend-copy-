/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowBendRightDown } from "@phosphor-icons/react";

/* -------------------------------------------------
   Inline type – no external import required
   ------------------------------------------------- */
type ImageItem = {
  src: string;
  alt: string;
  code: string;
  category: string;
  description: string;
};

interface HoverExpandProps {
  images: ImageItem[];
  className?: string;
}

/* -------------------------------------------------
   Component – design unchanged
   ------------------------------------------------- */
const HoverExpand = ({ images, className }: HoverExpandProps) => {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative max-w-6xl px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Carousel
          className="w-full h-[850px] -mb-60"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-4 basis-auto">
                <motion.div
                  className="relative cursor-pointer overflow-hidden rounded-4xl"
                  initial={{ width: "5rem", height: "20rem" }}
                  animate={{
                    width: activeImage === index ? "20rem" : "9rem",
                    height: "30rem",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={() => setActiveImage(index)}
                  onHoverStart={() => setActiveImage(index)}
                  onHoverEnd={() => setActiveImage(null)}
                >
                  {/* Dark background overlay for collapsed state */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/45"
                    animate={{
                      opacity: activeImage === index ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Gradient overlay on hover (only when expanded) */}
                  <AnimatePresence>
                    {activeImage === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute h-full w-full bg-gradient-to-t from-black/50 to-transparent z-10"
                      />
                    )}
                  </AnimatePresence>

                  {/* Vertical category name - only in collapsed state */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    animate={{
                      opacity: activeImage === index ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="-rotate-90 font-semibold text-white text-3xl whitespace-nowrap drop-shadow-lg italic">
                      {image.category}
                    </p>
                  </motion.div>

                  {/* Hover content: category, code, and description */}
                  <AnimatePresence>
                    {activeImage === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute flex h-full w-full flex-col items-start justify-end p-6 z-20"
                      >
                        <p className="text-xl font-bold text-white mb-1">
                          {image.category}
                        </p>
                        <p className="text-sm text-white/80 leading-relaxed max-w-sm">
                          {image.description}
                        </p>
                        <u className="text-xs text-white/80 leading-relaxed max-w-sm py-5">
                          Explore The Product
                          <ArrowBendRightDown className="inline-block ml-2" />
                        </u>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <img
                    src={image.src}
                    className="size-full object-cover"
                    alt={image.alt}
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation arrows – original positioning */}
          <div className="absolute bottom-3/8 left-0 right-0 flex justify-between px-4 -translate-y-1/2 w-[1%] mx-auto">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand };
