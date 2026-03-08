/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(your-route)/HeroSection.tsx
"use client";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import Catagory from "./Catagory";
import Car from "./Car";
import StatsSection from "./StatsSection";

// -----------------------------------------------------------------
// Static Hero Data to prevent 404 fetch errors on Vercel
// -----------------------------------------------------------------
const HERO_DATA = {
  title: {
    line1: "Your Reliable Source",
    line2: "For Automotive",
    highlight: "Excellence",
  },
  buttonText: "Discover",
  carImage: "/images/car.png",
  stats: [
    { value: "400", label: "Total Accessories" },
    { value: "4k", label: "Happy Customers" },
    { value: "400+", label: "Total Rating" },
  ],
  categories: [
    {
      src: "/images/catagory/1.png",
      alt: "Car Engine Parts",
      code: "#01",
      category: "Engine & Performance",
      description: "Essential engine components including pistons, spark plugs, and turbochargers for powerful performance.",
    },
    {
      src: "/images/catagory/3.png",
      alt: "Electrical and Lighting Parts",
      code: "#03",
      category: "Electrical & Lighting",
      description: "High-quality batteries, alternators, and LED lights ensuring bright visibility and reliable power flow.",
    },
    {
      src: "/images/catagory/4.png",
      alt: "Tires and Wheels",
      code: "#04",
      category: "Tires & Wheels",
      description: "All-season tires and stylish alloy wheels designed for grip, control, and improved performance.",
    },
    {
      src: "/images/catagory/5.png",
      alt: "Car Body & Exterior",
      code: "#05",
      category: "Body & Exterior",
      description: "Bumpers, mirrors, grilles, and spoilers for enhanced aerodynamics and a bold exterior look.",
    },
    {
      src: "/images/catagory/6.png",
      alt: "Car Interior Accessories",
      code: "#06",
      category: "Interior Accessories",
      description: "Premium seat covers, steering covers, and floor mats that add comfort and elegance to your car’s cabin.",
    },
    {
      src: "/images/catagory/1.png",
      alt: "Cooling System Parts",
      code: "#07",
      category: "Cooling & Heating",
      description: "Radiators, condensers, and compressors that help maintain engine temperature and cabin comfort.",
    },
    {
      src: "/images/catagory/2.png",
      alt: "Transmission and Drivetrain",
      code: "#08",
      category: "Transmission & Drivetrain",
      description: "Clutches, axles, and gearboxes that ensure smooth gear transitions and efficient power delivery.",
    },
    {
      src: "/images/catagory/3.png",
      alt: "Fuel and Air System",
      code: "#09",
      category: "Fuel & Air System",
      description: "Air filters, fuel pumps, and intakes to boost mileage and engine breathing for better efficiency.",
    },
    {
      src: "/images/catagory/4.png",
      alt: "Safety and Security Systems",
      code: "#11",
      category: "Safety & Security",
      description: "Parking sensors, airbags, and alarm systems that enhance safety and protection for every journey.",
    },
  ],
  exploreButtonText: "Explore The Product",
  exploreLink: "/product/1",
};

// -----------------------------------------------------------------
// HeroSection Component
// -----------------------------------------------------------------
export default function HeroSection() {
  const data = HERO_DATA;

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
