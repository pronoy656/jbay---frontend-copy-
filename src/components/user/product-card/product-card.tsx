// components/product-card.tsx
"use client";

import { InteractiveHoverButtonX } from "@/components/ui/interactive-hover-button-x";
import { useBookmark } from "@/intregration/Bookmark";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Export the Product interface
export interface Product {
  id: number;
  name: string;
  price: string;
  status: "Used" | "New" | "Refurb";
  image: string;
}

const STATUS_COLORS = {
  Used: "rounded-full border-[2px] px-3.5 py-1.5 text-2xl border-[#FF0000] text-white bg-[#FFFFFF1A] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6)]",
  New: "rounded-full border-[2px] px-3.5 py-1.5 text-2xl border-[#5BB349] text-white bg-[#FFFFFF1A] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6)]",
  Refurb:
    "brounded-full border-[2px] px-3.5 py-1.5 text-2xl border-[#E7BE00] text-white bg-[#FFFFFF1A] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6)]",
};

export default function ProductCard({ product }: { product: Product }) {
  const { isBookmarked, toggleBookmark } = useBookmark(product.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleBookmark();
  };

  return (
    <div className="bg-background backdrop-blur-md border border-white/20 rounded-xl group cursor-pointer overflow-hidden transition-all duration-300 hover:bg-white/3 hover:border-white/30 hover:shadow-lg hover:shadow-primary/20 relative">
      {/* Bookmark Button */}
      <button
        onClick={handleBookmarkClick}
        aria-label={`${isBookmarked ? "Remove" : "Add"} ${
          product.name
        } to bookmarks`}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/10 hover:border-white/30 z-10"
      >
        <Bookmark
          className={`w-5 h-5 transition-all duration-200 ${
            isBookmarked
              ? "text-yellow-400 fill-current"
              : "text-white/70 hover:text-yellow-400"
          }`}
        />
      </button>

      {/* Rest of your component remains the same */}
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 overflow-hidden m-6 rounded-xl">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          width={246}
          height={246}
        />
        <div
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border ${
            STATUS_COLORS[product.status as keyof typeof STATUS_COLORS]
          }`}
        >
          {product.status}
        </div>
      </div>

      <div className="px-6 pb-6">
        <h3 className="text-foreground mb-1 line-clamp-2 text-xl">
          {product.name}
        </h3>
        <p className="text-xl font-bold mb-3">{product.price}</p>
        <Link href={`/product/${product.id}`}>
          <InteractiveHoverButtonX>Shop Now</InteractiveHoverButtonX>
        </Link>
      </div>
    </div>
  );
}
