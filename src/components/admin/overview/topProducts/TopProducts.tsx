import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";

const topProducts = [
  {
    id: "ZRE172",
    name: "Car Engine",
    rating: 4.5,
  },
  {
    id: "ZRE172",
    name: "Car Engine",
    rating: 4.5,
  },
  {
    id: "ZRE172",
    name: "Car Engine",
    rating: 4.5,
  },
  {
    id: "ZRE172",
    name: "Car Engine",
    rating: 4.5,
  },
  {
    id: "ZRE172",
    name: "Car Engine",
    rating: 4.5,
  },
];

export default function TopProducts() {
  return (
    <Card className="p-6 bg-card border-border hover:border-primary/30 transition-all duration-300 backdrop-blur-xl ">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">
            Top Products
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Top products of the website
          </p>
        </div>
        <Button
          size="sm"
          className="gap-2 text-black hover:text-accent hover:bg-yellow-500"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {topProducts.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg  border border-border/50 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {product.id}
              </span>
              <span className="text-sm text-muted-foreground">
                {product.name}
              </span>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <Star className="w-7 h-7 fill-primary text-primary" />
              <span className="font-semibold text-card-foreground">
                {product.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
