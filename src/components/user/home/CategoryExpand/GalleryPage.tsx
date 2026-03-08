/* eslint-disable @typescript-eslint/no-explicit-any */
// app/gallery/page.tsx   (or any route)
"use client";

import { useEffect, useState } from "react";
import { HoverExpand } from "./CategoryExpand";

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/home/categories.json")
      .then((r) => r.json())
      .then((data) => setImages(data))
      .catch(() => alert("Failed to load images"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-20">Loading gallery…</p>;

  return (
    <section className="flex w-full items-center justify-center overflow-hidden pt-30">
      <HoverExpand images={images} />
    </section>
  );
}
