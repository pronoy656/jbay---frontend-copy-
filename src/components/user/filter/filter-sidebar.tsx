"use client";

import type React from "react";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import FillButton from "@/components/common/Button/FillButton";

export default function FilterSidebar() {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    make: false,
    price: false,
    condition: false,
    location: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const FilterSection = ({
    title,
    id,
    children,
  }: {
    title: string;
    id: keyof typeof expandedSections;
    children: React.ReactNode;
  }) => (
    <div className="bg-background backdrop-blur-md border border-white/20 rounded-xl p-4 mb-4">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between font-semibold text-foreground hover:text-primary transition-colors"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            expandedSections[id] ? "rotate-180" : ""
          }`}
        />
      </button>
      {expandedSections[id] && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  );

  const CheckboxItem = ({ label }: { label: string }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-white/20 bg-white/5 accent-primary cursor-pointer"
      />
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </label>
  );

  return (
    <div className="space-y-4">
      <FilterSection title="Category" id="category">
        <CheckboxItem label="All" />
        <CheckboxItem label="Engine" />
        <CheckboxItem label="Brake System" />
        <CheckboxItem label="Suspension" />
        <CheckboxItem label="Transmission" />
        <CheckboxItem label="Electrical" />
        <CheckboxItem label="Fuel" />
      </FilterSection>


      <FilterSection title="Price Range" id="price">
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="1000"
            className="w-full accent-primary"
          />
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span>$0</span>
            <span>-</span>
            <span>$1000</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Condition" id="condition">
        <CheckboxItem label="New" />
        <CheckboxItem label="Used" />
        <CheckboxItem label="Refurbished" />
      </FilterSection>

      <FilterSection title="Location" id="location">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter location"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="space-y-3">
            <CheckboxItem label="Filter By Location" />
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Distance (km)"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>
      </FilterSection>

        <FillButton size="lg" className="w-full">
          Apply Filters
        </FillButton>
    </div>
  );
}
