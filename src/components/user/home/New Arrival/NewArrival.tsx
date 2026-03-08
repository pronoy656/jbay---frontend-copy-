// app/products/page.tsx   (or pages/products.tsx if using Pages Router)
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header/Header";
import ProductCard, { Product } from "../../product-card/product-card";


export default function NewArrival() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/home/new-products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch((err) => {
        console.error(err);
        alert("Could not load products");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-8 text-center">
        <Header heading="New Arrival" />
        <p className="mt-8 text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Header heading="New Arrival" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
