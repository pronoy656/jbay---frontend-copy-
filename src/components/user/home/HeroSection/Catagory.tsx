/* eslint-disable @typescript-eslint/no-explicit-any */
// Catagory.tsx
"use client";

import Link from "next/link";
import { Carousel_002 } from "./Carousel_002";
import { ArrowDownLeft } from "lucide-react";

interface CatagoryProps {
  images: any[];
  exploreText: string;
  exploreLink: string;
}

export default function Catagory({
  images,
  exploreText,
  exploreLink,
}: CatagoryProps) {
  return (
    <div className="my-20">
      <div className="flex justify-start">
        <Carousel_002
          images={images}
          autoplay={true}
          height={{ default: "h-[250px]" }}
          width={{ default: "w-[250px]" }}
        />
      </div>
      <Link href={exploreLink}>
        <p className="text-white mt-2 underline flex">
          {exploreText}
            <ArrowDownLeft className="rotate-180 text-primary" />
        </p>
      </Link>
    </div>
  );
}
