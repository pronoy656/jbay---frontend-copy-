"use client";

import { useState } from "react";
import { Search, Sliders } from "lucide-react";
import FillButton from "@/components/common/Button/FillButton";
import FilterSidebar from "@/components/user/filter/filter-sidebar";
import ProductCard, {
  Product,
} from "@/components/user/product-card/product-card";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Car Engine",
    price: "$87.32",
    status: "Used",
    image: "/images/while.png",
  },
  {
    id: 2,
    name: "Car Engine",
    price: "$87.32",
    status: "Used",
    image: "/images/while.png",
  },
  {
    id: 3,
    name: "Car Engine",
    price: "$87.32",
    status: "Used",
    image: "/images/while.png",
  },
  {
    id: 4,
    name: "Car Engine",
    price: "$87.32",
    status: "New",
    image: "/images/while.png",
  },
  {
    id: 5,
    name: "Car Engine",
    price: "$87.32",
    status: "New",
    image: "/images/while.png",
  },
  {
    id: 6,
    name: "Car Engine",
    price: "$87.32",
    status: "New",
    image: "/images/while.png",
  },
  {
    id: 7,
    name: "Car Engine",
    price: "$87.32",
    status: "Refurb",
    image: "/images/while.png",
  },
  {
    id: 8,
    name: "Car Engine",
    price: "$87.32",
    status: "Refurb",
    image: "/images/while.png",
  },
  {
    id: 9,
    name: "Car Engine",
    price: "$87.32",
    status: "Refurb",
    image: "/images/while.png",
  },
  {
    id: 10,
    name: "Car Engine",
    price: "$87.32",
    status: "Used",
    image: "/images/while.png",
  },
  {
    id: 11,
    name: "Car Engine",
    price: "$87.32",
    status: "Used",
    image: "/images/while.png",
  },
  {
    id: 12,
    name: "Car Engine",
    price: "$87.32",
    status: "Used",
    image: "/images/while.png",
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="">
      {/* Header */}
      <header className="sticky top-0 ">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4">
            <div className="flex w-full justify-center items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search parts, threads, or part numbers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                />
              </div>
              <div>
                <FillButton size="lg" href="/signup">
                  Search
                </FillButton>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Sliders className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar - Hidden on mobile, visible on lg */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <FilterSidebar />
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <button className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-sm font-medium hover:bg-white/15 transition-all duration-300">
                Previous
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-sm font-medium">
                1
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-sm font-medium hover:bg-white/15 transition-all duration-300">
                2
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-sm font-medium hover:bg-white/15 transition-all duration-300">
                3
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-sm font-medium hover:bg-white/15 transition-all duration-300">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
