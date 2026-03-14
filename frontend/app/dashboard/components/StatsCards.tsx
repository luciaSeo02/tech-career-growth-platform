import { JobApplicationStats, ApplicationStatus } from "@/types/user";

const STATUS_CONFIG: Partial<
  Record<ApplicationStatus, { label: string; color: string }>
> = {
  APPLIED: { label: "Applied", color: "var(--status-applied)" },
  INTERVIEW: { label: "Interviews", color: "var(--status-interview)" },
  OFFER: { label: "Offers", color: "var(--status-offer)" },
  REJECTED: { label: "Rejected", color: "var(--status-rejected)" },
  GHOSTED: { label: "Ghosted", color: "var(--status-ghosted)" },
};

type Props = { stats: JobApplicationStats };

export default function StatsCards({ stats }: Props) {
  return (
    <div
      className="stats-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 12,
        marginBottom: 32,
      }}
    >
      <StatCard label="Total" value={stats.total} color="var(--accent)" mono />
      {Object.entries(STATUS_CONFIG).map(([status, { label, color }]) => {
        const value = stats.byStatus[status as ApplicationStatus] ?? 0;
        return (
          <StatCard key={status} label={label} value={value} color={color} />
        );
      })}
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
  value: number;
  color: string;
  mono?: boolean;
}) {
  return (
    <div
      className="card"
      style={{
        padding: "20px 24px",
        borderLeft: `2px solid ${color}`,
        borderRadius: "var(--radius-lg)",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
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
