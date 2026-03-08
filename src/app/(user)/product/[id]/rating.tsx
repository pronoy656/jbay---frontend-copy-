"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CarouselItem {
  rating: number;
  description: string;
}

interface RatingComponentProps {
  items: CarouselItem[];
  heading?: string;
  className?: string;
  showNavigation?: boolean;
  loop?: boolean;
  starColor?: string;
  cardBackground?: string;
  textColor?: string;
}

// RatingCard component to render individual rating items
const RatingCard = ({
  item,
  starColor,
  cardBackground,
  textColor,
}: {
  item: CarouselItem;
  starColor?: string;
  cardBackground?: string;
  textColor?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center overflow-hidden rounded-xl shadow-lg p-6 min-h-[200px] backdrop-blur-md",
        cardBackground,
        // Add glassmorphism styles
        "bg-opacity-30 border border-white border-opacity-20"
      )}
      style={{
        // Fallback for browsers that don't support backdrop-filter
        background: cardBackground?.includes("bg-opacity")
          ? undefined
          : "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", // For Safari support
      }}
      role="group"
      aria-label={`Rating ${item.rating} out of 5`}
    >
      <div className="flex items-center gap-3 text-lg font-semibold">
        <span className={textColor}>{item.rating}</span>
        <span className={cn("flex", starColor)}>
          {[...Array(5)].map((_, i) => (
            <span key={i} aria-hidden="true">
              {item.rating >= i + 1 ? "★" : item.rating > i ? "⯨" : "☆"}
            </span>
          ))}
        </span>
      </div>
      <p className={cn("text-center mt-3 text-sm md:text-base", textColor)}>
        {item.description}
      </p>
    </div>
  );
};

const RatingComponent = ({
  items,
  heading = "Customer Ratings",
  className,
  showNavigation = true,
  loop = true,
  starColor = "text-yellow-400",
  cardBackground = "bg-white bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-30",
  textColor = "text-gray-900 dark:text-gray-100",
}: RatingComponentProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className={cn("p-8", className)}>
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <h2 className="text-3xl font-semibold md:text-4xl">{heading}</h2>
          {showNavigation && (
            <div className="flex shrink-0 items-center justify-start gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  carouselApi?.scrollPrev();
                }}
                disabled={!canScrollPrev}
                className="disabled:pointer-events-auto"
                aria-label="Previous slide"
              >
                <ArrowLeft className="size-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  carouselApi?.scrollNext();
                }}
                disabled={!canScrollNext}
                className="disabled:pointer-events-auto"
                aria-label="Next slide"
              >
                <ArrowRight className="size-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-full"
        role="region"
        aria-label="Rating carousel"
      >
        <Carousel
          setApi={setCarouselApi}
          opts={{
            loop,
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative w-full max-w-full md:left-[-1rem]"
        >
          <CarouselContent className="hide-scrollbar w-full max-w-full md:-mr-4 md:ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item, index) => (
              <CarouselItem key={index} className="ml-2 md:max-w-[300px]">
                <RatingCard
                  item={item}
                  starColor={starColor}
                  cardBackground={cardBackground}
                  textColor={textColor}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
};

// Example usage
const Skiper47 = () => {
  const items: CarouselItem[] = [
    { rating: 4, description: "Beautiful artwork with vibrant colors" },
    { rating: 5, description: "Creative and detailed illustration" },
    { rating: 4, description: "Amazingly vibrant and expressive" },
    { rating: 4, description: "A masterpiece of digital illustration" },
    { rating: 4, description: "Intricate and visually stunning" },
    { rating: 5, description: "Perfect blend of color and creativity" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden p-4 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
      <RatingComponent
        items={items}
        heading="Customer Reviews"
        showNavigation
        loop
        starColor="text-amber-500"
        // Updated to use glass effect
        cardBackground="bg-white bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-30"
        textColor="text-gray-800 dark:text-gray-200"
      />
    </div>
  );
};

export { RatingComponent, Skiper47 };
