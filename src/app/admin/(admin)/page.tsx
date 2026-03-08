import RecentReports from "@/components/admin/overview/recentReports/RecentReports";
import StatsCards from "@/components/admin/overview/statsCards/StatsCards";
import TopCategory from "@/components/admin/overview/topCategory/TopCategory";
import TopProducts from "@/components/admin/overview/topProducts/TopProducts";

export default function Page() {
  return (
    <main className="flex-1 p-6 lg:p-8 space-y-6  ml-70 mt-16">
      {/* Stats Overview */}
      <StatsCards />

      {/* Charts Row
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <RevenueCompare />
      </div> */}

      {/* Order Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TopProducts />
        <TopCategory />
      </div>
      <div>
        <RecentReports />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
      </div>
    </main>
  );
}
