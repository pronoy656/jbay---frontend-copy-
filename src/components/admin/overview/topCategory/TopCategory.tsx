
import { Card } from "@/components/ui/card"


const products = [
  {id: "1", name: "Wireless Headphones",  quantity: "45,231",  },
  {id: "2", name: "Smart Watch Pro",  quantity: "38,456",  },
  {id: "3", name: "Laptop Stand",  quantity: "28,934", },
  {id: "4", name: "Mechanical Keyboard",  quantity: "24,567"},
  {id: "5", name: "USB-C Hub",  quantity: "19,234" },
   {id: "6", name: "Laptop Stand",  quantity: "28,934" },
    
    
]

export default function TopCategory() {
  return (
       <Card className="glass-card hover:border-primary/30 transition-all duration-300 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Top Category</h3>
        <p className="text-sm text-muted-foreground mt-1">Best selling items</p>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
              {index + 1}
            </div>
  <div
            key={index}
            className="w-full flex items-center justify-between p-4 rounded-lg  border border-border/50 hover:border-primary/30 transition-all duration-300 group"
          >
           
            <p className="text-sm font-medium text-card-foreground truncate">{product.name}</p>
              <p className="text-sm font-semibold text-card-foreground">{product.quantity}</p>
           
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
