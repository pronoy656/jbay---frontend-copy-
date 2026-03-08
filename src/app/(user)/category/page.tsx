"use client";

import * as Icons from "lucide-react";

import CategoryCard from "./Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FillButton from "@/components/common/Button/FillButton";

export default function CategoryPage() {
  const categories = [
    {
      title: "Engine & Performance",
      Icon: Icons.Rocket,
    },
    {
      title: "Brakes & Suspension",
      Icon: Icons.Zap,
    },
    {
      title: "Transmission & Drivetrain",
      Icon: Icons.Settings,
    },
    {
      title: "Exhaust Systems",
      Icon: Icons.Flame,
    },
    {
      title: "Electrical & Batteries",
      Icon: Icons.Battery,
    },
    {
      title: "Body & Exterior",
      Icon: Icons.Car,
    },
    {
      title: "Interior Accessories",
      Icon: Icons.LayoutDashboard,
    },
    {
      title: "Lighting",
      Icon: Icons.Lightbulb,
    },
    {
      title: "Tires & Wheels",
      Icon: Icons.Circle,
    },
    {
      title: "Cooling & Heating",
      Icon: Icons.Thermometer,
    },
    {
      title: "Fuel System",
      Icon: Icons.Fuel,
    },
    {
      title: "Tools & Maintenance",
      Icon: Icons.Wrench,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full max-w-md items-center gap-2 my-10">
        <Input type="search" placeholder="Search..." className="flex-1" />
        <Button type="submit" size="sm">
          <Icons.Search className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:ml-1">Search</span>
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat, index) => (
          <CategoryCard key={index} {...cat} />
        ))}
      </div>
      <div className="my-10">
        <FillButton size="lg" href="/signup">
          Show More Catagories
        </FillButton>
      </div>
    </div>
  );
}
