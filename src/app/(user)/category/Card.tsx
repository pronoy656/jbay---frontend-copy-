import { Card, CardContent, CardTitle } from "@/components/ui/card";


interface CategoryCardProps {
  title: string;
  Icon: React.ElementType;
}

export default function CategoryCard({ title, Icon }: CategoryCardProps) {
  return (
    <Card className="bg-gradient-to-br from-[#f0f0f0]/12 to-[#e0e0e0]/2 backdrop-blur-sm shadow-lg">
      <CardContent className="flex flex-col justify-center items-center gap-4">
        <div className="border border-secondary/50 p-2 rounded-full">
          <Icon className="h-6 w-6 text-secondary" />
        </div>

        <div className="space-y-1">
          <CardTitle className="text-center">{title}</CardTitle>
        </div>
      </CardContent>
    </Card>
  );
}
