/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(your-route)/HeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import Catagory from "./Catagory";
import Car from "./Car";
import StatsSection from "./StatsSection";
import axiosPublic from "@/utils/axiosPublic";

// -----------------------------------------------------------------
// Type definitions based on your JSON
// -----------------------------------------------------------------
interface Title {
  line1: string;
  line2: string;
  highlight: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Category {
  src: string;
  alt: string;
  code: string;
  category: string;
  description: string;
}

interface HeroData {
  title: Title;
  buttonText: string;
  carImage: string;
  stats: Stat[];
  categories: Category[];
  exploreButtonText: string;
  exploreLink: string;
}

// -----------------------------------------------------------------
// HeroSection Component
// -----------------------------------------------------------------
export default function HeroSection() {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // -----------------------------------------------------------------
  // Fetch hero data directly with axios
  // -----------------------------------------------------------------
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        // Adjust endpoint as per your backend
        const response = await axiosPublic.get<HeroData>("home/hero.json");
        setData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load hero section");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // -----------------------------------------------------------------
  // Loading state
  // -----------------------------------------------------------------
  if (loading) {
    return (
      <section className="mt-15 relative min-h-[500px] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </section>
    );
  }

  // -----------------------------------------------------------------
  // Error state
  // -----------------------------------------------------------------
  if (error) {
    return (
      <section className="mt-15 relative min-h-[500px] flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </section>
    );
  }

  // -----------------------------------------------------------------
  // No data
  // -----------------------------------------------------------------
  if (!data) return null;

  // -----------------------------------------------------------------
  // Main render
  // -----------------------------------------------------------------
  return (
    <section className="mt-15 relative">
      <div className="space-y-16">
        <h1 className="text-2xl lg:text-6xl font-bold italic leading-tight text-balance relative z-50">
          {data.title.line1}
          <br />
          <span className="whitespace-nowrap">
            {data.title.line2}{" "}
            <span className="">
              <LineShadowText className="italic text-secondary">
                {data.title.highlight}
              </LineShadowText>
            </span>
          </span>
        </h1>
        <InteractiveHoverButton>{data.buttonText}</InteractiveHoverButton>
      </div>

      <div className="invisible md:visible">
        <Catagory
          images={data.categories}
          exploreText={data.exploreButtonText}
          exploreLink={data.exploreLink}
        />
      </div>

      <div className="absolute top-0 right-0 md:-mr-25 md:-mt-30 mt-30">
        <Car src={data.carImage} />
        <StatsSection stats={data.stats} />
      </div>
    </section>
  );
}
