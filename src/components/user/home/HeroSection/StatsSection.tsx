// StatsSection.tsx
"use client";

interface StatsSectionProps {
  stats: { value: string; label: string }[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6 max-lg text-right">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col">
            <h5 className="font-semibold md:text-2xl mb-2 text-pretty">
              {stat.value.split("+")[0]} <span className="text-primary">+</span>
            </h5>
            <p className="md:text-base text-xs font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
