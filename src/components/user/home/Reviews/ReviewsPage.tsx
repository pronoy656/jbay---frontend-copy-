/* eslint-disable @typescript-eslint/no-explicit-any */
// app/reviews/page.tsx   (or any route you prefer)
"use client";

import { Reviews } from "./Reviews";
import Header from "@/components/common/Header/Header";

// -----------------------------------------------------------------
// Static Reviews Data to prevent 404 fetch errors on Vercel
// -----------------------------------------------------------------
const STATIC_REVIEWS = [
  {
    imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    imageAlt: "Portrait of Alex Johnson",
    reviewerName: "Alex Johnson",
    reviewText: "This product exceeded my expectations! The quality is outstanding and the service was top-notch.",
    rating: 5
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    imageAlt: "Portrait of Maria Gonzalez",
    reviewerName: "Maria Gonzalez",
    reviewText: "Really happy with my purchase. The team was very responsive and helpful.",
    rating: 4
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    imageAlt: "Portrait of Sam Carter",
    reviewerName: "Sam Carter",
    reviewText: "Good experience overall, but there’s room for improvement in delivery time.",
    rating: 3
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    imageAlt: "Portrait of Emma Lee",
    reviewerName: "Emma Lee",
    reviewText: "Fantastic service! Will definitely recommend to others.",
    rating: 5
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    imageAlt: "Portrait of James Patel",
    reviewerName: "James Patel",
    reviewText: "Solid product, but I didn’t receive any follow-up support."
  }
];

export default function ReviewsPage() {
  return (
    <div className="container mx-auto py-12">
      <Header heading="What Our Customers Say" />
      <div className="mt-8">
        <Reviews
          reviews={STATIC_REVIEWS}
          showNavigation
          loop
          autoplay
          spaceBetween={30}
          slidesPerView={3}
        />
      </div>
    </div>
  );
}
