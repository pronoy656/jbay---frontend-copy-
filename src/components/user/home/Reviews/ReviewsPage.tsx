/* eslint-disable @typescript-eslint/no-explicit-any */
// app/reviews/page.tsx   (or any route you prefer)
"use client";

import { useEffect, useState } from "react";
import { Reviews } from "./Reviews";


export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/home/reviews.json")
      .then((r) => r.json())
      .then((data) => setReviews(data))
      .catch(() => alert("Could not load reviews"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-12">Loading…</p>;

  return (
    <div className="container mx-auto py-12">
      <Reviews
        reviews={reviews}
        showNavigation
        loop
        autoplay
        spaceBetween={30}
        slidesPerView={3}
      />
    </div>
  );
}
