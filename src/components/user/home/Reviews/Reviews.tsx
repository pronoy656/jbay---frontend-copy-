/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Star,
  StarHalf,
  StarOff,
} from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";
import { cn } from "@/lib/utils";

interface Review {
  imageSrc: string;
  imageAlt: string;
  reviewerName: string;
  reviewText: string;
  rating?: number; // Optional rating (e.g., 1-5 stars)
}

interface ReviewsProps {
  reviews: Review[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
  slidesPerView?: number; // New prop for dynamic slide preview
}

const Reviews = ({
  reviews,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
  slidesPerView = 2.43, // Default value
}: ReviewsProps) => {
  const css = `
    .ReviewsCarousel {
      padding-bottom: 50px !important;
    }
    .swiper-button-next,
    .swiper-button-prev {
      background-color: var(--primary);
      border-radius: var(--radius);
      padding: 0.5rem;
      transition: background-color 0.2s ease;
    }
    .swiper-button-next:hover,
    .swiper-button-prev:hover {
      background-color: var(--primary-foreground);
    }
    .swiper-button-next svg,
    .swiper-button-prev svg {
      color: var(--primary-foreground);
    }
    .swiper-pagination-bullet {
      background-color: var(--muted-foreground);
      opacity: 0.4;
    }
    .swiper-pagination-bullet-active {
      background-color: var(--primary);
      opacity: 1;
    }
    .glass-bg {
      background: var(--card) / 0.8;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid var(--border) / 0.3;
    }
    .custom-navigation {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 10; /* Ensure buttons are above other elements */
    }
    .custom-navigation button {
      background-color: #ffffff;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    .custom-navigation button:hover {
      background-color: #e0e0e0;
    }
    .custom-navigation button svg {
      color: #000000;
    }
  `;

  // Function to render 5 stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full filled star
        stars.push(
          <Star key={i} className="h-5 w-5 text-primary fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <StarHalf key={i} className="h-5 w-5 text-primary fill-current" />
        );
      } else {
        // Empty star
        stars.push(<StarOff key={i} className="h-5 w-5 text-muted" />);
      }
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative", className)}
    >
      <style>{css}</style>
      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 1500,
                disableOnInteraction: false,
              }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={loop}
        slidesPerView={slidesPerView} // Default for large screens
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        breakpoints={{
          0: {
            slidesPerView: 1, // 👈 Mobile (default)
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1.2, // 👈 Small tablets
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: slidesPerView, // 👈 Desktop (default value)
            spaceBetween: spaceBetween,
          },
        }}
        className="ReviewsCarousel"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {reviews.map((review, index) => (
          <SwiperSlide
            key={index}
            className={cn(
              "!h-[320px] w-full rounded-lg shadow-md glass-bg",
              "text-card-foreground"
            )}
          >
            <div className="h-full w-full flex flex-col items-center justify-center p-6 border rounded-2xl">
              <img
                className="h-24 w-24 object-cover rounded-full mb-4 ring-2 ring-primary"
                src={review.imageSrc}
                alt={review.imageAlt}
              />
              <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                {review.reviewText}
              </p>
              <div className="flex mt-3 items-center">
                {renderStars(review.rating || 0)}
                {review.rating && (
                  <span className="ml-2 text-sm text-muted-foreground font-medium">
                    {review.rating}/5
                  </span>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}

        {showNavigation && (
          <div className="custom-navigation mb-3 rotate-180">
            <button className="swiper-button-prev">
              <ChevronRight className="h-6 w-6" />
            </button>
            <button className="swiper-button-next">
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
};

export { Reviews };
