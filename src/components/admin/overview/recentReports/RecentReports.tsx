import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const recentReports = [
  {
    name: "Shakhawat Hossain",
    email: "example@gmail.com",
    date: "Oct 12, 2025",
  },
  {
    name: "Shakhawat Hossain",
    email: "example@gmail.com",
    date: "Oct 12, 2025",
  },
  {
    name: "Shakhawat Hossain",
    email: "example@gmail.com",
    date: "Oct 12, 2025",
  },
  {
    name: "Shakhawat Hossain",
    email: "example@gmail.com",
    date: "Oct 12, 2025",
  },
  {
    name: "Shakhawat Hossain",
    email: "example@gmail.com",
    date: "Oct 12, 2025",
  },
];

export default function RecentReports() {
  return (
    <Card className="p-6 bg-[#171717] border-border hover:border-primary/30  transition-all duration-300 backdrop-blur-sm rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Reports</h3>
          <p className="text-sm text-slate-400 mt-1">
            Recently Report From Users
          </p>
        </div>
        <Button
          size="sm"
          className="gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {recentReports.map((report, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg  border border-border/50 hover:border-primary/30  transition-colors"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white">
                {report.name}
              </span>
              <span className="text-xs text-slate-400">{report.email}</span>
            </div>
            <span className="text-sm text-slate-400 ml-4 flex-shrink-0">
              {report.date}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
