// app/product/page.tsx   (or wherever you keep ProductDetail)
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Bookmark, Star, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { WhatsappLogo } from "@phosphor-icons/react";
import FillButton from "@/components/common/Button/FillButton";
import { RelatedProducts } from "./related-products";
import { RatingComponent } from "./rating";
import ReportDialog from "@/components/user/ReportDialog/ReportDialog";
import RatingDialog from "@/components/user/RatingDialog/RatingDialog";

interface Spec {
  [key: string]: string;
}
interface ProductDetailData {
  title: string;
  price: string;
  rating: number;
  description: string;
  images: string[];
  thumbnails: string[];
  specs: Spec;
}
interface RatingItem {
  rating: number;
  description: string;
}
interface RelatedProduct {
  id: number;
  name: string;
  price: string;
  status: "Used" | "New" | "Refurb";
  image: string;
}

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [ratings, setRatings] = useState<RatingItem[]>([]);
  const [related, setRelated] = useState<RelatedProduct[]>([]);

  // ---- FETCH ALL DATA ----
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, ratRes, relRes] = await Promise.all([
          fetch("/data/product/product-detail.json"),
          fetch("/data/product/ratings.json"),
          fetch("/data/product/related-products.json"),
        ]);

        const prod = await prodRes.json();
        const rat = await ratRes.json();
        const rel = await relRes.json();

        setProduct(prod);
        setRatings(rat);
        setRelated(rel);
      } catch (e) {
        console.error("Failed to load data", e);
      }
    };
    fetchAll();
  }, []);

  // ---- IMAGE NAVIGATION ----
  const nextImage = () => {
    if (!product) return;
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };
  const prevImage = () => {
    if (!product) return;
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  // ---- EARLY RETURN WHILE LOADING ----
  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Loading product details…</p>
      </div>
    );
  }

  return (
    <>
      {/* ==================== MAIN PRODUCT CARD ==================== */}
      <div className="bg-gradient-to-br from-[#f0f0f0]/12 to-[#e0e0e0]/2 backdrop-blur-sm shadow-lg rounded-2xl mb-10">
        <div className="px-4 py-6 sm:px-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* ---- IMAGE GALLERY ---- */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-card">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.title}
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
                  <span className="text-sm font-semibold">
                    {product.rating}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-colors sm:w-24 ${
                      selectedImage === idx ? "border-accent" : "border-border"
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

            {/* ---- PRODUCT INFO ---- */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                  {product.title}
                </h2>
                <div className="flex gap-2">
                  <ReportDialog />
                  <RatingDialog />
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="rounded-lg border border-secondary p-2 transition-colors"
                  >
                    <Bookmark
                      className={`h-5 w-5 ${
                        isFavorite
                          ? "fill-secondary text-secondary"
                          : "text-secondary"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {product.description}
              </p>

              {/* Price */}
              <div className="border-b border-t border-border py-4">
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-3xl font-bold text-primary sm:text-4xl">
                  {product.price}
                </p>
              </div>

              {/* Specifications */}
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <FillButton
                  href="https://www.whatsapp.com/?lang=en"
                  className="w-full gap-2 bg-secondary border-secondary text-white hover:text-secondary py-6 text-base font-semibold rounded-lg"
                >
                  <WhatsappLogo />
                  Contact via WhatsApp
                </FillButton>

                <FillButton
                  href="https://www.google.com/maps"
                  className="w-full gap-2 py-6 text-base font-semibold rounded-lg"
                >
                  <MapPin />
                  Find The Seller
                </FillButton>
              </div>
            </div>
          </div>
        </div>

        {/* ---- RATINGS ---- */}
        <div className="mt-5">
          <RatingComponent items={ratings} loop showNavigation />
        </div>
      </div>

      {/* ---- RELATED PRODUCTS ---- */}
      <div className="bg-gradient-to-br from-[#f0f0f0]/12 to-[#e0e0e0]/2 backdrop-blur-sm shadow-lg rounded-2xl mb-20">
        <RelatedProducts items={related} />
      </div>
    </>
  );
}
