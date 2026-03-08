"use client";

import Header from "@/components/common/Header/Header";
import ProductCard, {
  Product,
} from "@/components/user/product-card/product-card";

// Example Product Data (you can import from a separate file if you want)
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

export default function SavedItemsPage() {
  // Select first 8 products for saved items
  const savedProducts = PRODUCTS.slice(0, 12);

  return (
    <div className="min-h-screen  text-foreground px-6 py-12">
      <Header heading={"Saved Items"} />
      {/* Grid of Saved Products */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {savedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
