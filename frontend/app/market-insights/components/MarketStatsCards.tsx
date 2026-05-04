import { MarketOverview } from "@/types/user";

type Props = { overview: MarketOverview; region: string };

const getCurrency = (region: string) => {
  const r = region.toLowerCase();
  if (r.includes("uk") || r.includes("united kingdom") || r.includes("britain"))
    return "£";
  return "€";
};

export default function MarketStatsCards({ overview, region }: Props) {
  const currency = getCurrency(region);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 12,
        marginBottom: 32,
      }}
    >
      <StatCard
        label="Jobs Analyzed"
        value={overview.totalJobs.toString()}
        color="var(--accent)"
        mono
      />
      <StatCard
        label="Avg Salary Min"
        value={`${currency}${overview.avgSalary.min.toLocaleString()}`}
        color="var(--success)"
        mono
      />
      <StatCard
        label="Avg Salary Max"
        value={`${currency}${overview.avgSalary.max.toLocaleString()}`}
        color="var(--success)"
        mono
      />
      <StatCard label="Region" value={region} color="var(--text-secondary)" />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  mono,
}: {
  label: string;
  value: string;
  color: string;
  mono?: boolean;
}) {
  return (
    <div
      className="card"
      style={{
        padding: "20px 24px",
        borderLeft: `2px solid ${color}`,
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color,
          fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          marginTop: 8,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}
